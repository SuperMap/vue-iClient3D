define(["./when-7d8885d2","./Cartesian2-54f49cd5","./buildModuleUrl-9403d69d","./Cartographic-9ee1f1bd","./ComponentDatatype-94b9147c","./Check-737bd4ec","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./IndexDatatype-cb5f74b7","./Math-4ffce144","./FeatureDetection-07e177c7","./VertexFormat-86386b6b","./WallGeometryLibrary-eb7cb3ca","./Event-1c0f5ff4","./RuntimeError-f53bcb51","./WebGLConstants-6b41cc89","./Cartesian4-6d2e270a","./arrayRemoveDuplicates-30a3675e","./PolylinePipeline-89be7253","./EllipsoidGeodesic-83f454fb","./EllipsoidRhumbLine-fd512dba","./IntersectionTests-6a0482c9","./Plane-74ce87e7"],(function(e,t,a,i,n,r,o,s,l,m,u,p,d,c,f,y,C,g,h,v,b,x,A){"use strict";var _=new i.Cartesian3,E=new i.Cartesian3,F=new i.Cartesian3,w=new i.Cartesian3,k=new i.Cartesian3,L=new i.Cartesian3,P=new i.Cartesian3,D=new i.Cartesian3;function G(a){var n=(a=e.defaultValue(a,e.defaultValue.EMPTY_OBJECT)).positions,r=a.maximumHeights,o=a.minimumHeights,s=e.defaultValue(a.vertexFormat,p.VertexFormat.DEFAULT),l=e.defaultValue(a.granularity,m.CesiumMath.RADIANS_PER_DEGREE),u=e.defaultValue(a.ellipsoid,t.Ellipsoid.WGS84);this._positions=n,this._minimumHeights=o,this._maximumHeights=r,this._vertexFormat=p.VertexFormat.clone(s),this._granularity=l,this._ellipsoid=t.Ellipsoid.clone(u),this._enuCenter=a.enuCenter,this._workerName="createWallGeometry";var d=1+n.length*i.Cartesian3.packedLength+2;e.defined(o)&&(d+=o.length),e.defined(r)&&(d+=r.length),this.packedLength=d+t.Ellipsoid.packedLength+p.VertexFormat.packedLength+1,this.packedLength+=i.Cartesian3.packedLength}G.pack=function(a,n,r){var o;r=e.defaultValue(r,0);var s=a._positions,l=s.length;for(n[r++]=l,o=0;o<l;++o,r+=i.Cartesian3.packedLength)i.Cartesian3.pack(s[o],n,r);var m=a._minimumHeights;if(l=e.defined(m)?m.length:0,n[r++]=l,e.defined(m))for(o=0;o<l;++o)n[r++]=m[o];var u=a._maximumHeights;if(l=e.defined(u)?u.length:0,n[r++]=l,e.defined(u))for(o=0;o<l;++o)n[r++]=u[o];return t.Ellipsoid.pack(a._ellipsoid,n,r),r+=t.Ellipsoid.packedLength,p.VertexFormat.pack(a._vertexFormat,n,r),r+=p.VertexFormat.packedLength,n[r++]=a._granularity,e.defined(a._enuCenter)?i.Cartesian3.pack(a._enuCenter,n,r):i.Cartesian3.pack(i.Cartesian3.ZERO,n,r),n};var H=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),T=new p.VertexFormat,V={positions:void 0,minimumHeights:void 0,maximumHeights:void 0,ellipsoid:H,vertexFormat:T,granularity:void 0,enuCenter:void 0};return G.unpack=function(a,n,r){var o;n=e.defaultValue(n,0);var s,l,m=a[n++],u=new Array(m);for(o=0;o<m;++o,n+=i.Cartesian3.packedLength)u[o]=i.Cartesian3.unpack(a,n);if((m=a[n++])>0)for(s=new Array(m),o=0;o<m;++o)s[o]=a[n++];if((m=a[n++])>0)for(l=new Array(m),o=0;o<m;++o)l[o]=a[n++];var d=t.Ellipsoid.unpack(a,n,H);n+=t.Ellipsoid.packedLength;var c=p.VertexFormat.unpack(a,n,T);n+=p.VertexFormat.packedLength;var f=a[n++],y=i.Cartesian3.unpack(a,n);return i.Cartesian3.equals(y,i.Cartesian3.ZERO)&&(y=void 0),e.defined(r)?(r._positions=u,r._minimumHeights=s,r._maximumHeights=l,r._ellipsoid=t.Ellipsoid.clone(d,r._ellipsoid),r._vertexFormat=p.VertexFormat.clone(c,r._vertexFormat),r._granularity=f,r._enuCenter=y,r):(V.positions=u,V.minimumHeights=s,V.maximumHeights=l,V.granularity=f,V.enuCenter=y,new G(V))},G.fromConstantHeights=function(t){var a,i,n=(t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT)).positions,r=t.minimumHeight,o=t.maximumHeight,s=e.defined(r),l=e.defined(o);if(s||l){var m=n.length;a=s?new Array(m):void 0,i=l?new Array(m):void 0;for(var u=0;u<m;++u)s&&(a[u]=r),l&&(i[u]=o)}return new G({positions:n,maximumHeights:i,minimumHeights:a,ellipsoid:t.ellipsoid,vertexFormat:t.vertexFormat})},G.createGeometry=function(t){var r=t._positions,p=t._minimumHeights,c=t._maximumHeights,f=t._vertexFormat,y=t._granularity,C=t._ellipsoid,g=t._enuCenter,h=d.WallGeometryLibrary.computePositions(C,r,c,p,y,!0,g);if(e.defined(h.pos)){var v;e.defined(g)&&(v=o.Transforms.eastNorthUpToFixedFrame(g));var b,x=h.pos.bottomPositions,A=h.pos.topPositions,G=h.pos.numCorners,H=A.length,T=2*H,V=f.position?new Float64Array(T):void 0,O=f.normal?new Float32Array(T):void 0,z=f.tangent?new Float32Array(T):void 0,R=f.bitangent?new Float32Array(T):void 0,S=f.st?new Float32Array(T/3*2):void 0,I=0,M=0,N=0,B=0,U=0,W=D,q=P,Z=L,J=!0,Y=0,j=1/((H/=3)-r.length+1);for(b=0;b<H;++b){var K=3*b,Q=i.Cartesian3.fromArray(A,K,_),X=i.Cartesian3.fromArray(x,K,E);if(f.position&&(V[I++]=X.x,V[I++]=X.y,V[I++]=X.z,V[I++]=Q.x,V[I++]=Q.y,V[I++]=Q.z),f.st&&(S[U++]=Y,S[U++]=0,S[U++]=Y,S[U++]=1),f.normal||f.tangent||f.bitangent){var $,ee=i.Cartesian3.clone(i.Cartesian3.ZERO,k),te=C.scaleToGeodeticSurface(i.Cartesian3.fromArray(A,K,E),E);if(b+1<H&&($=C.scaleToGeodeticSurface(i.Cartesian3.fromArray(A,K+3,F),F),ee=i.Cartesian3.fromArray(A,K+3,k)),J){var ae=i.Cartesian3.subtract(ee,Q,w),ie=i.Cartesian3.subtract(te,Q,_);W=i.Cartesian3.normalize(i.Cartesian3.cross(ie,ae,W),W),J=!1}i.Cartesian3.equalsEpsilon($,te,m.CesiumMath.EPSILON10)?J=!0:(Y+=j,f.tangent&&(q=i.Cartesian3.normalize(i.Cartesian3.subtract($,te,q),q)),f.bitangent&&(Z=i.Cartesian3.normalize(i.Cartesian3.cross(W,q,Z),Z))),f.normal&&(e.defined(g)&&(u.Matrix4.multiplyByPoint(v,W,W),i.Cartesian3.normalize(W,W)),O[M++]=W.x,O[M++]=W.y,O[M++]=W.z,O[M++]=W.x,O[M++]=W.y,O[M++]=W.z),f.tangent&&(z[B++]=q.x,z[B++]=q.y,z[B++]=q.z,z[B++]=q.x,z[B++]=q.y,z[B++]=q.z),f.bitangent&&(R[N++]=Z.x,R[N++]=Z.y,R[N++]=Z.z,R[N++]=Z.x,R[N++]=Z.y,R[N++]=Z.z)}}var ne=new s.GeometryAttributes;f.position&&(ne.position=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:V})),f.normal&&(ne.normal=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:O})),f.tangent&&(ne.tangent=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:z})),f.bitangent&&(ne.bitangent=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:R})),f.st&&(ne.st=new o.GeometryAttribute({componentDatatype:n.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:S}));var re=T/3;T-=6*(G+1);var oe=l.IndexDatatype.createTypedArray(re,T),se=0;for(b=0;b<re-2;b+=2){var le=b,me=b+2,ue=i.Cartesian3.fromArray(V,3*le,_),pe=i.Cartesian3.fromArray(V,3*me,E);if(!i.Cartesian3.equalsEpsilon(ue,pe,m.CesiumMath.EPSILON10)){var de=b+1,ce=b+3;oe[se++]=de,oe[se++]=le,oe[se++]=ce,oe[se++]=ce,oe[se++]=le,oe[se++]=me}}var fe=new o.Geometry({attributes:ne,indices:oe,primitiveType:u.PrimitiveType.TRIANGLES,boundingSphere:new a.BoundingSphere.fromVertices(V)});return e.defined(t._enuCenter)&&(fe.attributes.position.values.set(h.localPos.topPositions,0),fe.attributes.position.values.set(h.localPos.bottomPositions,fe.attributes.position.values.length/2),fe.attributes.position.componentDatatype=n.ComponentDatatype.FLOAT),fe}},function(a,i){return e.defined(i)&&(a=G.unpack(a,i)),a._ellipsoid=t.Ellipsoid.clone(a._ellipsoid),G.createGeometry(a)}}));