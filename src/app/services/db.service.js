/**
 * Created by l.heddendorp on 25.03.2016.
 */
import angular from 'angular'

class db {
  constructor (Loki, $q) {
    'ngInject'
    this._q = $q
    this._loki = Loki
  }
  get () {
    let deferred = this._q.defer()
    let db = new this._loki('minecraftjs', {
      autosave: true,
      autoload: true,
      autoloadCallback: () => { deferred.resolve(db) },
      autosaveInterval: 1000,
      persistenceMethod: 'localStorage'
    })
    return deferred.promise
  }
}

export default angular.module('app.dbService', []).service('db', db).name
