'use strict';

const electron = require('electron');
const app = electron.app; // Module to control app life.
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JS object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed
app.on('window-all-closed', function(){
    app.quit();
});

// This method will be called when Electron has finished
// initializing and is ready to create browser windows.
app.on('ready', function(){
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    // open the dev tools
    mainWindow.webContents.openDevTools();

    // emitted when window is closed
    mainWindow.on('closed', function(){
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multiple windows, this is the
        // time when you should delete the corresponding element.
        mainWindow = null;
    });
})
