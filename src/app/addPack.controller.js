/**
 * Created by l.heddendorp on 25.03.2016.
 */
import request from 'request'
export default class PackController {
  constructor ($mdDialog, $mdToast, packs) {
    'ngInject'
    this._request = request
    this._toast = $mdToast
    this._dialog = $mdDialog
    this._packs = packs
    this.progress = false
  }
  _notify (text) {
    this._toast.showSimple(text)
  }
  add () {
    this.progress = true
    this._request({
      url: this.url + '?build=99',
      method: 'GET',
      json: true,
      body: request
    }, (err, res, body) => {
      if (err) {
        console.warn(err)
        this._notify('An error occurred')
      } else if (body.error) {
        console.warn(res)
        console.warn(body)
        this._notify(body.error)
      } else {
        this._notify('Fetch successful')
        this._packs.add(body)
        console.info(body)
      }
      this.progress = false
    })
  }
  cancel () {
    this._dialog.cancel()
  }
}
