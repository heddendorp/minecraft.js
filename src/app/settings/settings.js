/**
 * Created by l.heddendorp on 23.03.2016.
 */
import angular from 'angular'

import SettingsCtrl from './settings.dialog.controller'

class Settings {
  constructor ($log, $mdDialog) {
    'ngInject'
    this._dialog = $mdDialog
    this._log = $log
  }
  _debug (text) {
    this._log.debug('settings - ' + text)
  }
  show (event) {
    this._dialog.show({
      controller: SettingsCtrl,
      controllerAs: 'settings',
      template: require('./settings.ng.html'),
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true
    })
  }
}

export default angular.module('app.settings', []).service('settings', Settings).name
