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
    // For now, we'll use the system's default printer via command line
    // This is a simpler approach that works on Windows
    const { exec } = require('child_process');
    
    // Create a temporary file with the poem
    const tempFile = path.join(__dirname, 'temp-poem.txt');
    fs.writeFileSync(tempFile, poemText, 'utf8');
    
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
          resolve({ success: true, printer: 'Default Printer' });
        }
      });
    });
  } catch (error) {
    console.error('Print error:', error);
    return { success: false, error: error.message };
  }
});

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
