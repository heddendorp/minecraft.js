/**
 * Created by l.heddendorp on 20.03.2016.
 */
import angular from 'angular'
import ngMaterial from 'angular-material'
import electron from 'electron'
import '@angular/router/angular1/angular_1_router'
import 'angular-material/angular-material.scss'
import './../style/app.scss'

import user from './user/user'
import packExplorer from './packs/packExplorer'
import mcAuthService from './services/minecraftAuth'
import settingsDialog from './settings/settings'
import LoginCtrl from './login.controller'

import template from './app.ng.html'
import theme from './app.theme'

class AppCtrl {
  constructor (mcAuth, $mdDialog, settings) {
    'ngInject'
    this._settings = settings
    this._auth = mcAuth
    this._dialog = $mdDialog
    electron.webFrame.registerURLSchemeAsBypassingCSP('https')
  }
  settings (event) {
    this._settings.show(event)
  }
  login (event) {
    this._dialog.show({
      controller: LoginCtrl,
      controllerAs: 'login',
      template: require('./login.ng.html'),
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true
    })
  }
}

let app = {
  restrict: 'E',
  bindings: {},
  template,
  controller: AppCtrl,
  controllerAs: 'app',
  $routeConfig: [
    { path: '/packs/...', name: 'Packs', component: 'packs', useAsDefault: true }
  ]
}
angular
  .module('app', [
    ngMaterial,
    'ngComponentRouter',
    mcAuthService,
    settingsDialog,
    user,
    packExplorer
  ])
  .config(theme)
  .value('$routerRootComponent', 'app')
  .component('app', app)
