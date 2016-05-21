/**
 * Created by Lukas on 28.03.2016.
 */
import angular from 'angular'
import async from 'async'
import request from 'request'
import jetpack from 'fs-jetpack'
import zip from 'adm-zip'
import os from 'os';

class packs {
  constructor($log, $mdToast, $rootScope) {
    'ngInject'
    this._zip = zip
    this._async = async
    this._fs = jetpack
    this._request = request
    this._toast = $mdToast
    this._log = $log
    this._os = os;
    this.progress1 = 0;
    this.progress2 = 0;
    this._scope = $rootScope
  }

  install(pack) {
    let url = pack.solder + 'modpack/' + pack.name;
    let packdir = this._fs.dir('data').dir(pack.name, {empty: true});
    let cachedir = this._fs.dir('data').dir('.cache', {empty: true});
    this._request(url, {json: true}, (err, res, pack) => {
      if (err) {
        this._debug(err);
        return;
      }
      if (res.statusCode != 200) {
        this._notify('Invalid request');
        this._debug(res);
        return;
      }
      url += '/' + pack.recommended;
      this._request(url, {json: true}, (err, res, build) => {
        if (err) {
          this._debug(err);
          return;
        }
        if (res.statusCode != 200) {
          this._notify('Invalid request');
          this._debug(res);
          return;
        }
        let mods = build.mods;
        this._async.parallel([
          this.installMcLibs(build.minecraft, packdir),
          this.installSolderMods(mods, packdir, cachedir)
        ], () => {
          this.progress1 = 0;
          this.progress2 = 0;
          this._notify('Modpack installed');
        });
      });
    });
  }

  installSolderMods(mods, packdir, cachedir) {
    this._notify('Installing modpack ...');
    let totalcount = mods.length * 2, done = 0;
    this._async.forEachOfLimit(mods, 10, (mod, key, callback) => {
      let r = this._request(mod.url).pipe(this._fs.createWriteStream(cachedir.path() + '/' + mod.md5 + '.zip'));
      r.on('error', (err) => {
        console.error('Download error!');
        console.error(err);
        console.log(value);
      });
      r.on('close', () => {
        done++;
        this._scope.$apply(() => {
          this.progress1 = (done / totalcount) * 100;
        });
        new this._zip(cachedir.path() + '/' + mod.md5 + '.zip').extractAllTo(packdir.path(), true);
        done++;
        this._scope.$apply(() => {
          this.progress1 = (done / totalcount) * 100;
        });
        callback();
      });
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.info('done');
      this._notify('Mods downloaded');
      this._scope.$apply(() => {
        this.progress1 = 0;
      });
    });
  }

  installMcLibs(version, packdir) {
    let url = `https://s3.amazonaws.com/Minecraft.Download/versions/${version}/${version}.json`;
    this._debug('Loading libs');
    this._debug(url);
    let libdir = packdir.dir('libs', {empty: true});
    let nativedir = packdir.dir('natives', {empty: true});
    this._request(url, {json: true}, (err, res, version) => {
      if (err) {
        console.error(err);
        return;
      }
      if (res.statusCode != 200) {
        this._notify('Invalid request');
        this._debug(res);
        return;
      }
      this._debug(version);
      switch (this._os.platform()) {
        case 'darwin':
          var platform = 'osx';
          break;
        case 'win32':
          var platform = 'windows';
          break;
        case 'linux':
          var platform = 'linux';
          break;
      }
      switch (this._os.arch()) {
        case 'ia32':
          var arch = '32';
          break;
        case 'x64':
          var arch = '64';
          break;
      }
      let totalcount = version.libraries.length;
      let done = 0;
      this._async.forEachOfLimit(version.libraries, 10, (library, key, callback) => {
        if (library.rules) {
          library.rules.forEach((rule) => {
            if (rule.action == 'disallow') {
              if (rule.os.name == platform) {
                done ++;
                this._scope.$apply(() => {
                  this.progress2 = (done / totalcount) * 100;
                });
                callback();
              }
            }
          })
        }
        if (library.downloads.artifact) {
          var file = library.downloads.artifact;

        } else {
          let native = library.natives[platform];
          native = native.replace('${arch}', arch);
          var file = library.downloads.classifiers[native];
        }
        let patharray = file.path.split('/');
        let filename = patharray[patharray.length - 1];
        let r = this._request(file.url).pipe(this._fs.createWriteStream(libdir.path() + '/' + filename));
        r.on('error', (err) => {
          console.error('Download error!');
          console.error(err);
          console.log(value);
        });
        r.on('close', () => {
          if (library.extract) {
            new this._zip(libdir.path() + '/' + filename).extractAllTo(nativedir.path(), true);
          }
          done ++;
          this._scope.$apply(() => {
            this.progress2 = (done / totalcount) * 100;
          });
          callback();
        });
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.info('done');
        this._notify('Libraries downloaded');
      });
    });
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
