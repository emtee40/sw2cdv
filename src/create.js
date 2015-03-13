'use strict';

/******************************************************************************/

let path = require('path');
let cordovaLib = require('cordova-lib');

/******************************************************************************/

function fixPrjInfo(prjInfo) {
    prjInfo = prjInfo || {};
    prjInfo.paths = prjInfo.paths || {};
    prjInfo.paths.plugins = (prjInfo.paths.plugins || []);
    prjInfo.paths.www = prjInfo.paths.www || prjInfo.www;
    prjInfo.paths.root = prjInfo.paths.root || prjInfo.root;

    let manifest;
    try {
      manifest = require(path.join(prjInfo.paths.www, 'manifest.json'));
    } catch (e) {
      manifest = {
        name: 'DefaultSwApp',
        service_worker: 'service-worker.js'
      };
    }

    prjInfo.service_worker = manifest.service_worker || 'service-worker.js';

    if (!prjInfo.cfg) {
        let cfg = prjInfo.cfg = new cordovaLib.ConfigParser(path.join(__dirname, '..', 'assets', 'defaultConfig.xml'));
        cfg.setName(manifest.name);
        cfg.setPackageName(manifest.app_id || 'io.cordova.DefaultSwApp');
        cfg.setGlobalPreference('service_worker', manifest.service_worker);
    }
    return prjInfo;
}

/******************************************************************************/

function createIos(prjInfo) {
    prjInfo = fixPrjInfo(prjInfo);

    // Todo, should be in node_modules
    let sWpluginDirs = [
        path.join(__dirname, '../deps/PromisesPlugin'),
        path.join(__dirname, '../deps/cordova-plugin-serviceworker'),
    ];

    prjInfo.paths.plugins = prjInfo.paths.plugins.concat(sWpluginDirs);

    // Should be unnecessary when IosProject lives in cordova-ios
    prjInfo.paths.template = path.join(__dirname, '../node_modules/cordova-ios');
    prjInfo.configPath = path.join(prjInfo.paths.root, prjInfo.cfg.name(), 'config.xml');

    let proj = new cordovaLib.IosProject();
    return proj.create(prjInfo);
}

/******************************************************************************/

function createAndroid(prjInfo) {
    prjInfo = fixPrjInfo(prjInfo);

    // Should be unnecessary when IosProject lives in cordova-ios
    prjInfo.paths.template = path.join(__dirname, '../node_modules/cordova-android');
    prjInfo.configPath = path.join(prjInfo.paths.root, 'res', 'xml', 'config.xml');

    let proj = new cordovaLib.AndroidProject();
    return proj.create(prjInfo);
}

/******************************************************************************/

module.exports.ios = createIos;
module.exports.android = createAndroid;
