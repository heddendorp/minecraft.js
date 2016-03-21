/**
 * Created by l.heddendorp on 20.03.2016.
 */
import angular from 'angular'

class mcAuth {
  constructor ($http, $log) {
    'ngInject'
    this._http = $http
    this._log = $log
    this.user = true
    this.loginData = {}
  }
  _debug (text) {
    this._log.debug('mcAuth - ' + text)
  }
  authenticate (username, password) {
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
    this._http.post('https://authserver.mojang.com/authenticate', request).then((res) => {
      this._debug('Auth response received')
      this._debug(res)
      this.loginData = {
        username: username,
        password: password
      }
    }, (error) => { this._log.error(error) })
  }
}

export default angular.module('app.mcAuthService', []).service('mcAuth', mcAuth).name
