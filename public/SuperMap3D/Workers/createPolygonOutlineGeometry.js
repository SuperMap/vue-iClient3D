define(["./when-b60132fc","./buildModuleUrl-c0836874","./EllipsoidRhumbLine-18dee174","./arrayFill-1179ff06","./Math-3024ab74","./FeatureDetection-caf5f946","./EllipsoidTangentPlane-1a9db025","./GeometryAttribute-eb047ff3","./GeometryAttributes-252e9929","./PolygonGeometryLibrary-ceffc78b","./GeometryOffsetAttribute-fbeb6f1a","./GeometryPipeline-7ee31a30","./IndexDatatype-a3f4b187","./PrimitiveType-ebb8c588","./Cartesian4-442405e6","./Cartographic-2cfa3a3a","./Cartesian2-c4c2a8f9","./WebGLConstants-aba9fc67","./Plane-6b2f5e52","./Transforms-04c4d562","./earcut-2.2.1-20c8012f","./AttributeCompression-2ece5912","./EncodedCartesian3-6a9cfb29"],(function(e,t,i,r,o,n,a,l,s,y,u,p,d,f,c,g,h,m,b,P,v,E,_){"use strict";var A=[],G=[];function L(e,t,r,o,u){var p,c,g=a.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,A);y.PolygonPipeline.computeWindingOrder2D(g)===y.WindingOrder.CLOCKWISE&&(g.reverse(),t=t.slice().reverse());var h=t.length,m=0;if(o)for(p=new Float64Array(2*h*3),c=0;c<h;c++){var b=t[c],P=t[(c+1)%h];p[m++]=b.x,p[m++]=b.y,p[m++]=b.z,p[m++]=P.x,p[m++]=P.y,p[m++]=P.z}else{var v=0;if(u===i.ArcType.GEODESIC)for(c=0;c<h;c++)v+=y.PolygonGeometryLibrary.subdivideLineCount(t[c],t[(c+1)%h],r);else if(u===i.ArcType.RHUMB)for(c=0;c<h;c++)v+=y.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[c],t[(c+1)%h],r);for(p=new Float64Array(3*v),c=0;c<h;c++){var E;u===i.ArcType.GEODESIC?E=y.PolygonGeometryLibrary.subdivideLine(t[c],t[(c+1)%h],r,G):u===i.ArcType.RHUMB&&(E=y.PolygonGeometryLibrary.subdivideRhumbLine(e,t[c],t[(c+1)%h],r,G));for(var _=E.length,L=0;L<_;++L)p[m++]=E[L]}}var H=2*(h=p.length/3),T=d.IndexDatatype.createTypedArray(h,H);for(m=0,c=0;c<h-1;c++)T[m++]=c,T[m++]=c+1;return T[m++]=h-1,T[m++]=0,new y.GeometryInstance({geometry:new l.Geometry({attributes:new s.GeometryAttributes({position:new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p})}),indices:T,primitiveType:f.PrimitiveType.LINES})})}function H(e,t,r,o,u){var p,c,g=a.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,A);y.PolygonPipeline.computeWindingOrder2D(g)===y.WindingOrder.CLOCKWISE&&(g.reverse(),t=t.slice().reverse());var h=t.length,m=new Array(h),b=0;if(o)for(p=new Float64Array(2*h*3*2),c=0;c<h;++c){m[c]=b/3;var P=t[c],v=t[(c+1)%h];p[b++]=P.x,p[b++]=P.y,p[b++]=P.z,p[b++]=v.x,p[b++]=v.y,p[b++]=v.z}else{var E=0;if(u===i.ArcType.GEODESIC)for(c=0;c<h;c++)E+=y.PolygonGeometryLibrary.subdivideLineCount(t[c],t[(c+1)%h],r);else if(u===i.ArcType.RHUMB)for(c=0;c<h;c++)E+=y.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[c],t[(c+1)%h],r);for(p=new Float64Array(3*E*2),c=0;c<h;++c){var _;m[c]=b/3,u===i.ArcType.GEODESIC?_=y.PolygonGeometryLibrary.subdivideLine(t[c],t[(c+1)%h],r,G):u===i.ArcType.RHUMB&&(_=y.PolygonGeometryLibrary.subdivideRhumbLine(e,t[c],t[(c+1)%h],r,G));for(var L=_.length,H=0;H<L;++H)p[b++]=_[H]}}h=p.length/6;var T=m.length,C=2*(2*h+T),O=d.IndexDatatype.createTypedArray(h,C);for(b=0,c=0;c<h;++c)O[b++]=c,O[b++]=(c+1)%h,O[b++]=c+h,O[b++]=(c+1)%h+h;for(c=0;c<T;c++){var D=m[c];O[b++]=D,O[b++]=D+h}return new y.GeometryInstance({geometry:new l.Geometry({attributes:new s.GeometryAttributes({position:new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p})}),indices:O,primitiveType:f.PrimitiveType.LINES})})}function T(r){var n=r.polygonHierarchy,a=e.defaultValue(r.ellipsoid,t.Ellipsoid.WGS84),l=e.defaultValue(r.granularity,o.CesiumMath.RADIANS_PER_DEGREE),s=e.defaultValue(r.perPositionHeight,!1),u=s&&e.defined(r.extrudedHeight),p=e.defaultValue(r.arcType,i.ArcType.GEODESIC),d=e.defaultValue(r.height,0),f=e.defaultValue(r.extrudedHeight,d);if(!u){var c=Math.max(d,f);f=Math.min(d,f),d=c}this._ellipsoid=t.Ellipsoid.clone(a),this._granularity=l,this._height=d,this._extrudedHeight=f,this._arcType=p,this._polygonHierarchy=n,this._perPositionHeight=s,this._perPositionHeightExtrude=u,this._offsetAttribute=r.offsetAttribute,this._workerName="createPolygonOutlineGeometry",this.packedLength=y.PolygonGeometryLibrary.computeHierarchyPackedLength(n)+t.Ellipsoid.packedLength+8}T.pack=function(i,r,o){return o=e.defaultValue(o,0),o=y.PolygonGeometryLibrary.packPolygonHierarchy(i._polygonHierarchy,r,o),t.Ellipsoid.pack(i._ellipsoid,r,o),o+=t.Ellipsoid.packedLength,r[o++]=i._height,r[o++]=i._extrudedHeight,r[o++]=i._granularity,r[o++]=i._perPositionHeightExtrude?1:0,r[o++]=i._perPositionHeight?1:0,r[o++]=i._arcType,r[o++]=e.defaultValue(i._offsetAttribute,-1),r[o]=i.packedLength,r};var C=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),O={polygonHierarchy:{}};return T.unpack=function(i,r,o){r=e.defaultValue(r,0);var n=y.PolygonGeometryLibrary.unpackPolygonHierarchy(i,r);r=n.startingIndex,delete n.startingIndex;var a=t.Ellipsoid.unpack(i,r,C);r+=t.Ellipsoid.packedLength;var l=i[r++],s=i[r++],u=i[r++],p=1===i[r++],d=1===i[r++],f=i[r++],c=i[r++],g=i[r];return e.defined(o)||(o=new T(O)),o._polygonHierarchy=n,o._ellipsoid=t.Ellipsoid.clone(a,o._ellipsoid),o._height=l,o._extrudedHeight=s,o._granularity=u,o._perPositionHeight=d,o._perPositionHeightExtrude=p,o._arcType=f,o._offsetAttribute=-1===c?void 0:c,o.packedLength=g,o},T.fromPositions=function(t){return new T({polygonHierarchy:{positions:(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions},height:t.height,extrudedHeight:t.extrudedHeight,ellipsoid:t.ellipsoid,granularity:t.granularity,perPositionHeight:t.perPositionHeight,arcType:t.arcType,offsetAttribute:t.offsetAttribute})},T.createGeometry=function(i){var a=i._ellipsoid,s=i._granularity,d=i._polygonHierarchy,f=i._perPositionHeight,c=i._arcType,g=y.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(d,!f,a);if(0!==g.length){var h,m,b,P=[],v=o.CesiumMath.chordLength(s,a.maximumRadius),E=i._height,_=i._extrudedHeight;if(i._perPositionHeightExtrude||!o.CesiumMath.equalsEpsilon(E,_,0,o.CesiumMath.EPSILON2))for(b=0;b<g.length;b++){if((h=H(a,g[b],v,f,c)).geometry=y.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(h.geometry,E,_,a,f),e.defined(i._offsetAttribute)){var A=h.geometry.attributes.position.values.length/3,G=new Uint8Array(A);i._offsetAttribute===u.GeometryOffsetAttribute.TOP?G=r.arrayFill(G,1,0,A/2):(m=i._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,G=r.arrayFill(G,m)),h.geometry.attributes.applyOffset=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:G})}P.push(h)}else for(b=0;b<g.length;b++){if((h=L(a,g[b],v,f,c)).geometry.attributes.position.values=y.PolygonPipeline.scaleToGeodeticHeight(h.geometry.attributes.position.values,E,a,!f),e.defined(i._offsetAttribute)){var T=h.geometry.attributes.position.values.length,C=new Uint8Array(T/3);m=i._offsetAttribute===u.GeometryOffsetAttribute.NONE?0:1,r.arrayFill(C,m),h.geometry.attributes.applyOffset=new l.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:C})}P.push(h)}var O=p.GeometryPipeline.combineInstances(P)[0],D=t.BoundingSphere.fromVertices(O.attributes.position.values);return new l.Geometry({attributes:O.attributes,indices:O.indices,primitiveType:O.primitiveType,boundingSphere:D,offsetAttribute:i._offsetAttribute})}},function(i,r){return e.defined(r)&&(i=T.unpack(i,r)),i._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),T.createGeometry(i)}}));
