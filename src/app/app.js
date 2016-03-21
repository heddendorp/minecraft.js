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

import template from './app.ng.html'
import theme from './app.theme'

class AppCtrl {
  constructor (mcAuth) {
    'ngInject'
    this._auth = mcAuth
    electron.webFrame.registerURLSchemeAsBypassingCSP('https')
  }
}

let app = {
  restrict: 'E',
  bindings: {},
  template,
  controller: AppCtrl,
  controllerAs: 'app',
  $routeConfig: [
    { path: '/packs/...', name: 'Packs', component: 'packExplorer', useAsDefault: true }
  ]
}
angular
  .module('app', [
    ngMaterial,
    'ngComponentRouter',
    mcAuthService,
    user,
    packExplorer
  ])
  .config(theme)
  .value('$routerRootComponent', 'app')
  .component('app', app)
