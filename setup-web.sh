#!/bin/bash
echo "Setting up Poetry Guestbook Terminal web version..."

# Check if config.js exists
if [ ! -f config.js ]; then
    echo "Creating config.js from template..."
    cp config.template.js config.js
    echo "Please edit config.js and add your OpenAI API key"
    echo "Then run this script again"
    exit 1
fi

# Check if config.js has the API key
if grep -q "YOUR_OPENAI_API_KEY_HERE" config.js; then
    echo "ERROR: Please edit config.js and add your OpenAI API key"
    echo "Replace 'YOUR_OPENAI_API_KEY_HERE' with your actual API key"
    exit 1
fi

echo "Config file looks good!"
echo ""
echo "To start the web server:"
echo "  python3 start-web-server.py"
echo ""
echo "Then open http://localhost:8000 in your browser"
echo ""
echo "To stop the server, press Ctrl+C"
