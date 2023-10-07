define(["exports","./arrayFill-0e93951b","./buildModuleUrl-9403d69d","./Cartographic-9ee1f1bd","./ComponentDatatype-94b9147c","./when-7d8885d2","./Check-737bd4ec","./EllipseGeometryLibrary-3fd0fdf0","./Cartesian2-54f49cd5","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./GeometryOffsetAttribute-fbeb6f1a","./IndexDatatype-cb5f74b7","./Math-4ffce144","./FeatureDetection-07e177c7"],(function(e,t,i,r,a,n,o,s,l,u,d,p,f,c,m){"use strict";var h=new r.Cartesian3,y=new r.Cartesian3;var b=new i.BoundingSphere,A=new i.BoundingSphere;function _(e){var t=(e=n.defaultValue(e,n.defaultValue.EMPTY_OBJECT)).center,i=n.defaultValue(e.ellipsoid,l.Ellipsoid.WGS84),a=e.semiMajorAxis,o=e.semiMinorAxis,s=n.defaultValue(e.granularity,c.CesiumMath.RADIANS_PER_DEGREE),u=n.defaultValue(e.height,0),d=n.defaultValue(e.extrudedHeight,u);this._center=r.Cartesian3.clone(t),this._semiMajorAxis=a,this._semiMinorAxis=o,this._ellipsoid=l.Ellipsoid.clone(i),this._rotation=n.defaultValue(e.rotation,0),this._height=Math.max(d,u),this._granularity=s,this._extrudedHeight=Math.min(d,u),this._numberOfVerticalLines=Math.max(n.defaultValue(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._outlineWidth=n.defaultValue(e.outlineWidth,1),this._workerName="createEllipseOutlineGeometry"}_.packedLength=r.Cartesian3.packedLength+l.Ellipsoid.packedLength+9,_.pack=function(e,t,i){return i=n.defaultValue(i,0),r.Cartesian3.pack(e._center,t,i),i+=r.Cartesian3.packedLength,l.Ellipsoid.pack(e._ellipsoid,t,i),i+=l.Ellipsoid.packedLength,t[i++]=e._semiMajorAxis,t[i++]=e._semiMinorAxis,t[i++]=e._rotation,t[i++]=e._height,t[i++]=e._granularity,t[i++]=e._extrudedHeight,t[i++]=e._numberOfVerticalLines,t[i++]=n.defaultValue(e._offsetAttribute,-1),t[i]=e._outlineWidth,t};var g=new r.Cartesian3,v=new l.Ellipsoid,E={center:g,ellipsoid:v,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0,outlineWidth:void 0};_.unpack=function(e,t,i){t=n.defaultValue(t,0);var a=r.Cartesian3.unpack(e,t,g);t+=r.Cartesian3.packedLength;var o=l.Ellipsoid.unpack(e,t,v);t+=l.Ellipsoid.packedLength;var s=e[t++],u=e[t++],d=e[t++],p=e[t++],f=e[t++],c=e[t++],m=e[t++],h=e[t++],y=e[t];return n.defined(i)?(i._center=r.Cartesian3.clone(a,i._center),i._ellipsoid=l.Ellipsoid.clone(o,i._ellipsoid),i._semiMajorAxis=s,i._semiMinorAxis=u,i._rotation=d,i._height=p,i._granularity=f,i._extrudedHeight=c,i._numberOfVerticalLines=m,i._offsetAttribute=-1===h?void 0:h,i._outlineWidth=y,i):(E.height=p,E.extrudedHeight=c,E.granularity=f,E.rotation=d,E.semiMajorAxis=s,E.semiMinorAxis=u,E.numberOfVerticalLines=m,E.offsetAttribute=-1===h?void 0:h,E.outlineWidth=y,new _(E))},_.createGeometry=function(e){if(!(e._semiMajorAxis<=0||e._semiMinorAxis<=0)){var o=e._height,l=e._extrudedHeight,_=!c.CesiumMath.equalsEpsilon(o,l,0,c.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);var g,v={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:o,granularity:e._granularity,outlineWidth:e._outlineWidth,numberOfVerticalLines:e._numberOfVerticalLines};if(_)v.extrudedHeight=l,v.offsetAttribute=e._offsetAttribute,g=function(e){var o=e.center,l=e.ellipsoid,m=e.semiMajorAxis,y=r.Cartesian3.multiplyByScalar(l.geodeticSurfaceNormal(o,h),e.height,h);b.center=r.Cartesian3.add(o,y,b.center),b.radius=m,y=r.Cartesian3.multiplyByScalar(l.geodeticSurfaceNormal(o,y),e.extrudedHeight,y),A.center=r.Cartesian3.add(o,y,A.center),A.radius=m;var _=s.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,g=new d.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s.EllipseGeometryLibrary.raisePositionsToHeight(_,e,!0)})});_=g.position.values;var v=i.BoundingSphere.union(b,A),E=_.length/3;if(n.defined(e.offsetAttribute)){var x=new Uint8Array(E);if(e.offsetAttribute===p.GeometryOffsetAttribute.TOP)x=t.arrayFill(x,1,0,E/2);else{var M=e.offsetAttribute===p.GeometryOffsetAttribute.NONE?0:1;x=t.arrayFill(x,M)}g.applyOffset=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:x})}var C=n.defaultValue(e.numberOfVerticalLines,16);C=c.CesiumMath.clamp(C,0,E/2);var G=f.IndexDatatype.createTypedArray(E,2*E+2*C);E/=2;var L,O,V=0;for(L=0;L<E;++L)G[V++]=L,G[V++]=(L+1)%E,G[V++]=L+E,G[V++]=(L+1)%E+E;if(C>0){var S=Math.min(C,E);O=Math.round(E/S);var w=Math.min(O*C,E);for(L=0;L<w;L+=O)G[V++]=L,G[V++]=L+E}return{boundingSphere:v,attributes:g,indices:G}}(v);else if(g=function(e){var t=e.center;y=r.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,y),e.height,y),y=r.Cartesian3.add(t,y,y);var o=new i.BoundingSphere(y,e.semiMajorAxis),l=s.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,p=n.defaultValue(e.outlineWidth,1);p>1&&l.push(l[0],l[1],l[2]);var c=new d.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:s.EllipseGeometryLibrary.raisePositionsToHeight(l,e,!1)})});p>1&&(c.sideness=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:new Float32Array([0,0,0,1,1,1,1,0])}),c.sideness.isInstanceAttribute=!0);for(var m=l.length/3,h=f.IndexDatatype.createTypedArray(m,2*m),b=0,A=0;A<m;++A)h[b++]=A,h[b++]=(A+1)%m;return{boundingSphere:o,attributes:c,indices:h}}(v),n.defined(e._offsetAttribute)){var E=g.attributes.position.values.length,x=new Uint8Array(E/3),M=e._offsetAttribute===p.GeometryOffsetAttribute.NONE?0:1;t.arrayFill(x,M),g.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:x})}return new u.Geometry({attributes:g.attributes,indices:g.indices,primitiveType:e._outlineWidth>1?m.PrimitiveType.TRIANGLES:m.PrimitiveType.LINES,boundingSphere:g.boundingSphere,offsetAttribute:e._offsetAttribute})}},e.EllipseOutlineGeometry=_}));
