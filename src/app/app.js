/**
 * Created by l.heddendorp on 20.03.2016.
 */
import angular from 'angular'
import ngMaterial from 'angular-material'
import 'angular-new-router'
import 'angular-material/angular-material.scss'
import './../style/app.scss'

import template from './app.ng.html'
import theme from './app.theme'

class AppCtrl {}

let app = {
  restrict: 'E',
  bindings: {},
  template,
  controller: AppCtrl,
  controllerAs: 'app'
}
angular
  .module('app', [
    ngMaterial,
    'ngNewRouter'
  ])
  .config(theme)
  .component('app', app)
