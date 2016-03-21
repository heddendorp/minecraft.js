/**
 * Created by l.heddendorp on 20.03.2016.
 */
// main.js
var app = require('app')
var BrowserWindow = require('browser-window')
var path = require('path')

// require('crash-reporter').start()

var mainWindow = null
app.commandLine.appendSwitch('disable-web-security')
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 600,
    title: 'minecraft.js',
    icon: path.resolve(__dirname, 'icon.png') })
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'DEV') {
    mainWindow.loadURL('http://localhost:8080')
    mainWindow.openDevTools()
  } else {
    mainWindow.loadURL('file://' + path.resolve(__dirname, 'index.html'))
  }

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})
