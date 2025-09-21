#!/usr/bin/env python3
"""
Simple web server for Poetry Guestbook Terminal
Run this on Raspberry Pi to serve the web version
"""

import http.server
import socketserver
import os
import webbrowser
import sys

# Change to the directory containing this script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow local access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    print("Starting Poetry Guestbook Terminal web server...")
    print(f"Server will run on port {PORT}")
    print("Make sure config.js exists with your OpenAI API key")
    print()
    
    # Check if config.js exists
    if not os.path.exists('config.js'):
        print("WARNING: config.js not found!")
        print("Copy config.template.js to config.js and add your API key")
        print()
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"Server running at http://localhost:{PORT}")
            print("Press Ctrl+C to stop the server")
            print()
            
            # Try to open browser (might not work on headless Pi)
            try:
                webbrowser.open(f'http://localhost:{PORT}')
            except:
                print("Could not open browser automatically")
                print(f"Open http://localhost:{PORT} in your browser")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\nServer stopped.")
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"Port {PORT} is already in use. Try a different port:")
            print(f"python3 start-web-server.py {PORT + 1}")
        else:
            print(f"Error starting server: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            print("Invalid port number. Using default port 8000")
    
    main()
