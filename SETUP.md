# Electron App Setup Instructions

## Prerequisites

1. **Install Node.js**: Download and install Node.js from https://nodejs.org/
   - Choose the LTS version
   - This will also install npm (Node Package Manager)

2. **Verify Installation**:
   ```bash
   node --version
   npm --version
   ```

## Setup Steps

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Create Config File**:
   ```bash
   copy config.template.js config.js
   ```
   Then edit `config.js` and add your OpenAI API key.

3. **Run the App**:
   ```bash
   npm start
   ```

## Building for Distribution

1. **Build for Windows**:
   ```bash
   npm run build-win
   ```

2. **Build for Mac**:
   ```bash
   npm run build-mac
   ```

3. **Build for Linux**:
   ```bash
   npm run build-linux
   ```

## Features

- **Direct Printing**: No browser print dialog - prints directly to your default printer
- **Printer Selection**: Automatically detects available printers
- **Fallback Support**: Falls back to browser printing if direct printing fails
- **Offline Capable**: Works without internet after initial setup
- **Cross-Platform**: Works on Windows, Mac, and Linux

## Troubleshooting

- **No printers found**: Make sure your printer is connected and drivers are installed
- **Print fails**: The app will automatically fall back to browser printing
- **Config issues**: Make sure `config.js` exists and has a valid API key

## File Structure

```
poetry-guestbook-terminal/
├── main.js              # Main Electron process
├── preload.js           # Preload script for security
├── index.html           # Your web app
├── config.js            # Your API key (create from template)
├── config.template.js   # Template for config
├── package.json         # Dependencies and scripts
└── assets/              # App icons and resources
```
