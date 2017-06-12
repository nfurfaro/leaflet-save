# leaflet-save
A leaflet plugin that provides a hook to save the map state as JSON.

```js
    var state = map.save();
    // post state to an endpoint
    // http.post(mapState);

    // save state to local storage
    // localStorage.set('map', mapState);

    console.log(state);
```


```json
{
    "zoom": 12,
    "center": [
        51.512588580360244,
        -0.10351181030273439
    ],
    "bounds": [
        [
            51.61396614657711,
            -0.20565032958984375
        ],
        [
            51.41098490443605,
            -0.0010299682617187502
        ]
    ],
    "layers": [
        {
            "type": "TileLayer",
            "options": {
                "maxZoom": 18,
                "attribution": "Map data © OpenStreetMap contributors",
                "subdomains": [
                    "a",
                    "b",
                    "c"
                ]
            }
        },
        {
            "type": "TileLayer.wms",
            "options": {
                "layers": "nexrad-n0r-900913",
                "format": "image/png",
                "transparent": true,
                "attribution": "Weather data © 2012 IEM Nexrad"
            }
        }
    ]
}
```