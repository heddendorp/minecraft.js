/**
 * Created by l.heddendorp on 20.03.2016.
 */
import angular from 'angular'
import request from 'request'

class mcAuth {
  constructor ($log) {
    'ngInject'
    this._log = $log
    this._request = request
    this.user = false
    this.loginData = {}
  }
  _debug (text) {
    this._log.debug('mcAuth - ' + text)
  }
  logout () {
    this.user = null
  }
  authenticate (username, password) {
    this._debug('Authentication with: ' + username + ' / ' + password)
    let request = {
      agent: {                              // defaults to Minecraft
        name: 'Minecraft',                  // For Mojang's other game Scrolls, "Scrolls" should be used
        version: 1                          // This number might be increased
                                            // by the vanilla client in the future
      },
      username: username,                   // Can be an email address or player name for
                                            // unmigrated accounts
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
      }
      vm.loginData = request
      vm.user = body
      console.info(res)
      console.info(body)
    })
  }
}

export default angular.module('app.mcAuthService', []).service('mcAuth', mcAuth).name
