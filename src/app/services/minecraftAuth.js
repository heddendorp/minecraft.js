/**
 * Created by l.heddendorp on 20.03.2016.
 */
import angular from 'angular'
import request from 'request'

class mcAuth {
  constructor ($log, $mdToast, $q) {
    'ngInject'
    this._q = $q
    this._log = $log
    this._toast = $mdToast
    this._request = request
    this.user = false
    this.loginData = {}
  }
  _notify (text) {
    this._toast.showSimple(text)
  }
  _debug (text) {
    this._log.debug('mcAuth - ' + text)
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
        deferred.reject(res.statusMessage)
      } else {
        this._notify('Login successful')
        vm.loginData = request
        vm.user = body
        deferred.resolve(true)
      }
    })
    return deferred.promise
  }
}

export default angular.module('app.mcAuthService', []).service('mcAuth', mcAuth).name
