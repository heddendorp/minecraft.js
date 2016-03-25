/**
 * Created by l.heddendorp on 25.03.2016.
 */
import angular from 'angular'
import request from 'request'

class mcAuth {
  constructor ($log, $mdToast, $q) {
    'ngInject'
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

export default angular.module('app.mcAuthService', []).service('mcAuth', mcAuth).name
