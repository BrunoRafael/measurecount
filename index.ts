const { app, BrowserWindow, ipcMain } = require('electron');
const { url } = require('url');
const { path } = require('path');

let mainWindow = null;
let createUserWindow = null;

let createMainWindow = async () => {
    let mainWindow = new BrowserWindow({
        width: 1800,
        height: 1800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/dist/angular-project-training/index.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

let createRegisterUserWindow = async () => {
    let createUserWindow = new BrowserWindow({
        width: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    createUserWindow.loadURL(`file://${__dirname}/dist/angular-project-training/index.html#/userRegister`);
    createUserWindow.on('closed', () => {
        createUserWindow = null;
    });
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow == null){
        createMainWindow();
    }
});

ipcMain.on('open-create-user-window', createRegisterUserWindow);