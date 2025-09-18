# Linux Setup Instructions

## Method 1: Build on Linux (Recommended)

1. **Copy the entire project folder** to your Linux computer
2. **Open terminal** in the project directory
3. **Make setup script executable**:
   ```bash
   chmod +x setup-linux.sh
   ```
4. **Run setup**:
   ```bash
   ./setup-linux.sh
   ```
5. **Edit config.js** with your OpenAI API key
6. **Run the app**:
   ```bash
   npm start
   ```

## Method 2: Build AppImage on Linux

If you want a standalone AppImage:

1. **Follow Method 1** to set up the project
2. **Build AppImage**:
   ```bash
   npm run build-linux
   ```
3. **Make executable**:
   ```bash
   chmod +x dist/Poetry\ Guestbook\ Terminal-1.0.0.AppImage
   ```
4. **Run**:
   ```bash
   ./dist/Poetry\ Guestbook\ Terminal-1.0.0.AppImage
   ```

## Method 3: Use Windows build

If you just need it to work on Linux quickly:

1. **Build Windows version** on your Windows computer:
   ```powershell
   npm run build-win
   ```
2. **Use Wine** on Linux to run the Windows executable:
   ```bash
   sudo apt install wine
   wine Poetry\ Guestbook\ Terminal\ Setup\ 1.0.0.exe
   ```

## Prerequisites for Linux

- **Node.js**: Install from https://nodejs.org/ or via package manager
- **Git** (if cloning): `sudo apt install git`
- **Wine** (if using Windows build): `sudo apt install wine`

## Troubleshooting

- **Permission denied**: Make sure scripts are executable with `chmod +x`
- **Node.js not found**: Install Node.js from the official website
- **npm install fails**: Try `sudo npm install` or use a Node version manager
