# Raspberry Pi Setup Instructions

## Method 1: Build on Raspberry Pi (Recommended)

### On the Raspberry Pi:

1. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Copy the project** to the Pi:
   ```bash
   git clone https://github.com/EvanKelly/terminal-app.git
   cd terminal-app
   ```

3. **Run setup**:
   ```bash
   chmod +x setup-pi.sh
   ./setup-pi.sh
   ```

4. **Edit config.js** with your API key

5. **Run the app**:
   ```bash
   npm start
   ```

6. **Build for Pi** (optional):
   ```bash
   npm run build-pi
   ```

## Method 2: Cross-compile from Windows (Advanced)

### On your Windows machine:

1. **Install cross-compilation tools**:
   ```powershell
   npm install -g @electron/rebuild
   ```

2. **Build for ARM**:
   ```powershell
   npm run build-linux-arm64
   # or
   npm run build-linux-armv7l
   ```

3. **Copy the built app** to the Pi

## Method 3: Use Web Version (Simplest)

### On the Raspberry Pi:

1. **Install Python** (usually pre-installed):
   ```bash
   python3 --version
   ```

2. **Start web server**:
   ```bash
   python3 -m http.server 8000
   ```

3. **Open browser** and go to:
   ```
   http://localhost:8000
   ```

## Troubleshooting

### Node.js installation fails:
```bash
# Try alternative method
sudo apt update
sudo apt install -y nodejs npm
```

### npm install fails:
```bash
# Try with specific architecture
npm install --arch=arm64
```

### App runs slowly:
- **Use web version** instead of Electron
- **Close other applications** to free up memory
- **Use a Pi 4** or newer for better performance

### Printing issues:
- **Check printer drivers** are installed
- **Test with simple text file** first
- **Use USB printer** for better compatibility

## Performance Tips

- **Pi 4 recommended** for Electron apps
- **Close unnecessary services** before running
- **Use web version** if Electron is too slow
- **Consider using a more powerful computer** for the wedding

## Architecture Detection

Check your Pi's architecture:
```bash
uname -m
```

- **aarch64** = ARM64 (Pi 4, Pi 5)
- **armv7l** = ARM32 (Pi 3, older Pi 4)
- **armv6l** = ARM32 (Pi Zero, Pi 1, Pi 2)
