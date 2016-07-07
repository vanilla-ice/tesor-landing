(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.coffee", function(exports, require, module) {
$(document).ready(function() {
  Parse.initialize('WD4SCqCV1MsggPivlA2FvNuwHym2lIWxNhpAmQxu', 'bgN3ACqo9x6mmfPdtaKUoSvBVw5PFSeMucjiNx8H');
  $('.js-catalogSend').click(function() {
    var catalog_name, catalog_phone;
    catalog_name = $('#catalog_name').val();
    catalog_phone = $('#catalog_phone').val();
    return Parse.Cloud.run('sendmail', {
      target: 'valeraerohin97@mail.ru',
      originator: 'tesor@landing.ru',
      subject: 'Новая заявка!',
      text: "Имя: " + catalog_name + ", телефон: " + catalog_phone
    }, {
      success: function(success) {
        return swal('Спасибо за заявку','в ближайшее время наш менеджер свяжется с Вами');
      },
      error: function(error) {
        return swal('Ошибка');
      }
    });
  });
  $('.js-firstPage').click(function() {
    var catalog_name, catalog_phone;
    catalog_name = $('#firstPage_name').val();
    catalog_phone = $('#firstPage_phone').val();
    return Parse.Cloud.run('sendmail', {
      target: 'valeraerohin97@mail.ru',
      originator: 'tesor@landing.ru',
      subject: 'Новая заявка!',
      text: "Имя: " + catalog_name + ", телефон: " + catalog_phone
    }, {
      success: function(success) {
        return swal('Спасибо за заявку','в ближайшее время наш менеджер свяжется с Вами');
      },
      error: function(error) {
        return swal('Ошибка');
      }
    });
  });

  $('.popupFirst').click(function() {
    var catalog_name, catalog_phone;
    catalog_name = $('#popupFirst_name').val();
    catalog_phone = $('#popupFirst_phone').val();
    return Parse.Cloud.run('sendmail', {
      target: 'valeraerohin97@mail.ru',
      originator: 'tesor@landing.ru',
      subject: 'Новая заявка!',
      text: "Имя: " + catalog_name + ", телефон: " + catalog_phone
    }, {
      success: function(success) {
        return swal('Спасибо за заявку','в ближайшее время наш менеджер свяжется с Вами');
      },
      error: function(error) {
        return swal('Ошибка');
      }
    });
  });

  $('.js-demo').click(function() {
    var catalog_name, catalog_phone;
    catalog_name = $('#demoFirst_name').val();
    catalog_phone = $('#demoFirst_phone').val();
    return Parse.Cloud.run('sendmail', {
      target: 'valeraerohin97@mail.ru',
      originator: 'tesor@landing.ru',
      subject: 'Новая заявка!',
      text: "Имя: " + catalog_name + ", телефон: " + catalog_phone
    }, {
      success: function(success) {
        return swal('Спасибо за заявку','в ближайшее время наш менеджер свяжется с Вами');
      },
      error: function(error) {
        return swal('Ошибка');
      }
    });
  });

  $('.js-demo2').click(function() {
    var catalog_name, catalog_phone;
    catalog_name = $('#demoSec_name').val();
    catalog_phone = $('#demoSec_phone').val();
    return Parse.Cloud.run('sendmail', {
      target: 'valeraerohin97@mail.ru',
      originator: 'tesor@landing.ru',
      subject: 'Новая заявка!',
      text: "Имя: " + catalog_name + ", телефон: " + catalog_phone
    }, {
      success: function(success) {
        return swal('Спасибо за заявку','в ближайшее время наш менеджер свяжется с Вами');
      },
      error: function(error) {
        return swal('Ошибка');
      }
    });
  });

  $('.js-demo3').click(function() {
    var catalog_name, catalog_phone;
    catalog_name = $('#demoThird_name').val();
    catalog_phone = $('#demoThird_phone').val();
    return Parse.Cloud.run('sendmail', {
      target: 'valeraerohin97@mail.ru',
      originator: 'tesor@landing.ru',
      subject: 'Новая заявка!',
      text: "Имя: " + catalog_name + ", телефон: " + catalog_phone
    }, {
      success: function(success) {
        return swal('Спасибо за заявку','в ближайшее время наш менеджер свяжется с Вами');
      },
      error: function(error) {
        return swal('Ошибка');
      }
    });
  });

  $('.popupSecond').click(function() {
    var catalog_name, catalog_phone;
    catalog_name = $('#popupSecond_name').val();
    catalog_phone = $('#popupSecond_phone').val();
    return Parse.Cloud.run('sendmail', {
      target: 'valeraerohin97@mail.ru',
      originator: 'tesor@landing.ru',
      subject: 'Новая заявка!',
      text: "Имя: " + catalog_name + ", телефон: " + catalog_phone
    }, {
      success: function(success) {
        return swal('Спасибо за заявку','в ближайшее время наш менеджер свяжется с Вами');
      },
      error: function(error) {
        return swal('Ошибка');
      }
    });
  });
  $('.js-thirdPage').click(function() {
    var catalog_name, catalog_phone;
    catalog_name = $('#thirdPage_name').val();
    catalog_phone = $('#thirdPage_phone').val();
    return Parse.Cloud.run('sendmail', {
      target: 'valeraerohin97@mail.ru',
      originator: 'tesor@landing.ru',
      subject: 'Новая заявка!',
      text: "Имя: " + catalog_name + ", телефон: " + catalog_phone
    }, {
      success: function(success) {
        return swal('Спасибо за заявку','в ближайшее время наш менеджер свяжется с Вами');
      },
      error: function(error) {
        return swal('Ошибка');
      }
    });
  });
  window.initMap = function() {
    var cairo, map, marker, styles;
    cairo = {
      lat: 55.7480534,
      lng: 37.5805732
    };
    map = new google.maps.Map(document.getElementById('map'), {
      scaleControl: true,
      center: cairo,
      zoom: 15
    });
    marker = new google.maps.Marker({
      position: {
        lat: 55.7480534,
        lng: 37.5805732
      },
      map: map
    });
    styles = [
      {
        'featureType': 'water',
        '  elementType': 'geometry',
        'stylers': [
          {
            'color': '#C2C2C2'
          }
        ]
      }, {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#E9E9E9'
          }
        ]
      }, {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#cccccc'
          }
        ]
      }, {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#DADADA'
          }
        ]
      }, {
        'featureType': 'transit',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dadada'
          }
        ]
      }, {
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'visibility': 'on'
          }, {
            'color': '#ffffff'
          }, {
            'weight': 1.5
          }, {
            'gamma': 0.84
          }
        ]
      }, {
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#000000'
          }
        ]
      }, {
        'featureType': 'administrative',
        'elementType': 'geometry',
        'stylers': [
          {
            'weight': 0.6
          }, {
            'color': '#DADADA'
          }
        ]
      }, {
        'elementType': 'labels.icon',
        'stylers': [
          {
            'visibility': 'off'
          }
        ]
      }, {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#DADADA'
          }
        ]
      }
    ];
    return map.setOptions({
      styles: styles,
      scrollwheel: false
    });
  };
  $('.popup__close').click(function() {
    return $('.popup').hide();
  });

  $('.popup__close').click(function() {
    return $('.popup__demo').hide();
  });

  $('.hide').click(function() {
    return $('.popup').hide();
  });

  $('.demonstration__button').click(function() {
    return $('.popup__demo').show();
  });
  $('.hide').click(function() {
    return $('.popup__demo').hide();
  });

  $('.popup-show').click(function() {
    return $('.popup').show();
  });
  $('input[type="text"]').click(function() {
    return $(this).val('');
  });
  return $('.phone').mask("+7(999)999 99 99");
});
});

;require.register("___globals___", function(exports, require, module) {

});})();require('___globals___');


//# sourceMappingURL=app.js.map
