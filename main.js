const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 360,
        height: 780,
        webPreferences: {
            preload: path.join(__dirname, 'frontend/public/preload.js'), // Atualize o caminho para o preload.js
            nodeIntegration: false, // Desativa a integração do Node.js
            contextIsolation: true, // Mantém o isolamento do contexto
            enableRemoteModule: false
        },
        resizable: false,
        maximizable: false,
        fullscreenable: false
    });

    mainWindow.loadFile(path.join(__dirname, 'frontend/public/index.html')); // Atualize o caminho para o index.html
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
