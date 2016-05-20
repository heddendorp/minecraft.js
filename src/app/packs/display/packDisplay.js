/**
 * Created by l.heddendorp on 25.03.2016.
 */
import angular from 'angular'

import template from './packDisplay.ng.html'
import solderLoader from './../../services/solderLoader.service'

class DisplayCtrl {
  constructor (packs, sLoader) {
    'ngInject'
    this._packs = packs
    this._loader = sLoader
  }
  $routerOnActivate (next) {
    this._packs.get(next.params.id).then((pack) => { this.pack = pack })
  }
  install () {
    this._loader.install(this.pack)
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
  .module('app.packs.display', [
      solderLoader
  ])
  .component('packDisplay', display)
  .name
