/**
 * Created by l.heddendorp on 20.03.2016.
 */
import angular from 'angular'
import ngMaterial from 'angular-material'
import 'lokijs'
import 'lokijs/src/loki-indexed-adapter'
import lokiJS from 'lokijs/src/loki-angular'
import '@angular/router/angular1/angular_1_router'
import 'angular-material/angular-material.scss'
import './../style/app.scss'

import user from './user/user'
import packExplorer from './packs/packExplorer'
import mcAuthService from './services/minecraftAuth'
import packService from './services/packService'
import dbService from './services/db.service'
import settingsDialog from './settings/settings'
import LoginCtrl from './login.controller'
import PackCtrl from './addPack.controller'
import template from './app.ng.html'
import theme from './app.theme'

class AppCtrl {
  constructor (mcAuth, $mdDialog, settings, packs, $rootRouter) {
    'ngInject'
    this._router = $rootRouter
    this._settings = settings
    this._auth = mcAuth
    this._dialog = $mdDialog
    this._packs = packs
    packs.list().then((packs) => { this.packs = packs })
  }
  settings (event) {
    this._settings.show(event)
  }
  showPack (id) {
    this._router.navigate(['Packs', 'Show', { id: id }])
  }
  deletePack (pack) {
    this._packs.delete(pack)
    this._packs.list().then((packs) => { this.packs = packs })
  }
  addPack (event) {
    this._dialog.show({
      controller: PackCtrl,
      controllerAs: 'pack',
      template: require('./addPack.ng.html'),
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true
    }).then(() => { this._packs.list().then((packs) => { this.packs = packs }) })
  }
  logout () {
    this._auth.logout()
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
    lokiJS.name,
    'ngComponentRouter',
    dbService,
    mcAuthService,
    packService,
    settingsDialog,
    user,
    packExplorer
  ])
  .config(theme)
  .value('$routerRootComponent', 'app')
  .component('app', app)
