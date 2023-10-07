define(["./arrayFill-0e93951b","./arrayRemoveDuplicates-30a3675e","./buildModuleUrl-9403d69d","./Cartographic-9ee1f1bd","./Check-737bd4ec","./ComponentDatatype-94b9147c","./PolylineVolumeGeometryLibrary-28009add","./CorridorGeometryLibrary-6de58cc3","./when-7d8885d2","./Cartesian2-54f49cd5","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./GeometryOffsetAttribute-fbeb6f1a","./IndexDatatype-cb5f74b7","./Math-4ffce144","./PolygonPipeline-68e6c052","./FeatureDetection-07e177c7","./Event-1c0f5ff4","./RuntimeError-f53bcb51","./WebGLConstants-6b41cc89","./Cartesian4-6d2e270a","./EllipsoidTangentPlane-adf29704","./IntersectionTests-6a0482c9","./Plane-74ce87e7","./PolylinePipeline-89be7253","./EllipsoidGeodesic-83f454fb","./EllipsoidRhumbLine-fd512dba"],(function(e,t,i,r,o,a,n,s,l,d,u,p,f,h,y,c,g,b,v,m,A,_,E,C,G,P,T){"use strict";var w=new r.Cartesian3,L=new r.Cartesian3,D=new r.Cartesian3;function k(e,t){var i,o,d,f=[],y=e.positions,c=e.corners,g=e.endPositions,b=new p.GeometryAttributes,v=0,m=0,A=0;for(o=0;o<y.length;o+=2)v+=d=y[o].length-3,A+=d/3*4,m+=y[o+1].length-3;for(v+=3,m+=3,o=0;o<c.length;o++){i=c[o];var _=c[o].leftPositions;l.defined(_)?(v+=d=_.length,A+=d/3*2):(m+=d=c[o].rightPositions.length,A+=d/3*2)}var E,C=l.defined(g);C&&(v+=E=g[0].length-3,m+=E,A+=4*(E/=3));var G,P,T,k,N,O,V=v+m,x=new Float64Array(V),H=0,I=V-1,M=E/2,S=h.IndexDatatype.createTypedArray(V/3,A+4),R=0;if(S[R++]=H/3,S[R++]=(I-2)/3,C){f.push(H/3),O=w,N=L;var F=g[0];for(o=0;o<M;o++)O=r.Cartesian3.fromArray(F,3*(M-1-o),O),N=r.Cartesian3.fromArray(F,3*(M+o),N),s.CorridorGeometryLibrary.addAttribute(x,N,H),s.CorridorGeometryLibrary.addAttribute(x,O,void 0,I),k=(P=H/3)+1,T=(G=(I-2)/3)-1,S[R++]=G,S[R++]=T,S[R++]=P,S[R++]=k,H+=3,I-=3}var U=0,B=y[U++],Y=y[U++];for(x.set(B,H),x.set(Y,I-Y.length+1),d=Y.length-3,f.push(H/3,(I-2)/3),o=0;o<d;o+=3)k=(P=H/3)+1,T=(G=(I-2)/3)-1,S[R++]=G,S[R++]=T,S[R++]=P,S[R++]=k,H+=3,I-=3;for(o=0;o<c.length;o++){var q,W,J=(i=c[o]).leftPositions,j=i.rightPositions,z=D;if(l.defined(J)){for(I-=3,W=T,f.push(k),q=0;q<J.length/3;q++)z=r.Cartesian3.fromArray(J,3*q,z),S[R++]=W-q-1,S[R++]=W-q,s.CorridorGeometryLibrary.addAttribute(x,z,void 0,I),I-=3;f.push(W-Math.floor(J.length/6)),t===n.CornerType.BEVELED&&f.push((I-2)/3+1),H+=3}else{for(H+=3,W=k,f.push(T),q=0;q<j.length/3;q++)z=r.Cartesian3.fromArray(j,3*q,z),S[R++]=W+q,S[R++]=W+q+1,s.CorridorGeometryLibrary.addAttribute(x,z,H),H+=3;f.push(W+Math.floor(j.length/6)),t===n.CornerType.BEVELED&&f.push(H/3-1),I-=3}for(B=y[U++],Y=y[U++],B.splice(0,3),Y.splice(Y.length-3,3),x.set(B,H),x.set(Y,I-Y.length+1),d=Y.length-3,q=0;q<Y.length;q+=3)P=(k=H/3)-1,G=(T=(I-2)/3)+1,S[R++]=G,S[R++]=T,S[R++]=P,S[R++]=k,H+=3,I-=3;H-=3,I+=3,f.push(H/3,(I-2)/3)}if(C){H+=3,I-=3,O=w,N=L;var K=g[1];for(o=0;o<M;o++)O=r.Cartesian3.fromArray(K,3*(E-o-1),O),N=r.Cartesian3.fromArray(K,3*o,N),s.CorridorGeometryLibrary.addAttribute(x,O,void 0,I),s.CorridorGeometryLibrary.addAttribute(x,N,H),P=(k=H/3)-1,G=(T=(I-2)/3)+1,S[R++]=G,S[R++]=T,S[R++]=P,S[R++]=k,H+=3,I-=3;f.push(H/3)}else f.push(H/3,(I-2)/3);return S[R++]=H/3,S[R++]=(I-2)/3,b.position=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:x}),{attributes:b,indices:S,wallIndices:f}}function N(e){var t=(e=l.defaultValue(e,l.defaultValue.EMPTY_OBJECT)).positions,i=e.width,o=l.defaultValue(e.height,0),a=l.defaultValue(e.extrudedHeight,o);this._positions=t,this._ellipsoid=d.Ellipsoid.clone(l.defaultValue(e.ellipsoid,d.Ellipsoid.WGS84)),this._width=i,this._height=Math.max(o,a),this._extrudedHeight=Math.min(o,a),this._cornerType=l.defaultValue(e.cornerType,n.CornerType.ROUNDED),this._granularity=l.defaultValue(e.granularity,y.CesiumMath.RADIANS_PER_DEGREE),this._offsetAttribute=e.offsetAttribute,this._workerName="createCorridorOutlineGeometry",this.packedLength=1+t.length*r.Cartesian3.packedLength+d.Ellipsoid.packedLength+6}N.pack=function(e,t,i){i=l.defaultValue(i,0);var o=e._positions,a=o.length;t[i++]=a;for(var n=0;n<a;++n,i+=r.Cartesian3.packedLength)r.Cartesian3.pack(o[n],t,i);return d.Ellipsoid.pack(e._ellipsoid,t,i),i+=d.Ellipsoid.packedLength,t[i++]=e._width,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._cornerType,t[i++]=e._granularity,t[i]=l.defaultValue(e._offsetAttribute,-1),t};var O=d.Ellipsoid.clone(d.Ellipsoid.UNIT_SPHERE),V={positions:void 0,ellipsoid:O,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,offsetAttribute:void 0};return N.unpack=function(e,t,i){t=l.defaultValue(t,0);for(var o=e[t++],a=new Array(o),n=0;n<o;++n,t+=r.Cartesian3.packedLength)a[n]=r.Cartesian3.unpack(e,t);var s=d.Ellipsoid.unpack(e,t,O);t+=d.Ellipsoid.packedLength;var u=e[t++],p=e[t++],f=e[t++],h=e[t++],y=e[t++],c=e[t];return l.defined(i)?(i._positions=a,i._ellipsoid=d.Ellipsoid.clone(s,i._ellipsoid),i._width=u,i._height=p,i._extrudedHeight=f,i._cornerType=h,i._granularity=y,i._offsetAttribute=-1===c?void 0:c,i):(V.positions=a,V.width=u,V.height=p,V.extrudedHeight=f,V.cornerType=h,V.granularity=y,V.offsetAttribute=-1===c?void 0:c,new N(V))},N.createGeometry=function(o){var n=o._positions,d=o._width,p=o._ellipsoid;n=function(e,t){for(var i=0;i<e.length;i++)e[i]=t.scaleToGeodeticSurface(e[i],e[i]);return e}(n,p);var b=t.arrayRemoveDuplicates(n,r.Cartesian3.equalsEpsilon);if(!(b.length<2||d<=0)){var v,m=o._height,A=o._extrudedHeight,_=!y.CesiumMath.equalsEpsilon(m,A,0,y.CesiumMath.EPSILON2),E={ellipsoid:p,positions:b,width:d,cornerType:o._cornerType,granularity:o._granularity,saveAttributes:!1};if(_)E.height=m,E.extrudedHeight=A,E.offsetAttribute=o._offsetAttribute,v=function(t){var i=t.ellipsoid,r=k(s.CorridorGeometryLibrary.computePositions(t),t.cornerType),o=r.wallIndices,n=t.height,d=t.extrudedHeight,p=r.attributes,y=r.indices,g=p.position.values,b=g.length,v=new Float64Array(b);v.set(g);var m,A=new Float64Array(2*b);if(g=c.PolygonPipeline.scaleToGeodeticHeight(g,n,i),v=c.PolygonPipeline.scaleToGeodeticHeight(v,d,i),A.set(g),A.set(v,b),p.position.values=A,b/=3,l.defined(t.offsetAttribute)){var _=new Uint8Array(2*b);if(t.offsetAttribute===f.GeometryOffsetAttribute.TOP)_=e.arrayFill(_,1,0,b);else{var E=t.offsetAttribute===f.GeometryOffsetAttribute.NONE?0:1;_=e.arrayFill(_,E)}p.applyOffset=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:_})}var C=y.length,G=h.IndexDatatype.createTypedArray(A.length/3,2*(C+o.length));G.set(y);var P,T,w=C;for(m=0;m<C;m+=2){var L=y[m],D=y[m+1];G[w++]=L+b,G[w++]=D+b}for(m=0;m<o.length;m++)T=(P=o[m])+b,G[w++]=P,G[w++]=T;return{attributes:p,indices:G}}(E);else if((v=k(s.CorridorGeometryLibrary.computePositions(E),E.cornerType)).attributes.position.values=c.PolygonPipeline.scaleToGeodeticHeight(v.attributes.position.values,m,p),l.defined(o._offsetAttribute)){var C=v.attributes.position.values.length,G=new Uint8Array(C/3),P=o._offsetAttribute===f.GeometryOffsetAttribute.NONE?0:1;e.arrayFill(G,P),v.attributes.applyOffset=new u.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:G})}var T=v.attributes,w=i.BoundingSphere.fromVertices(T.position.values,void 0,3);return new u.Geometry({attributes:T,indices:v.indices,primitiveType:g.PrimitiveType.LINES,boundingSphere:w,offsetAttribute:o._offsetAttribute})}},function(e,t){return l.defined(t)&&(e=N.unpack(e,t)),e._ellipsoid=d.Ellipsoid.clone(e._ellipsoid),N.createGeometry(e)}}));