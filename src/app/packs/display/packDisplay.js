/**
 * Created by l.heddendorp on 25.03.2016.
 */
import angular from 'angular'

import template from './packDisplay.ng.html'

class DisplayCtrl {
  constructor (packs) {
    'ngInject'
    this._packs = packs
  }
  $routerOnActivate (next) {
    this._packs.get(next.params.id).then((pack) => { this.pack = pack })
  }
}

let display = {
  bindings: {
    $router: '<'
  },
  template,
  controller: DisplayCtrl,
  controllerAs: 'show'
}

export default angular
  .module('app.packs.display', [])
  .component('packDisplay', display)
  .name
