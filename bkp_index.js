(function (factory) {
    // define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet'], function (L) {
      factory(L)
    })
    // define a Common JS module that relies on 'leaflet'
  } else if (typeof exports === 'object') {
    module.exports = function (L) {
      if (L === undefined) {
        L = require('leaflet')
      }
      factory(L)
      return L
    }
    // attach your plugin to the global 'L' variable
  } else if (typeof window !== 'undefined' && window.L) {
    factory(window.L)
  }
}(function (L) {
  var SaveMapMixin = {
    save: function () {
      var mapState = {
        'zoom': this.getZoom(),
        'center': this.getCenter(),
        'bounds': this.getBounds(),
        'layers': []
      }

      this.eachLayer(function (layer) {
        var l = {}
        if (layer instanceof L.TileLayer) {
          l.type = 'TileLayer'
          l.url = layer.url
          l.options = layer.options
          mapState.layers.push(l)
        }
      })
      document.getElementById('state').innerHTML = JSON.stringify(mapState, null, '\t')
    }
  }

  L.Map.include(SaveMapMixin)
}, window))
