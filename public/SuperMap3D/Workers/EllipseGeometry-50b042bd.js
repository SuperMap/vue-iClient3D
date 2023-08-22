define(["exports","./arrayFill-0e93951b","./buildModuleUrl-9403d69d","./Cartesian2-54f49cd5","./Cartographic-9ee1f1bd","./Check-737bd4ec","./ComponentDatatype-94b9147c","./when-7d8885d2","./EllipseGeometryLibrary-3fd0fdf0","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./GeometryInstance-66495308","./GeometryOffsetAttribute-fbeb6f1a","./GeometryPipeline-78c783ae","./IndexDatatype-cb5f74b7","./Math-4ffce144","./FeatureDetection-07e177c7","./VertexFormat-86386b6b"],(function(e,t,r,a,i,n,o,s,l,u,m,p,y,c,d,f,A,h){"use strict";var x=new i.Cartesian3,g=new i.Cartesian3,b=new i.Cartesian3,_=new i.Cartesian3,v=new a.Cartesian2,C=new A.Matrix3,w=new A.Matrix3,M=new u.Quaternion,E=new i.Cartesian3,I=new i.Cartesian3,T=new i.Cartesian3,G=new i.Cartographic,N=new i.Cartesian3,F=new a.Cartesian2,P=new a.Cartesian2;function V(e,n,p){var c=n.vertexFormat,d=n.center,f=n.semiMajorAxis,h=n.semiMinorAxis,_=n.ellipsoid,V=n.stRotation,D=p?e.length/3*2:e.length/3,O=n.shadowVolume,S=c.st?new Float32Array(2*D):void 0,L=c.normal?new Float32Array(3*D):void 0,R=c.tangent?new Float32Array(3*D):void 0,j=c.bitangent?new Float32Array(3*D):void 0,k=O?new Float32Array(3*D):void 0,z=0,B=E,Y=I,H=T,U=new r.GeographicProjection(_),Q=U.project(_.cartesianToCartographic(d,G),N),W=_.scaleToGeodeticSurface(d,x);_.geodeticSurfaceNormal(W,W);var J=C,q=w;if(0!==V){var Z=u.Quaternion.fromAxisAngle(W,V,M);J=A.Matrix3.fromQuaternion(Z,J),Z=u.Quaternion.fromAxisAngle(W,-V,M),q=A.Matrix3.fromQuaternion(Z,q)}else J=A.Matrix3.clone(A.Matrix3.IDENTITY,J),q=A.Matrix3.clone(A.Matrix3.IDENTITY,q);for(var K=a.Cartesian2.fromElements(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,F),X=a.Cartesian2.fromElements(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,P),$=e.length,ee=p?$:0,te=ee/3*2,re=0;re<$;re+=3){var ae=re+1,ie=re+2,ne=i.Cartesian3.fromArray(e,re,x);if(c.st){var oe=A.Matrix3.multiplyByVector(J,ne,g),se=U.project(_.cartesianToCartographic(oe,G),b);i.Cartesian3.subtract(se,Q,se),v.x=(se.x+f)/(2*f),v.y=(se.y+h)/(2*h),K.x=Math.min(v.x,K.x),K.y=Math.min(v.y,K.y),X.x=Math.max(v.x,X.x),X.y=Math.max(v.y,X.y),p&&(S[z+te]=v.x,S[z+1+te]=v.y),S[z++]=v.x,S[z++]=v.y}(c.normal||c.tangent||c.bitangent||O)&&(B=_.geodeticSurfaceNormal(ne,B),O&&(k[re+ee]=-B.x,k[ae+ee]=-B.y,k[ie+ee]=-B.z),(c.normal||c.tangent||c.bitangent)&&((c.tangent||c.bitangent)&&(Y=i.Cartesian3.normalize(i.Cartesian3.cross(i.Cartesian3.UNIT_Z,B,Y),Y),A.Matrix3.multiplyByVector(q,Y,Y)),c.normal&&(L[re]=B.x,L[ae]=B.y,L[ie]=B.z,p&&(L[re+ee]=-B.x,L[ae+ee]=-B.y,L[ie+ee]=-B.z)),c.tangent&&(R[re]=Y.x,R[ae]=Y.y,R[ie]=Y.z,p&&(R[re+ee]=-Y.x,R[ae+ee]=-Y.y,R[ie+ee]=-Y.z)),c.bitangent&&(H=i.Cartesian3.normalize(i.Cartesian3.cross(B,Y,H),H),j[re]=H.x,j[ae]=H.y,j[ie]=H.z,p&&(j[re+ee]=H.x,j[ae+ee]=H.y,j[ie+ee]=H.z))))}if(c.st){$=S.length;for(var le=0;le<$;le+=2)S[le]=(S[le]-K.x)/(X.x-K.x),S[le+1]=(S[le+1]-K.y)/(X.y-K.y)}var ue=new m.GeometryAttributes;if(c.position){var me=l.EllipseGeometryLibrary.raisePositionsToHeight(e,n,p);ue.position=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:me})}if(c.st&&(ue.st=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:S})),c.normal&&(ue.normal=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:L})),c.tangent&&(ue.tangent=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:R})),c.bitangent&&(ue.bitangent=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:j})),O&&(ue.extrudeDirection=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:k})),p&&s.defined(n.offsetAttribute)){var pe=new Uint8Array(D);if(n.offsetAttribute===y.GeometryOffsetAttribute.TOP)pe=t.arrayFill(pe,1,0,D/2);else{var ye=n.offsetAttribute===y.GeometryOffsetAttribute.NONE?0:1;pe=t.arrayFill(pe,ye)}ue.applyOffset=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:pe})}return ue}function D(e){var t,r,a,i,n,o=new Array(e*(e+1)*12-6),s=0;for(t=0,a=1,i=0;i<3;i++)o[s++]=a++,o[s++]=t,o[s++]=a;for(i=2;i<e+1;++i){for(a=i*(i+1)-1,t=(i-1)*i-1,o[s++]=a++,o[s++]=t,o[s++]=a,r=2*i,n=0;n<r-1;++n)o[s++]=a,o[s++]=t++,o[s++]=t,o[s++]=a++,o[s++]=t,o[s++]=a;o[s++]=a++,o[s++]=t,o[s++]=a}for(r=2*e,++a,++t,i=0;i<r-1;++i)o[s++]=a,o[s++]=t++,o[s++]=t,o[s++]=a++,o[s++]=t,o[s++]=a;for(o[s++]=a,o[s++]=t++,o[s++]=t,o[s++]=a++,o[s++]=t++,o[s++]=t,++t,i=e-1;i>1;--i){for(o[s++]=t++,o[s++]=t,o[s++]=a,r=2*i,n=0;n<r-1;++n)o[s++]=a,o[s++]=t++,o[s++]=t,o[s++]=a++,o[s++]=t,o[s++]=a;o[s++]=t++,o[s++]=t++,o[s++]=a++}for(i=0;i<3;i++)o[s++]=t++,o[s++]=t,o[s++]=a;return o}var O=new i.Cartesian3;var S=new r.BoundingSphere,L=new r.BoundingSphere;function R(e){var n=e.center,f=e.ellipsoid,h=e.semiMajorAxis,w=i.Cartesian3.multiplyByScalar(f.geodeticSurfaceNormal(n,x),e.height,x);S.center=i.Cartesian3.add(n,w,S.center),S.radius=h,w=i.Cartesian3.multiplyByScalar(f.geodeticSurfaceNormal(n,w),e.extrudedHeight,w),L.center=i.Cartesian3.add(n,w,L.center),L.radius=h;var O=l.EllipseGeometryLibrary.computeEllipsePositions(e,!0,!0),R=O.positions,j=O.numPts,k=O.outerPositions,z=r.BoundingSphere.union(S,L),B=V(R,e,!0),Y=D(j),H=Y.length;Y.length=2*H;for(var U=R.length/3,Q=0;Q<H;Q+=3)Y[Q+H]=Y[Q+2]+U,Y[Q+1+H]=Y[Q+1]+U,Y[Q+2+H]=Y[Q]+U;var W=d.IndexDatatype.createTypedArray(2*U/3,Y),J=new u.Geometry({attributes:B,indices:W,primitiveType:A.PrimitiveType.TRIANGLES}),q=function(e,n){var l=n.vertexFormat,p=n.center,c=n.semiMajorAxis,d=n.semiMinorAxis,f=n.ellipsoid,h=n.height,w=n.extrudedHeight,V=n.stRotation,D=e.length/3*2,O=new Float64Array(3*D),S=l.st?new Float32Array(2*D):void 0,L=l.normal?new Float32Array(3*D):void 0,R=l.tangent?new Float32Array(3*D):void 0,j=l.bitangent?new Float32Array(3*D):void 0,k=n.shadowVolume,z=k?new Float32Array(3*D):void 0,B=0,Y=E,H=I,U=T,Q=new r.GeographicProjection(f),W=Q.project(f.cartesianToCartographic(p,G),N),J=f.scaleToGeodeticSurface(p,x);f.geodeticSurfaceNormal(J,J);for(var q=u.Quaternion.fromAxisAngle(J,V,M),Z=A.Matrix3.fromQuaternion(q,C),K=a.Cartesian2.fromElements(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,F),X=a.Cartesian2.fromElements(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,P),$=e.length,ee=$/3*2,te=0;te<$;te+=3){var re,ae=te+1,ie=te+2,ne=i.Cartesian3.fromArray(e,te,x);if(l.st){var oe=A.Matrix3.multiplyByVector(Z,ne,g),se=Q.project(f.cartesianToCartographic(oe,G),b);i.Cartesian3.subtract(se,W,se),v.x=(se.x+c)/(2*c),v.y=(se.y+d)/(2*d),K.x=Math.min(v.x,K.x),K.y=Math.min(v.y,K.y),X.x=Math.max(v.x,X.x),X.y=Math.max(v.y,X.y),S[B+ee]=v.x,S[B+1+ee]=v.y,S[B++]=v.x,S[B++]=v.y}ne=f.scaleToGeodeticSurface(ne,ne),re=i.Cartesian3.clone(ne,g),Y=f.geodeticSurfaceNormal(ne,Y),k&&(z[te+$]=-Y.x,z[ae+$]=-Y.y,z[ie+$]=-Y.z);var le=i.Cartesian3.multiplyByScalar(Y,h,_);if(ne=i.Cartesian3.add(ne,le,ne),le=i.Cartesian3.multiplyByScalar(Y,w,le),re=i.Cartesian3.add(re,le,re),l.position&&(O[te+$]=re.x,O[ae+$]=re.y,O[ie+$]=re.z,O[te]=ne.x,O[ae]=ne.y,O[ie]=ne.z),l.normal||l.tangent||l.bitangent){U=i.Cartesian3.clone(Y,U);var ue=i.Cartesian3.fromArray(e,(te+3)%$,_);i.Cartesian3.subtract(ue,ne,ue);var me=i.Cartesian3.subtract(re,ne,b);Y=i.Cartesian3.normalize(i.Cartesian3.cross(me,ue,Y),Y),l.normal&&(L[te]=Y.x,L[ae]=Y.y,L[ie]=Y.z,L[te+$]=Y.x,L[ae+$]=Y.y,L[ie+$]=Y.z),l.tangent&&(H=i.Cartesian3.normalize(i.Cartesian3.cross(U,Y,H),H),R[te]=H.x,R[ae]=H.y,R[ie]=H.z,R[te+$]=H.x,R[te+1+$]=H.y,R[te+2+$]=H.z),l.bitangent&&(j[te]=U.x,j[ae]=U.y,j[ie]=U.z,j[te+$]=U.x,j[ae+$]=U.y,j[ie+$]=U.z)}}if(l.st){$=S.length;for(var pe=0;pe<$;pe+=2)S[pe]=(S[pe]-K.x)/(X.x-K.x),S[pe+1]=(S[pe+1]-K.y)/(X.y-K.y)}var ye=new m.GeometryAttributes;if(l.position&&(ye.position=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:O})),l.st&&(ye.st=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:S})),l.normal&&(ye.normal=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:L})),l.tangent&&(ye.tangent=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:R})),l.bitangent&&(ye.bitangent=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:j})),k&&(ye.extrudeDirection=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:z})),s.defined(n.offsetAttribute)){var ce=new Uint8Array(D);if(n.offsetAttribute===y.GeometryOffsetAttribute.TOP)ce=t.arrayFill(ce,1,0,D/2);else{var de=n.offsetAttribute===y.GeometryOffsetAttribute.NONE?0:1;ce=t.arrayFill(ce,de)}ye.applyOffset=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:ce})}return ye}(k,e);Y=function(e){for(var t=e.length/3,r=d.IndexDatatype.createTypedArray(t,6*t),a=0,i=0;i<t;i++){var n=i,o=i+t,s=(n+1)%t,l=s+t;r[a++]=n,r[a++]=o,r[a++]=s,r[a++]=s,r[a++]=o,r[a++]=l}return r}(k);var Z=d.IndexDatatype.createTypedArray(2*k.length/3,Y),K=new u.Geometry({attributes:q,indices:Z,primitiveType:A.PrimitiveType.TRIANGLES}),X=c.GeometryPipeline.combineInstances([new p.GeometryInstance({geometry:J}),new p.GeometryInstance({geometry:K})]);return{boundingSphere:z,attributes:X[0].attributes,indices:X[0].indices}}function j(e,t,r,n,o,s,u){for(var m=l.EllipseGeometryLibrary.computeEllipsePositions({center:e,semiMajorAxis:t,semiMinorAxis:r,rotation:n,granularity:o},!1,!0).outerPositions,p=m.length/3,y=new Array(p),c=0;c<p;++c)y[c]=i.Cartesian3.fromArray(m,3*c);var d=a.Rectangle.fromCartesianArray(y,s,u);return d.width>f.CesiumMath.PI&&(d.north=d.north>0?f.CesiumMath.PI_OVER_TWO-f.CesiumMath.EPSILON7:d.north,d.south=d.south<0?f.CesiumMath.EPSILON7-f.CesiumMath.PI_OVER_TWO:d.south,d.east=f.CesiumMath.PI,d.west=-f.CesiumMath.PI),d}function k(e){var t=(e=s.defaultValue(e,s.defaultValue.EMPTY_OBJECT)).center,r=s.defaultValue(e.ellipsoid,a.Ellipsoid.WGS84),n=e.semiMajorAxis,o=e.semiMinorAxis,l=s.defaultValue(e.granularity,f.CesiumMath.RADIANS_PER_DEGREE),u=s.defaultValue(e.vertexFormat,h.VertexFormat.DEFAULT),m=s.defaultValue(e.height,0),p=s.defaultValue(e.extrudedHeight,m);this._center=i.Cartesian3.clone(t),this._semiMajorAxis=n,this._semiMinorAxis=o,this._ellipsoid=a.Ellipsoid.clone(r),this._rotation=s.defaultValue(e.rotation,0),this._stRotation=s.defaultValue(e.stRotation,0),this._height=Math.max(p,m),this._granularity=l,this._vertexFormat=h.VertexFormat.clone(u),this._extrudedHeight=Math.min(p,m),this._shadowVolume=s.defaultValue(e.shadowVolume,!1),this._workerName="createEllipseGeometry",this._offsetAttribute=e.offsetAttribute,this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0}k.packedLength=i.Cartesian3.packedLength+a.Ellipsoid.packedLength+h.VertexFormat.packedLength+9,k.pack=function(e,t,r){return r=s.defaultValue(r,0),i.Cartesian3.pack(e._center,t,r),r+=i.Cartesian3.packedLength,a.Ellipsoid.pack(e._ellipsoid,t,r),r+=a.Ellipsoid.packedLength,h.VertexFormat.pack(e._vertexFormat,t,r),r+=h.VertexFormat.packedLength,t[r++]=e._semiMajorAxis,t[r++]=e._semiMinorAxis,t[r++]=e._rotation,t[r++]=e._stRotation,t[r++]=e._height,t[r++]=e._granularity,t[r++]=e._extrudedHeight,t[r++]=e._shadowVolume?1:0,t[r]=s.defaultValue(e._offsetAttribute,-1),t};var z=new i.Cartesian3,B=new a.Ellipsoid,Y=new h.VertexFormat,H={center:z,ellipsoid:B,vertexFormat:Y,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,stRotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,shadowVolume:void 0,offsetAttribute:void 0};k.unpack=function(e,t,r){t=s.defaultValue(t,0);var n=i.Cartesian3.unpack(e,t,z);t+=i.Cartesian3.packedLength;var o=a.Ellipsoid.unpack(e,t,B);t+=a.Ellipsoid.packedLength;var l=h.VertexFormat.unpack(e,t,Y);t+=h.VertexFormat.packedLength;var u=e[t++],m=e[t++],p=e[t++],y=e[t++],c=e[t++],d=e[t++],f=e[t++],A=1===e[t++],x=e[t];return s.defined(r)?(r._center=i.Cartesian3.clone(n,r._center),r._ellipsoid=a.Ellipsoid.clone(o,r._ellipsoid),r._vertexFormat=h.VertexFormat.clone(l,r._vertexFormat),r._semiMajorAxis=u,r._semiMinorAxis=m,r._rotation=p,r._stRotation=y,r._height=c,r._granularity=d,r._extrudedHeight=f,r._shadowVolume=A,r._offsetAttribute=-1===x?void 0:x,r):(H.height=c,H.extrudedHeight=f,H.granularity=d,H.stRotation=y,H.rotation=p,H.semiMajorAxis=u,H.semiMinorAxis=m,H.shadowVolume=A,H.offsetAttribute=-1===x?void 0:x,new k(H))},k.computeRectangle=function(e,t){var r=(e=s.defaultValue(e,s.defaultValue.EMPTY_OBJECT)).center,i=s.defaultValue(e.ellipsoid,a.Ellipsoid.WGS84),n=e.semiMajorAxis,o=e.semiMinorAxis,l=s.defaultValue(e.granularity,f.CesiumMath.RADIANS_PER_DEGREE);return j(r,n,o,s.defaultValue(e.rotation,0),l,i,t)},k.createGeometry=function(e){if(!(e._semiMajorAxis<=0||e._semiMinorAxis<=0)){var a=e._height,n=e._extrudedHeight,m=!f.CesiumMath.equalsEpsilon(a,n,0,f.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);var p,c={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:a,granularity:e._granularity,vertexFormat:e._vertexFormat,stRotation:e._stRotation};if(m)c.extrudedHeight=n,c.shadowVolume=e._shadowVolume,c.offsetAttribute=e._offsetAttribute,p=R(c);else if(p=function(e){var t=e.center;O=i.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,O),e.height,O),O=i.Cartesian3.add(t,O,O);var a=new r.BoundingSphere(O,e.semiMajorAxis),n=l.EllipseGeometryLibrary.computeEllipsePositions(e,!0,!1),o=n.positions,s=n.numPts,u=V(o,e,!1),m=D(s);return{boundingSphere:a,attributes:u,indices:m=d.IndexDatatype.createTypedArray(o.length/3,m)}}(c),s.defined(e._offsetAttribute)){var h=p.attributes.position.values.length,x=new Uint8Array(h/3),g=e._offsetAttribute===y.GeometryOffsetAttribute.NONE?0:1;t.arrayFill(x,g),p.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:x})}return new u.Geometry({attributes:p.attributes,indices:p.indices,primitiveType:A.PrimitiveType.TRIANGLES,boundingSphere:p.boundingSphere,offsetAttribute:e._offsetAttribute})}},k.createShadowVolume=function(e,t,r){var a=e._granularity,i=e._ellipsoid,n=t(a,i),o=r(a,i);return new k({center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:i,rotation:e._rotation,stRotation:e._stRotation,granularity:a,extrudedHeight:n,height:o,vertexFormat:h.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(k.prototype,{rectangle:{get:function(){return s.defined(this._rectangle)||(this._rectangle=j(this._center,this._semiMajorAxis,this._semiMinorAxis,this._rotation,this._granularity,this._ellipsoid)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return s.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(e){var t=-e._stRotation;if(0===t)return[0,0,0,1,1,0];for(var r=l.EllipseGeometryLibrary.computeEllipsePositions({center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,rotation:e._rotation,granularity:e._granularity},!1,!0).outerPositions,a=r.length/3,n=new Array(a),o=0;o<a;++o)n[o]=i.Cartesian3.fromArray(r,3*o);var s=e._ellipsoid,m=e.rectangle;return u.Geometry._textureCoordinateRotationPoints(n,t,s,m)}(this)),this._textureCoordinateRotationPoints}}}),e.EllipseGeometry=k}));
