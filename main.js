const { app, BrowserWindow } = require('electron');

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL('https://avl-bst.netlify.app/'); // Replace with your website URL
}

app.whenReady().then(createWindow);
