const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Print functionality
  printPoem: (poemText) => ipcRenderer.invoke('print-poem', poemText),
  getPrinters: () => ipcRenderer.invoke('get-printers'),
  
  // Config file operations
  readConfig: () => ipcRenderer.invoke('read-config'),
  writeConfig: (configContent) => ipcRenderer.invoke('write-config', configContent),
  
  // Platform info
  platform: process.platform,
  isElectron: true
});
