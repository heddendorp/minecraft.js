/**
 * Created by l.heddendorp on 20.03.2016.
 */
// main.js
var app = require('app')
var BrowserWindow = require('browser-window')

// require('crash-reporter').start()

var mainWindow = null

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'DEV') {
    mainWindow.loadURL('http://localhost:8080')
  } else {
    mainWindow.loadURL('file://' + __dirname + '/index.html')
  }

  //mainWindow.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})
