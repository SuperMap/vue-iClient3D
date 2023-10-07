define(["exports","./buildModuleUrl-9403d69d","./Cartographic-9ee1f1bd","./Check-737bd4ec","./when-7d8885d2","./Cartesian2-54f49cd5","./AttributeCompression-cd5a3a25","./ComponentDatatype-94b9147c","./Math-4ffce144","./FeatureDetection-07e177c7"],(function(e,t,i,r,a,n,o,s,m,c){"use strict";function d(e,t){this._ellipsoid=e,this._cameraPosition=new i.Cartesian3,this._cameraPositionInScaledSpace=new i.Cartesian3,this._distanceToLimbInScaledSpaceSquared=0,a.defined(t)&&(this.cameraPosition=t)}Object.defineProperties(d.prototype,{ellipsoid:{get:function(){return this._ellipsoid}},cameraPosition:{get:function(){return this._cameraPosition},set:function(e){var t=this._ellipsoid.transformPositionToScaledSpace(e,this._cameraPositionInScaledSpace),r=i.Cartesian3.magnitudeSquared(t)-1;i.Cartesian3.clone(e,this._cameraPosition),this._cameraPositionInScaledSpace=t,this._distanceToLimbInScaledSpaceSquared=r}}});var u=new i.Cartesian3;d.prototype.isPointVisible=function(e){return b(this._ellipsoid.transformPositionToScaledSpace(e,u),this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)},d.prototype.isScaledSpacePointVisible=function(e){return b(e,this._cameraPositionInScaledSpace,this._distanceToLimbInScaledSpaceSquared)};var l=new i.Cartesian3;d.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid=function(e,t){var i,r,n=this._ellipsoid;return a.defined(t)&&t<0&&n.minimumRadius>-t?((r=l).x=this._cameraPosition.x/(n.radii.x+t),r.y=this._cameraPosition.y/(n.radii.y+t),r.z=this._cameraPosition.z/(n.radii.z+t),i=r.x*r.x+r.y*r.y+r.z*r.z-1):(r=this._cameraPositionInScaledSpace,i=this._distanceToLimbInScaledSpaceSquared),b(e,r,i)},d.prototype.computeHorizonCullingPoint=function(e,t,i){return C(this._ellipsoid,e,t,i)};var p=n.Ellipsoid.clone(n.Ellipsoid.UNIT_SPHERE);d.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid=function(e,t,i,r){return C(x(this._ellipsoid,i,p),e,t,r)},d.prototype.computeHorizonCullingPointFromVertices=function(e,t,i,r,a){return y(this._ellipsoid,e,t,i,r,a)},d.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid=function(e,t,i,r,a,n){return y(x(this._ellipsoid,a,p),e,t,i,r,n)};var h=[];d.prototype.computeHorizonCullingPointFromRectangle=function(e,r,a){var o=n.Rectangle.subsample(e,r,0,h),s=t.BoundingSphere.fromPoints(o);if(!(i.Cartesian3.magnitude(s.center)<.1*r.minimumRadius))return this.computeHorizonCullingPoint(s.center,o,a)};var f=new i.Cartesian3;function x(e,t,r){if(a.defined(t)&&t<0&&e.minimumRadius>-t){var o=i.Cartesian3.fromElements(e.radii.x+t,e.radii.y+t,e.radii.z+t,f);e=n.Ellipsoid.fromCartesian3(o,r)}return e}function C(e,t,r,n){a.defined(n)||(n=new i.Cartesian3);for(var o=E(e,t),s=0,m=0,c=r.length;m<c;++m){var d=M(e,r[m],o);if(d<0)return;s=Math.max(s,d)}return T(o,s,n)}var S=new i.Cartesian3;function y(e,t,r,n,o,s){a.defined(s)||(s=new i.Cartesian3),n=a.defaultValue(n,3),o=a.defaultValue(o,i.Cartesian3.ZERO);for(var m=E(e,t),c=0,d=0,u=r.length;d<u;d+=n){S.x=r[d]+o.x,S.y=r[d+1]+o.y,S.z=r[d+2]+o.z;var l=M(e,S,m);if(l<0)return;c=Math.max(c,l)}return T(m,c,s)}function b(e,t,r){var a=t,n=r,o=i.Cartesian3.subtract(e,a,u),s=-i.Cartesian3.dot(o,a);return!(n<0?s>0:s>n&&s*s/i.Cartesian3.magnitudeSquared(o)>n)}var g=new i.Cartesian3,v=new i.Cartesian3;function M(e,t,r){var a=e.transformPositionToScaledSpace(t,g),n=i.Cartesian3.magnitudeSquared(a),o=Math.sqrt(n),s=i.Cartesian3.divideByScalar(a,o,v);n=Math.max(1,n);var m=1/(o=Math.max(1,o));return 1/(i.Cartesian3.dot(s,r)*m-i.Cartesian3.magnitude(i.Cartesian3.cross(s,r,s))*(Math.sqrt(n-1)*m))}function T(e,t,r){if(!(t<=0||t===1/0||t!=t))return i.Cartesian3.multiplyByScalar(e,t,r)}var P=new i.Cartesian3;function E(e,t){return i.Cartesian3.equals(t,i.Cartesian3.ZERO)?t:(e.transformPositionToScaledSpace(t,P),i.Cartesian3.normalize(P,P))}var z=Object.freeze({NONE:0,BITS12:1}),N=new i.Cartesian3,I=new i.Cartesian3,B=new n.Cartesian2,_=new c.Matrix4,A=new c.Matrix4,w=Math.pow(2,12);function H(e,t,r,n,o,s){var m,d,u,l=z.NONE;if(a.defined(e)&&a.defined(t)&&a.defined(r)&&a.defined(n)){var p=e.minimum,h=e.maximum,f=i.Cartesian3.subtract(h,p,I),x=r-t;l=Math.max(i.Cartesian3.maximumComponent(f),x)<w-1?z.BITS12:z.NONE,l=z.NONE,m=e.center,d=c.Matrix4.inverseTransformation(n,new c.Matrix4);var C=i.Cartesian3.negate(p,N);c.Matrix4.multiply(c.Matrix4.fromTranslation(C,_),d,d);var S=N;S.x=1/f.x,S.y=1/f.y,S.z=1/f.z,c.Matrix4.multiply(c.Matrix4.fromScale(S,_),d,d),u=c.Matrix4.clone(n),c.Matrix4.setTranslation(u,i.Cartesian3.ZERO,u),n=c.Matrix4.clone(n,new c.Matrix4);var y=c.Matrix4.fromTranslation(p,_),b=c.Matrix4.fromScale(f,A),g=c.Matrix4.multiply(y,b,_);c.Matrix4.multiply(n,g,n),c.Matrix4.multiply(u,g,u)}this.quantization=l,this.minimumHeight=t,this.maximumHeight=r,this.center=m,this.toScaledENU=d,this.fromScaledENU=n,this.matrix=u,this.hasVertexNormals=o,this.hasWebMercatorT=a.defaultValue(s,!1)}H.prototype.encode=function(e,t,r,a,s,d,u){var l=a.x,p=a.y;if(this.quantization===z.BITS12){(r=c.Matrix4.multiplyByPoint(this.toScaledENU,r,N)).x=m.CesiumMath.clamp(r.x,0,1),r.y=m.CesiumMath.clamp(r.y,0,1),r.z=m.CesiumMath.clamp(r.z,0,1);var h=this.maximumHeight-this.minimumHeight,f=m.CesiumMath.clamp((s-this.minimumHeight)/h,0,1);n.Cartesian2.fromElements(r.x,r.y,B);var x=o.AttributeCompression.compressTextureCoordinates(B);n.Cartesian2.fromElements(r.z,f,B);var C=o.AttributeCompression.compressTextureCoordinates(B);n.Cartesian2.fromElements(l,p,B);var S=o.AttributeCompression.compressTextureCoordinates(B);if(e[t++]=x,e[t++]=C,e[t++]=S,this.hasWebMercatorT){n.Cartesian2.fromElements(u,0,B);var y=o.AttributeCompression.compressTextureCoordinates(B);e[t++]=y}}else i.Cartesian3.subtract(r,this.center,N),e[t++]=N.x,e[t++]=N.y,e[t++]=N.z,e[t++]=s,e[t++]=l,e[t++]=p,this.hasWebMercatorT&&(e[t++]=u);return this.hasVertexNormals&&(e[t++]=o.AttributeCompression.octPackFloat(d)),t},H.prototype.decodePosition=function(e,t,r){if(a.defined(r)||(r=new i.Cartesian3),t*=this.getStride(),this.quantization===z.BITS12){var n=o.AttributeCompression.decompressTextureCoordinates(e[t],B);r.x=n.x,r.y=n.y;var s=o.AttributeCompression.decompressTextureCoordinates(e[t+1],B);return r.z=s.x,c.Matrix4.multiplyByPoint(this.fromScaledENU,r,r)}return r.x=e[t],r.y=e[t+1],r.z=e[t+2],i.Cartesian3.add(r,this.center,r)},H.prototype.decodeTextureCoordinates=function(e,t,i){return a.defined(i)||(i=new n.Cartesian2),t*=this.getStride(),this.quantization===z.BITS12?o.AttributeCompression.decompressTextureCoordinates(e[t+2],i):n.Cartesian2.fromElements(e[t+4],e[t+5],i)},H.prototype.decodeHeight=function(e,t){return t*=this.getStride(),this.quantization===z.BITS12?o.AttributeCompression.decompressTextureCoordinates(e[t+1],B).y*(this.maximumHeight-this.minimumHeight)+this.minimumHeight:e[t+3]},H.prototype.decodeWebMercatorT=function(e,t){return t*=this.getStride(),this.quantization===z.BITS12?o.AttributeCompression.decompressTextureCoordinates(e[t+3],B).x:e[t+6]},H.prototype.getOctEncodedNormal=function(e,t,i){var r=e[t=(t+1)*this.getStride()-1]/256,a=Math.floor(r),o=256*(r-a);return n.Cartesian2.fromElements(a,o,i)},H.prototype.getStride=function(){var e;if(this.quantization===z.BITS12)e=3;else e=6;return this.hasWebMercatorT&&++e,this.hasVertexNormals&&++e,e};var q={position3DAndHeight:0,textureCoordAndEncodedNormals:1},V={compressed0:0,compressed1:1};H.prototype.getAttributes=function(e){var t,i=s.ComponentDatatype.FLOAT,r=s.ComponentDatatype.getSizeInBytes(i);if(this.quantization===z.NONE){var a=2;this.hasWebMercatorT&&++a,this.hasVertexNormals&&++a;var n=[{index:q.position3DAndHeight,name:"position3DAndHeight",vertexBuffer:e,componentDatatype:i,componentsPerAttribute:4,offsetInBytes:0,strideInBytes:t=(4+a)*r},{index:q.textureCoordAndEncodedNormals,name:"textureCoordAndEncodedNormals",vertexBuffer:e,componentDatatype:i,componentsPerAttribute:a,offsetInBytes:4*r,strideInBytes:t}];return n}var o=3,m=0;return(this.hasWebMercatorT||this.hasVertexNormals)&&++o,this.hasWebMercatorT&&this.hasVertexNormals?(t=(o+ ++m)*r,[{index:n.compressed0,name:"compressed0",vertexBuffer:e,componentDatatype:i,componentsPerAttribute:o,offsetInBytes:0,strideInBytes:t},{index:n.compressed1,name:"compressed1",vertexBuffer:e,componentDatatype:i,componentsPerAttribute:m,offsetInBytes:o*r,strideInBytes:t}]):[{index:n.compressed0,name:"compressed0",vertexBuffer:e,componentDatatype:i,componentsPerAttribute:o}]},H.prototype.getAttributeLocations=function(){return this.quantization===z.NONE?q:V},H.clone=function(e,t){return a.defined(t)||(t=new H),t.quantization=e.quantization,t.minimumHeight=e.minimumHeight,t.maximumHeight=e.maximumHeight,t.center=i.Cartesian3.clone(e.center),t.toScaledENU=c.Matrix4.clone(e.toScaledENU),t.fromScaledENU=c.Matrix4.clone(e.fromScaledENU),t.matrix=c.Matrix4.clone(e.matrix),t.hasVertexNormals=e.hasVertexNormals,t.hasWebMercatorT=e.hasWebMercatorT,t},e.EllipsoidalOccluder=d,e.TerrainEncoding=H}));
