/**
 * Created by l.heddendorp on 21.03.2016.
 */
import angular from 'angular'

import template from './packIndex.ng.html'

class IndexCtrl {
  constructor () {
    'ngInject'
  }
}

let index = {
  restrict: 'E',
  bindings: {},
  template,
  controller: IndexCtrl,
  controllerAs: 'index'
}

export default angular
  .module('app.packs', [
  ])
  .component('packIndex', index)
  .name
