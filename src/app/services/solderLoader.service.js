/**
 * Created by Lukas on 28.03.2016.
 */
import angular from 'angular'
import async from 'async'
import request from 'request'
import jetpack from 'fs-jetpack'
import zip from 'adm-zip'

class packs {
  constructor($log, $mdToast, $rootScope) {
    'ngInject'
    this._zip = zip
    this._async = async
    this._fs = jetpack
    this._request = request
    this._toast = $mdToast
    this._log = $log
    this.progress = 0
    this._scope = $rootScope
  }

  install(pack) {
    var progress = this.progress
    this._debug(pack)
    let url = pack.solder + 'modpack/' + pack.name
    this._debug(url)
    this._request(url, {json: true}, (err, res, body) => {
      if (err) {
        this._debug(err)
      }
      if (res.statusCode != 200) {
        this._notify('Invalid request')
      }
      this._debug(body)
      url += '/' + body.recommended
      this._request(url, {json: true}, (err, res, body) => {
        if (err) {
          this._debug(err)
        }
        if (res.statusCode != 200) {
          this._notify('Invalid request')
        }
        this._debug(body)
        let dir = this._fs.dir('data').dir(pack.name, {empty: true});
        let cachedir = this._fs.dir('data').dir('.cache', {empty: true});
        this._debug(dir)
        let totalcount = body.mods.length * 2, done = 0;
        this._async.forEachOfLimit(body.mods, 10, (value, key, callback) => {
          let r = this._request(value.url).pipe(this._fs.createWriteStream(cachedir.path() + '/' + value.md5 + '.zip'));
          r.on('error', (err) => {
            console.error('Download error!');
            console.error(err);
            console.log(value);
          })
          r.on('close', () => {
            done++;
            console.log((done / totalcount) * 100 + '%');
            let zip = new this._zip(cachedir.path() + '/' + value.md5 + '.zip').extractAllTo(dir.path(), true);
            done++;
            console.log((done / totalcount) * 100 + '%');
            this._scope.$apply(() => {
              this.progress = (done / totalcount) * 100;
            });
            callback();
          });
        }, (err) => {
          if (err) {
            console.error(err);
          }
          console.info('done');
          this._scope.$apply(() => {
            this.progress = 0;
          });
        });
      })
    })
  }

  _notify(text) {
    this._toast.showSimple(text)
  }

  _debug(msg) {
    if (typeof msg != 'string') {
      this._log.debug('sLoader ####')
      this._log.debug(msg)
    } else {
      this._log.debug('sLoader - ' + msg)
    }
  }
}

export default angular
  .module('app.solderLoader', [])
  .service('sLoader', packs)
  .name
