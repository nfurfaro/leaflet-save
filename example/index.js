(function (factory, window) {
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
}(function leafletSaveFactory (L) {
  var SaveMapMixin = {
    save: function (mapState) {
      // Build the state here
      mapState = {
        'zoom': map.getZoom(),
        'center': map.getCenter(),
        'bounds': map.getBounds(),
        'layers': []
      }

      map.eachLayer(function (layer) {
        var l = {}
        if (layer instanceof L.TileLayer) {
          l.type = 'TileLayer'
          l.url = layer.url
          l.options = layer.options
          mapState.layers.push(l)
        } else if (layer instanceof L.TileLayer.WMS) {
          l.type = 'TileLayer.wms'
          l.url = layer.url
          l.options = layer.options
          mapState.layers.push(l)
        } else if (layer instanceof L.FeatureGroup) {
          l.type = 'FeatureGroup'
          l.url = layer.url
          l.options = layer.options
          mapState.layers.push(l)
        }
      })
      console.log(JSON.stringify(state.layers))

      // Print mapState to div here.
      document.getElementById('state').innerHTML = JSON.stringify(mapState, null, '\t')
    }
  }

  L.Map.include(SaveMapMixin)
}, window))
