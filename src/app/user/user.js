/**
 * Created by l.heddendorp on 20.03.2016.
 */
import angular from 'angular'

import template from './user.ng.html'
import mcAuthService from './../services/minecraftAuth'

class UserCtrl {
  constructor (mcAuth) {
    'ngInject'
    this._auth = mcAuth
  }
  login () {
    this._auth.authenticate(this.username, this.password)
  }
}

let user = {
  restrict: 'E',
  bindings: {},
  template,
  controller: UserCtrl,
  controllerAs: 'user'
}

export default angular
  .module('app.user', [
    mcAuthService
  ])
  .component('user', user)
  .name
