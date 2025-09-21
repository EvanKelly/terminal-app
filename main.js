const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    title: 'Poetry Guestbook Terminal',
    show: false // Don't show until ready
  });

  // Load the app
  mainWindow.loadFile('index.html');

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle print request from renderer process
ipcMain.handle('print-poem', async (event, poemText) => {
  try {
    // Extract poem title (first line) and guest name
    const poemTitle = extractPoemTitle(poemText);
    const guestName = extractGuestName(poemText);
    const weddingDate = 'September 27, 2025';
    const weddingLocation = 'Zion, Utah';
    
    // Format for Zebra label printer
    const labelContent = formatForZebraLabel(poemText, poemTitle, guestName, weddingDate, weddingLocation);
    
    // Create a temporary file with the formatted label
    const tempFile = path.join(__dirname, 'temp-poem-label.txt');
    fs.writeFileSync(tempFile, labelContent, 'utf8');
    
    // Use Windows print command
    const printCommand = `notepad /p "${tempFile}"`;
    
    return new Promise((resolve) => {
      exec(printCommand, (error, stdout, stderr) => {
        // Clean up temp file
        try {
          fs.unlinkSync(tempFile);
        } catch (cleanupError) {
          console.error('Error cleaning up temp file:', cleanupError);
        }
        
        if (error) {
          console.error('Print error:', error);
          resolve({ success: false, error: error.message });
        } else {
          resolve({ success: true, printer: 'Zebra Label Printer' });
        }
      });
    });
  } catch (error) {
    console.error('Print error:', error);
    return { success: false, error: error.message };
  }
});

// Helper function to extract poem title
function extractPoemTitle(poemText) {
  // Get the first line as the poem title
  const lines = poemText.split('\n');
  const firstLine = lines[0].trim();
  
  // Return the first line if it's not empty and not too long
  if (firstLine && firstLine.length > 0 && firstLine.length < 50) {
    return firstLine;
  }
  
  return null;
}

// Helper function to extract guest name
function extractGuestName(poemText) {
  // Look for "Created for [Name]" pattern specifically, usually at the end
  const lines = poemText.split('\n');
  
  // Check the last few lines for "Created for [Name]" pattern
  for (let i = lines.length - 1; i >= Math.max(0, lines.length - 3); i--) {
    const line = lines[i].trim();
    const createdForMatch = line.match(/^Created for\s+([^,\n]+)/i);
    if (createdForMatch && createdForMatch[1]) {
      return createdForMatch[1].trim();
    }
  }
  
  // Also check for "For [Name]" pattern (fallback)
  for (let i = lines.length - 1; i >= Math.max(0, lines.length - 3); i--) {
    const line = lines[i].trim();
    const forMatch = line.match(/^For\s+([^,\n]+)$/i);
    if (forMatch && forMatch[1]) {
      return forMatch[1].trim();
    }
  }
  
  return null;
}

// Helper function to format content for Zebra label
function formatForZebraLabel(poemText, poemTitle, guestName, weddingDate, weddingLocation) {
  const header = poemTitle || 'Wedding Guest Poem';
  const footer = `${weddingDate} • ${weddingLocation}`;
  
  // Remove title from poem content for printing (since title appears in header)
  const lines = poemText.split('\n');
  const poemLines = lines.slice(1); // Skip first line (title)
  
  // Format for 4-inch label width (approximately 40 characters)
  const formattedLines = poemLines.map(line => {
    if (line.length > 40) {
      // Wrap long lines
      const words = line.split(' ');
      let result = '';
      let currentLine = '';
      
      for (const word of words) {
        if ((currentLine + word).length > 40) {
          result += currentLine.trim() + '\n';
          currentLine = word + ' ';
        } else {
          currentLine += word + ' ';
        }
      }
      result += currentLine.trim();
      return result;
    }
    return line;
  });
  
  return [
    '='.repeat(40),
    header.padStart((40 + header.length) / 2),
    '='.repeat(40),
    '',
    ...formattedLines,
    '',
    '='.repeat(40),
    footer.padStart((40 + footer.length) / 2),
    '='.repeat(40)
  ].join('\n');
}

// Handle printer list request
ipcMain.handle('get-printers', async () => {
  try {
    // For now, return a default printer
    return [{ name: 'Default Printer', status: 'ready', isDefault: true }];
  } catch (error) {
    console.error('Error getting printers:', error);
    return [];
  }
});

// Handle config file operations
ipcMain.handle('read-config', async () => {
  try {
    const configPath = path.join(__dirname, 'config.js');
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf8');
      return { exists: true, content: configContent };
    } else {
      return { exists: false };
    }
  } catch (error) {
    console.error('Error reading config:', error);
    return { exists: false, error: error.message };
  }
});

ipcMain.handle('write-config', async (event, configContent) => {
  try {
    const configPath = path.join(__dirname, 'config.js');
    fs.writeFileSync(configPath, configContent, 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error writing config:', error);
    return { success: false, error: error.message };
  }
});
