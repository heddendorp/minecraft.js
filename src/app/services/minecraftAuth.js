/**
 * Created by l.heddendorp on 20.03.2016.
 */
import angular from 'angular'
import request from 'request'

class mcAuth {
  constructor ($log, $mdToast, $q, db) {
    'ngInject'
    this._q = $q
    this._log = $log
    this._toast = $mdToast
    this._request = request
    db.get().then((db) => {
      this._db = db
      if (this._db.getCollection('auth')) {
        this._collection = this._db.getCollection('auth')
      } else {
        this._collection = this._db.addCollection('auth')
        this._collection.insert({
          username: false,
          password: false
        })
      }
      let data = this._collection.get(1)
      if (data.username) {
        this.authenticate(data.username, data.password)
      }
    })
    this.user = false
    this.loginData = {}
  }
  _notify (text) {
    this._toast.showSimple(text)
  }
  _debug (text) {
    if (typeof text === 'string') {
      this._log.debug('mcAuth - ' + text)
    } else {
      this._log.debug('mcAuth - dump')
      this._log.debug(text)
    }
  }
  logout () {
    this.user = null
  }
  authenticate (username, password) {
    let deferred = this._q.defer()
    let request = {
      agent: {
        name: 'Minecraft',
        version: 1
      },
      username: username,
      password: password
    }
    let vm = this
    this._request({
      url: 'https://authserver.mojang.com/authenticate',
      method: 'POST',
      json: true,
      body: request
    }, (err, res, body) => {
      if (err) {
        console.warn(err)
        this._notify('An error occurred')
        deferred.reject(err)
      } else if (res.statusCode !== 200) {
        this._notify('Credentials invalid')
        this._debug(res)
        this._debug(body)
        deferred.reject(res.statusMessage)
      } else {
        this._notify('Login successful')
        let data = vm._collection.get(1)
        data.username = username
        data.password = password
        vm._collection.update(data)
        vm.user = body
        deferred.resolve(true)
      }
    })
    return deferred.promise
  }
}

export default angular.module('app.mcAuthService', []).service('mcAuth', mcAuth).name
