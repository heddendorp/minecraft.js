/**
 * Created by l.heddendorp on 20.03.2016.
 */
export default function theme ($mdThemingProvider) {
  'ngInject'
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('cyan')
    .dark()
}
