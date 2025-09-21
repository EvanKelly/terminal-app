#!/bin/bash
echo "Setting up Poetry Guestbook Terminal on Raspberry Pi..."

# Detect Pi architecture
ARCH=$(uname -m)
echo "Detected architecture: $ARCH"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js for Raspberry Pi..."
    
    # Install Node.js via NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    if [ $? -ne 0 ]; then
        echo "Failed to install Node.js via NodeSource. Trying alternative method..."
        # Alternative: install via apt
        sudo apt update
        sudo apt install -y nodejs npm
    fi
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    echo "This might be due to architecture compatibility issues."
    echo "Try running: npm install --arch=arm64"
    exit 1
fi

echo "Creating config file..."
if [ ! -f config.js ]; then
    cp config.template.js config.js
    echo "Config file created. Please edit config.js and add your OpenAI API key."
else
    echo "Config file already exists."
fi

echo ""
echo "Setup complete!"
echo ""
echo "To run the app: npm start"
echo "To build for Raspberry Pi: npm run build-pi"
echo ""
echo "Note: Building on Pi may take a while due to limited resources."
echo "Consider building on a more powerful machine and copying the result."
