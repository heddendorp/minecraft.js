/**
 * Created by l.heddendorp on 22.03.2016.
 */
export default class SettingsCtrl {
  constructor ($mdDialog, $mdToast, mcAuth) {
    'ngInject'
    this._toast = $mdToast.showSimple
    this._auth = mcAuth
    this._dialog = $mdDialog
    this.progress = false
  }
  login () {
    this.progress = true
    this._auth.authenticate(this.username, this.password).then(
      () => {
        this.progress = false
        this.cancel()
      },
      () => {
        this.progress = false
        this.password = ''
      }
    )
  }
  cancel () {
    this.username = ''
    this.password = ''
    this._dialog.cancel()
  }
}
