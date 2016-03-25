/**
 * Created by l.heddendorp on 25.03.2016.
 */
import angular from 'angular'

class packs {
  constructor ($log, $mdToast, $q, db) {
    'ngInject'
    this._db = db.get().then((db) => {
      this._db = db
      if (this._db.getCollection('packs')) {
        this._collection = this._db.getCollection('packs')
      } else {
        this._collection = this._db.addCollection('packs')
      }
      deferred.resolve()
    })
    this._q = $q
    this._log = $log
    this._toast = $mdToast
    let deferred = this._q.defer()
    this._promise = deferred.promise
  }
  list () {
    let deferred = this._q.defer()
    this._promise.then(() => {
      deferred.resolve(this._collection.data)
    })
    return deferred.promise
  }
  add (pack) {
    this._collection.insert(pack)
    this.all = this._collection.data
  }
  _notify (text) {
    this._toast.showSimple(text)
  }
  _debug (text) {
    this._log.debug('mcAuth - ' + text)
  }
}

export default angular.module('app.packService', []).service('packs', packs).name
