/**
 * Created by l.heddendorp on 23.03.2016.
 */
export default class SettingsCtrl {
  constructor ($mdDialog) {
    'ngInject'
    this._dialog = $mdDialog
  }
  cancel () {
    this._dialog.cancel()
  }
}
