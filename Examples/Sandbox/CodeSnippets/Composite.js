(function() {
    "use strict";
    /*global Cesium,Sandbox*/

    Sandbox.CompositeLayering = function (scene, ellipsoid, primitives) {
        var handler;

        this.code = function () {
            // Move the primitive that the mouse is over to the top
            handler = new Cesium.EventHandler(scene.getCanvas());
            handler.setMouseAction(
                function (movement) {
                    var p = scene.pick(movement.endPosition);
                    if (primitives.contains(p)) {
                        primitives.bringToFront(p);
                    }
                },
                Cesium.MouseEventType.MOVE
            );

            // Setup code
            var redPolygon = new Cesium.Polygon(undefined);
            redPolygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic(-70.0, 30.0),
                new Cesium.Cartographic(-60.0, 30.0),
                new Cesium.Cartographic(-60.0, 40.0),
                new Cesium.Cartographic(-70.0, 40.0)
            ]));
            redPolygon.material.color = {
                red : 1.0,
                green : 0.0,
                blue : 0.0,
                alpha : 0.5
            };

            var bluePolygon = new Cesium.Polygon(undefined);
            bluePolygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic(-75.0, 34.0),
                new Cesium.Cartographic(-63.0, 34.0),
                new Cesium.Cartographic(-63.0, 40.0),
                new Cesium.Cartographic(-75.0, 40.0)
            ]));
            bluePolygon.material.color = {
                red : 0.0,
                green : 0.0,
                blue : 1.0,
                alpha : 0.5
            };

            var greenPolygon = new Cesium.Polygon(undefined);
            greenPolygon.setPositions(ellipsoid.cartographicDegreesToCartesians([
                new Cesium.Cartographic(-67.0, 36.0),
                new Cesium.Cartographic(-55.0, 36.0),
                new Cesium.Cartographic(-55.0, 30.0),
                new Cesium.Cartographic(-67.0, 30.0)
            ]));
            greenPolygon.material.color = {
                red : 0.0,
                green : 1.0,
                blue : 0.0,
                alpha : 0.5
            };

            // Add primitives from bottom to top
            primitives.add(redPolygon);
            primitives.add(bluePolygon);
            primitives.add(greenPolygon);
        };

        this.clear = function () {
            handler = handler && handler.destroy();
        };
    };

}());
