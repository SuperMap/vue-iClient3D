define(["./when-7d8885d2","./buildModuleUrl-9403d69d","./Cartographic-9ee1f1bd","./Check-737bd4ec","./ComponentDatatype-94b9147c","./FrustumGeometry-cb300324","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./FeatureDetection-07e177c7","./Cartesian2-54f49cd5","./Math-4ffce144","./Event-1c0f5ff4","./RuntimeError-f53bcb51","./WebGLConstants-6b41cc89","./Cartesian4-6d2e270a","./Plane-74ce87e7","./VertexFormat-86386b6b"],(function(e,t,r,n,a,i,u,o,c,s,p,m,d,f,h,g,_){"use strict";function k(t){var n,a,o=t.frustum,c=t.orientation,s=t.origin,p=e.defaultValue(t._drawNearPlane,!0);o instanceof i.PerspectiveFrustum?(n=0,a=i.PerspectiveFrustum.packedLength):o instanceof i.OrthographicFrustum&&(n=1,a=i.OrthographicFrustum.packedLength),this._frustumType=n,this._frustum=o.clone(),this._origin=r.Cartesian3.clone(s),this._orientation=u.Quaternion.clone(c),this._drawNearPlane=p,this._workerName="createFrustumOutlineGeometry",this.packedLength=2+a+r.Cartesian3.packedLength+u.Quaternion.packedLength}k.pack=function(t,n,a){a=e.defaultValue(a,0);var o=t._frustumType,c=t._frustum;return n[a++]=o,0===o?(i.PerspectiveFrustum.pack(c,n,a),a+=i.PerspectiveFrustum.packedLength):(i.OrthographicFrustum.pack(c,n,a),a+=i.OrthographicFrustum.packedLength),r.Cartesian3.pack(t._origin,n,a),a+=r.Cartesian3.packedLength,u.Quaternion.pack(t._orientation,n,a),n[a+=u.Quaternion.packedLength]=t._drawNearPlane?1:0,n};var l=new i.PerspectiveFrustum,y=new i.OrthographicFrustum,v=new u.Quaternion,F=new r.Cartesian3;return k.unpack=function(t,n,a){n=e.defaultValue(n,0);var o,c=t[n++];0===c?(o=i.PerspectiveFrustum.unpack(t,n,l),n+=i.PerspectiveFrustum.packedLength):(o=i.OrthographicFrustum.unpack(t,n,y),n+=i.OrthographicFrustum.packedLength);var s=r.Cartesian3.unpack(t,n,F);n+=r.Cartesian3.packedLength;var p=u.Quaternion.unpack(t,n,v),m=1===t[n+=u.Quaternion.packedLength];if(!e.defined(a))return new k({frustum:o,origin:s,orientation:p,_drawNearPlane:m});var d=c===a._frustumType?a._frustum:void 0;return a._frustum=o.clone(d),a._frustumType=c,a._origin=r.Cartesian3.clone(s,a._origin),a._orientation=u.Quaternion.clone(p,a._orientation),a._drawNearPlane=m,a},k.createGeometry=function(e){var r=e._frustumType,n=e._frustum,s=e._origin,p=e._orientation,m=e._drawNearPlane,d=new Float64Array(24);i.FrustumGeometry._computeNearFarPlanes(s,p,r,n,d);for(var f,h,g=new o.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:d})}),_=m?2:1,k=new Uint16Array(8*(_+1)),l=m?0:1;l<2;++l)h=4*l,k[f=m?8*l:0]=h,k[f+1]=h+1,k[f+2]=h+1,k[f+3]=h+2,k[f+4]=h+2,k[f+5]=h+3,k[f+6]=h+3,k[f+7]=h;for(l=0;l<2;++l)h=4*l,k[f=8*(_+l)]=h,k[f+1]=h+4,k[f+2]=h+1,k[f+3]=h+5,k[f+4]=h+2,k[f+5]=h+6,k[f+6]=h+3,k[f+7]=h+7;return new u.Geometry({attributes:g,indices:k,primitiveType:c.PrimitiveType.LINES,boundingSphere:t.BoundingSphere.fromVertices(d)})},function(t,r){return e.defined(r)&&(t=k.unpack(t,r)),k.createGeometry(t)}}));
