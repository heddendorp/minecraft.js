/**
 * Created by l.heddendorp on 25.03.2016.
 */
import angular from 'angular'
import request from 'request';

import template from './packDisplay.ng.html'
import solderLoader from './../../services/solderLoader.service'

class DisplayCtrl {
  constructor (packs, sLoader) {
    'ngInject'
    this._packs = packs
    this._loader = sLoader
  }
  $routerOnActivate (next) {
    this._packs.get(next.params.id).then((pack) => {
      this.mods = false;
      this.pack = pack;
      let url = pack.solder + 'modpack/' + pack.name;
      request(url, {json: true}, (err, res, pack) => {
        if (err) {
          this._debug(err);
          return;
        }
        if (res.statusCode != 200) {
          this._notify('Invalid request');
          this._debug(res);
          return;
        }
        url += '/' + pack.recommended+'?include=mods';
        request(url, {json: true}, (err, res, build) => {
          if (err) {
            this._debug(err);
            return;
          }
          if (res.statusCode != 200) {
            this._notify('Invalid request');
            this._debug(res);
            return;
          }
          this.mods = build.mods;
        })
      })
    })
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
