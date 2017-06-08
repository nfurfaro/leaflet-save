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
    save: function (state, options) {
      if (state) {
                // start spinning !
        if (!this._spinner) {
          this._spinner = new Spinner(options)
                        .spin(this._container)
          this._spinning = 0
        }
        this._spinning++
      } else {
        this._spinning--
        if (this._spinning <= 0) {
                    // end spinning !
          if (this._spinner) {
            this._spinner.stop()
            this._spinner = null
          }
        }
      }
    }
  }

  var SaveMapInitHook = function () {
    this.on('layeradd', function (e) {
            // If added layer is currently loading, spin !
      if (e.layer.loading) this.spin(true)
      if (typeof e.layer.on !== 'function') return
      e.layer.on('data:loading', function () {
        this.spin(true)
      }, this)
      e.layer.on('data:loaded', function () {
        this.spin(false)
      }, this)
    }, this)
    this.on('layerremove', function (e) {
            // Clean-up
      if (e.layer.loading) this.spin(false)
      if (typeof e.layer.on !== 'function') return
      e.layer.off('data:loaded')
      e.layer.off('data:loading')
    }, this)
  }

  L.Map.include(SaveMapMixin)
  L.Map.addInitHook(SaveMapInitHook)
}, window))

// (function (factory) {
//   if (typeof define === 'function' && define.amd) {
//             // AMD
//     define(['leaflet'], factory)
//   } else if (typeof module !== 'undefined') {
//             // Node/CommonJS
//     module.exports = factory(require('leaflet'))
//   } else {
//             // Browser globals
//     if (typeof window.L === 'undefined') {
//       throw new Error('Leaflet must be loaded first')
//     }
//     factory(window.L)
//   }
// }(function (L) {
//   L.Control.Save = L.Control.extend({
//     options: {
//       position: 'topleft'
//     },

//     onAdd: function (map) {
//       var container = L.DomUtil.create('div', 'leaflet-control-save leaflet-bar leaflet-control')

//       this.link = L.DomUtil.create('a', 'leaflet-control-save-button leaflet-bar-part leaflet-disabled', container)
//       this.link.innerText = 'S'
//       this.link.href = '#'

//       this._map = map

//       L.DomEvent.on(this.link, 'click', this._toggle, this)

//       return container
//     },

//     _toggle: function (e) {
//       e.preventDefault()
//       e.stopPropagation()

//       var map = this._map

//       if (L.DomUtil.hasClass(this.link, 'leaflet-disabled')) {
//         L.DomUtil.removeClass(this.link, 'leaflet-disabled')
//         map.on('click', this._showPopup, this)
//       } else {
//         L.DomUtil.addClass(this.link, 'leaflet-disabled')
//         map.off('click', this._showPopup, this)
//       }
//     },

//     _showPopup: function (e) {
//       var map = this._map
//       var latlng = e.latlng

//       var wrapper = L.DomUtil.create('div')
//       var input = L.DomUtil.create('input', null, wrapper)
//       var saveBtn = L.DomUtil.create('button', null, wrapper)
//       saveBtn.innerText = 'save'

//       var popup = L.popup()
//                 .setLatLng(latlng)
//                 .setContent(wrapper)
//                 .openOn(map)

//       L.DomEvent.on(saveBtn, 'click', function () {
//         var val = input.value
//         map.closePopup()
//         var marker = L.circleMarker(latlng, {radius: 2}).addTo(map)
//         marker.bindTooltip(val, { permanent: true }).openTooltip()
//       })
//     }
//   })

//   L.Control.save = function (options) {
//     return new L.Control.Save(options)
//   }
// }))
