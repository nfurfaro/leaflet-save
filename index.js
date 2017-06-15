(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
        // Browser globals
        if (typeof window.L === 'undefined') {
            throw new Error('Leaflet must be loaded first');
        }
        factory(window.L);
    }
}(function (L) {
    var SaveMapMixin = {
        save: function () {
            var center = this.getCenter();
            var bounds = this.getBounds();
            var mapState = {
              zoom: this.getZoom(),
              center: [center.lat, center.lng],
              // bounds: [
              //   [bounds.getNorth(), bounds.getWest()], // Why this way?
              //   [bounds.getSouth(), bounds.getEast()]
              // ],
              bounds: {
                North: bounds.getNorth(),
                West: bounds.getWest(),
                South: bounds.getSouth(),
                East: bounds.getEast()
              },
              layers: [],
              features: []
            };
            this.eachLayer(function (layer) {
                var l = {}
                var features = {}
                if (layer instanceof L.TileLayer.WMS) {
                    l.type = 'TileLayer.wms'
                    l._leaflet_id = layer._leaflet_id
                    l.url = layer.url
                    l.options = layer.options
                    mapState.layers.push(l)
                } else if (layer instanceof L.TileLayer) {
                    l.type = 'TileLayer'
                    l._leaflet_id = layer._leaflet_id
                    l.url = layer.url
                    l.options = layer.options
                    mapState.layers.push(l)
                } else if (layer instanceof L.FeatureGroup) {
                    console.log(layer.toGeoJSON())
                    var featureCollection = layer.toGeoJSON()
                    l.type = 'FeatureGroup'
                    l._leaflet_id = layer._leaflet_id
                    mapState.layers.push(l)
                    // mapState.features._leaflet_id.push(l._leaflet_id)
                    mapState.features.push(featureCollection)
                }
            })

            return mapState
        }
    };

    L.Map.include(SaveMapMixin);
}));


// check out "invoke", and "onEachFeature"