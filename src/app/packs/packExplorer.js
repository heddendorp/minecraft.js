/**
 * Created by l.heddendorp on 21.03.2016.
 */
import angular from 'angular'

import './index/packIndex'
import packIndex from './index/packIndex'
import packDisplay from './display/packDisplay'

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
    { path: '/', name: 'Index', component: 'packIndex', useAsDefault: true },
    { path: '/:id', name: 'Show', component: 'packDisplay' }
  ],
  controller: PacksCtrl,
  controllerAs: 'packs'
}

export default angular
  .module('app.packs', [
    packIndex,
    packDisplay
  ])
  .component('packs', packs)
  .name
