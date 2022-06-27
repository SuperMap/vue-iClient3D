function initGlobe(container) {
    const {Scene, Globe, Cartesian3, Ellipsoid,SingleTileImageryProvider} = SuperMap3D;
    container = document.getElementById(container);
    var element = document.createElement('div');
    element.className = 'widget';
    container.appendChild(element);
    var canvas = document.createElement('canvas');
    canvas.oncontextmenu = function () {
        return false;
    };
    canvas.onselectstart = function () {
        return false;
    };
    element.appendChild(canvas);

    scene = new Scene({
        canvas: canvas
    });

    scene.sun = new SuperMap3D.Sun();

    scene.pixelRatio = 1;
    scene.camera.constrainedAxis = Cartesian3.UNIT_Z;
    configureCameraFrustum();

    scene.globe = new Globe(Ellipsoid.WGS84);

    var curCanvasClientWidth = 0;
    var curCanvasClientHeight = 0;
    var lastDevicePixelRatio = 0;


    function configurePixelRatio() {
        var pixelRatio = window.devicePixelRatio;
        scene.pixelRatio = pixelRatio;
        return pixelRatio;
    }

    function computeWidthHeight(width, height, maxWidth, maxHeight) {
        var realCanvasWidth = width;
        var realCanvasHeight = height;
        if (realCanvasWidth > maxWidth || realCanvasHeight > maxHeight) {
            var scaleWidth = realCanvasWidth / maxWidth;
            var scaleHeight = realCanvasHeight / maxHeight;

            if (scaleWidth > scaleHeight) {
                realCanvasWidth = maxWidth;
                realCanvasHeight = (height / width) * maxWidth;
            } else {
                realCanvasWidth = (width / height) * maxHeight;
                realCanvasHeight = maxHeight;
            }
        }

        return {
            width: realCanvasWidth,
            height: realCanvasHeight
        };
    }

    function configureCanvasSize() {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        var pixelRatio = configurePixelRatio();
        curCanvasClientWidth = width;
        curCanvasClientHeight = height;
        width *= pixelRatio;
        height *= pixelRatio;
        var maxDrawingBufferWidth = 3840;
        var maxDrawingBufferHeight = 1080;
        var newWidthHeight = computeWidthHeight(width, height, maxDrawingBufferWidth, maxDrawingBufferHeight);
        canvas.width = newWidthHeight.width;
        canvas.height = newWidthHeight.height;
        lastDevicePixelRatio = window.devicePixelRatio;
    }

    function configureCameraFrustum() {
        var width = canvas.width;
        var height = canvas.height;
        if (width !== 0 && height !== 0) {
            var frustum = scene.camera.frustum;
            if (frustum.aspectRatio) {
                frustum.aspectRatio = width / height;
            } else {
                frustum.top = frustum.right * (height / width);
                frustum.bottom = -frustum.top;
            }
        }
    }

    function resize() {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        if (curCanvasClientWidth === width && curCanvasClientHeight === height && lastDevicePixelRatio === window.devicePixelRatio) {
            return;
        }

        configureCanvasSize();
        configureCameraFrustum();
    }

    function render() {
        resize();
        scene.initializeFrame();
        scene.render();
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // scene.imageryLayers.addImageryProvider(new SingleTileImageryProvider({
    //     url: '.././images/GlobalBkLayer.jpg'
    // }));
}

