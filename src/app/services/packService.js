/**
 * Created by l.heddendorp on 25.03.2016.
 */
import angular from 'angular'

class packs {
  constructor ($log, $mdToast, $q, Loki) {
    'ngInject'
    this._db = new Loki('minecraftjs', {
      autosave: true,
      autoload: true,
      persistenceAdapter: 'localStorage'
    })
    if (this._db.getCollection('packs')) {
      this._packs = this._db.getCollection('packs')
    } else {
      this._packs = this._db.addCollection('packs')
    }
    this._q = $q
    this._log = $log
    this._toast = $mdToast
  }
  _notify (text) {
    this._toast.showSimple(text)
  }
  _debug (text) {
    this._log.debug('mcAuth - ' + text)
  }
}

export default angular.module('app.packService', []).service('packs', packs).name
