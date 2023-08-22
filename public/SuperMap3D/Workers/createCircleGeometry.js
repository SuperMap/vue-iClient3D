define(["./Cartographic-9ee1f1bd","./Check-737bd4ec","./when-7d8885d2","./EllipseGeometry-50b042bd","./Cartesian2-54f49cd5","./VertexFormat-86386b6b","./Math-4ffce144","./arrayFill-0e93951b","./buildModuleUrl-9403d69d","./FeatureDetection-07e177c7","./Cartesian4-6d2e270a","./RuntimeError-f53bcb51","./WebGLConstants-6b41cc89","./Event-1c0f5ff4","./ComponentDatatype-94b9147c","./EllipseGeometryLibrary-3fd0fdf0","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./GeometryInstance-66495308","./GeometryOffsetAttribute-fbeb6f1a","./GeometryPipeline-78c783ae","./AttributeCompression-cd5a3a25","./EncodedCartesian3-8b0babb6","./IndexDatatype-cb5f74b7","./IntersectionTests-6a0482c9","./Plane-74ce87e7"],(function(e,t,i,r,o,a,n,l,s,d,m,c,u,p,y,_,f,h,G,x,b,g,v,E,w,A){"use strict";function C(e){var t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).radius,o={center:e.center,semiMajorAxis:t,semiMinorAxis:t,ellipsoid:e.ellipsoid,height:e.height,extrudedHeight:e.extrudedHeight,granularity:e.granularity,vertexFormat:e.vertexFormat,stRotation:e.stRotation,shadowVolume:e.shadowVolume};this._ellipseGeometry=new r.EllipseGeometry(o),this._workerName="createCircleGeometry"}C.packedLength=r.EllipseGeometry.packedLength,C.pack=function(e,t,i){return r.EllipseGeometry.pack(e._ellipseGeometry,t,i)};var M=new r.EllipseGeometry({center:new e.Cartesian3,semiMajorAxis:1,semiMinorAxis:1}),F={center:new e.Cartesian3,radius:void 0,ellipsoid:o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),height:void 0,extrudedHeight:void 0,granularity:void 0,vertexFormat:new a.VertexFormat,stRotation:void 0,semiMajorAxis:void 0,semiMinorAxis:void 0,shadowVolume:void 0};return C.unpack=function(t,n,l){var s=r.EllipseGeometry.unpack(t,n,M);return F.center=e.Cartesian3.clone(s._center,F.center),F.ellipsoid=o.Ellipsoid.clone(s._ellipsoid,F.ellipsoid),F.height=s._height,F.extrudedHeight=s._extrudedHeight,F.granularity=s._granularity,F.vertexFormat=a.VertexFormat.clone(s._vertexFormat,F.vertexFormat),F.stRotation=s._stRotation,F.shadowVolume=s._shadowVolume,i.defined(l)?(F.semiMajorAxis=s._semiMajorAxis,F.semiMinorAxis=s._semiMinorAxis,l._ellipseGeometry=new r.EllipseGeometry(F),l):(F.radius=s._semiMajorAxis,new C(F))},C.createGeometry=function(e){return r.EllipseGeometry.createGeometry(e._ellipseGeometry)},C.createShadowVolume=function(e,t,i){var r=e._ellipseGeometry._granularity,o=e._ellipseGeometry._ellipsoid,n=t(r,o),l=i(r,o);return new C({center:e._ellipseGeometry._center,radius:e._ellipseGeometry._semiMajorAxis,ellipsoid:o,stRotation:e._ellipseGeometry._stRotation,granularity:r,extrudedHeight:n,height:l,vertexFormat:a.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(C.prototype,{rectangle:{get:function(){return this._ellipseGeometry.rectangle}},textureCoordinateRotationPoints:{get:function(){return this._ellipseGeometry.textureCoordinateRotationPoints}}}),function(t,r){return i.defined(r)&&(t=C.unpack(t,r)),t._ellipseGeometry._center=e.Cartesian3.clone(t._ellipseGeometry._center),t._ellipseGeometry._ellipsoid=o.Ellipsoid.clone(t._ellipseGeometry._ellipsoid),C.createGeometry(t)}}));
