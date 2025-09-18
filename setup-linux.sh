#!/bin/bash
echo "Setting up Poetry Guestbook Terminal on Linux..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first:"
    echo "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -"
    echo "sudo apt-get install -y nodejs"
    exit 1
fi

echo "Node.js found. Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo "Creating config file..."
if [ ! -f config.js ]; then
    cp config.template.js config.js
    echo "Config file created. Please edit config.js and add your OpenAI API key."
else
    echo "Config file already exists."
fi

echo "Setup complete!"
echo ""
echo "To run the app: npm start"
echo "To build for Linux: npm run build-linux"
echo ""
