/**
 * Created by l.heddendorp on 22.03.2016.
 */
export default class SettingsCtrl {
  constructor ($mdDialog, $mdToast, mcAuth) {
    'ngInject'
    this._toast = $mdToast.showSimple
    this._auth = mcAuth
    this._dialog = $mdDialog
  }
  login () {
    this._auth.authenticate(this.username, this.password)
  }
  cancel () {
    this._dialog.cancel()
  }
}
