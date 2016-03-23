/**
 * Created by l.heddendorp on 21.03.2016.
 */
import angular from 'angular'

import './index/packIndex'
import packIndex from './index/packIndex'

class PacksCtrl {
  constructor () {
    'ngInject'
  }
}

let packs = {
  restrict: 'E',
  bindings: {},
  template: '<ng-outlet></ng-outlet>',
  $routeConfig: [
    { path: '/', name: 'Index', component: 'packIndex', useAsDefault: true }
  ],
  controller: PacksCtrl,
  controllerAs: 'packs'
}

export default angular
  .module('app.packs', [
    packIndex
  ])
  .component('packs', packs)
  .name
