define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'esri/geometry/Point',
  'esri/SpatialReference',
  'esri/geometry/webMercatorUtils',
  'esri/geometry/projection',
  'esri/geometry/geometryEngine'
], function(declare, BaseWidget, Point, SpatialReference, webMercatorUtils, projection, geometryEngine) {

  return declare([BaseWidget], {

    baseClass: 'jimu-widget-locatebyxywidget',

    postCreate: function() {
      projection.load(); // Charge les projections personnalisées
    },

    _onLocate: function() {
      var x = parseFloat(this.xInput.value);
      var y = parseFloat(this.yInput.value);
      if (isNaN(x) || isNaN(y)) {
        alert("Coordonnées non valides !");
        return;
      }

      var point = new Point(x, y, new SpatialReference({ wkid: 26191 })); // EPSG:26191

      projection.load().then(() => {
        projection.project(point, this.map.spatialReference).then((projectedPoint) => {
          this.map.centerAndZoom(projectedPoint, 15); // Zoom sur le point
        }, (err) => {
          console.error("Erreur de reprojection :", err);
        });
      });
    }

  });
});
