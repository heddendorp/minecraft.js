/**
 * Created by l.heddendorp on 21.03.2016.
 */
import angular from 'angular'

import template from './packExplorer.ng.html'
import mcAuthService from './../services/minecraftAuth'

class PacksCtrl {
  constructor () {
    'ngInject'
  }
}

let packs = {
  restrict: 'E',
  bindings: {},
  template,
  controller: PacksCtrl,
  controllerAs: 'packs'
}

export default angular
  .module('app.packs', [
  ])
  .component('packExplorer', packs)
  .name
