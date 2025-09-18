# Poetry Guestbook Terminal

A retro-style terminal interface for generating love poems at Evan and Emily's wedding. Guests can interact with an AI poet to create personalized poems that can be printed.

## Features

- Retro terminal interface with green-on-black styling
- AI-powered poem generation using OpenAI's ChatGPT
- One-click printing functionality
- Line break preservation for proper poem formatting
- Command history and navigation
- Matrix rain effect (optional)

## Setup

1. **Clone or download this repository**

2. **Configure your OpenAI API key:**
   ```bash
   cp config.template.js config.js
   ```
   Then edit `config.js` and replace `YOUR_OPENAI_API_KEY_HERE` with your actual OpenAI API key.

3. **Open the application:**
   - Simply open `index.html` in a web browser
   - Or serve it using a local web server

## Usage

1. **Generate a poem:** Just type your message and press Enter (no need for "chat" command)
2. **Print the poem:** Click "Print Last Response" button
3. **Use terminal commands:** Type `help` to see available commands

## Files

- `index.html` - Main application file
- `config.js` - Configuration file with API key (not included in repo)
- `config.template.js` - Template for configuration file
- `.gitignore` - Prevents sensitive files from being committed

## Security Note

The `config.js` file contains your OpenAI API key and is excluded from version control. Make sure to never commit this file to public repositories.

## Commands

- `help` - Show available commands
- `clear` - Clear the terminal
- `clear-chat` - Clear conversation history
- `date` - Show current date and time
- `echo [message]` - Echo a message
- `matrix` - Toggle matrix rain effect
- `ls` or `dir` - List files
- `pwd` - Show current directory
- `whoami` - Show user info
- `neofetch` - Show system information
- `set-name [name]` - Set your name
- `scroll-top` / `scroll-bottom` - Navigate terminal

Any other text will be sent to the AI poet for poem generation!
