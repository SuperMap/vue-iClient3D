define(["exports","./arrayFill-0e93951b","./buildModuleUrl-9403d69d","./Cartesian2-54f49cd5","./Cartographic-9ee1f1bd","./ComponentDatatype-94b9147c","./CylinderGeometryLibrary-37f81d0f","./when-7d8885d2","./Check-737bd4ec","./GeometryAttribute-bf27d0ff","./GeometryAttributes-2f749385","./GeometryOffsetAttribute-fbeb6f1a","./IndexDatatype-cb5f74b7","./Math-4ffce144","./FeatureDetection-07e177c7","./VertexFormat-86386b6b"],(function(t,e,a,r,n,o,i,s,u,m,d,f,l,p,y,b){"use strict";var c=new r.Cartesian2,v=new n.Cartesian3,A=new n.Cartesian3,g=new n.Cartesian3,h=new n.Cartesian3;function x(t){var e=(t=s.defaultValue(t,s.defaultValue.EMPTY_OBJECT)).length,a=t.topRadius,r=t.bottomRadius,n=s.defaultValue(t.vertexFormat,b.VertexFormat.DEFAULT),o=s.defaultValue(t.slices,128);this._length=e,this._topRadius=a,this._bottomRadius=r,this._vertexFormat=b.VertexFormat.clone(n),this._slices=o,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderGeometry"}x.packedLength=b.VertexFormat.packedLength+5,x.pack=function(t,e,a){return a=s.defaultValue(a,0),b.VertexFormat.pack(t._vertexFormat,e,a),a+=b.VertexFormat.packedLength,e[a++]=t._length,e[a++]=t._topRadius,e[a++]=t._bottomRadius,e[a++]=t._slices,e[a]=s.defaultValue(t._offsetAttribute,-1),e};var _,F=new b.VertexFormat,C={vertexFormat:F,length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,offsetAttribute:void 0};x.unpack=function(t,e,a){e=s.defaultValue(e,0);var r=b.VertexFormat.unpack(t,e,F);e+=b.VertexFormat.packedLength;var n=t[e++],o=t[e++],i=t[e++],u=t[e++],m=t[e];return s.defined(a)?(a._vertexFormat=b.VertexFormat.clone(r,a._vertexFormat),a._length=n,a._topRadius=o,a._bottomRadius=i,a._slices=u,a._offsetAttribute=-1===m?void 0:m,a):(C.length=n,C.topRadius=o,C.bottomRadius=i,C.slices=u,C.offsetAttribute=-1===m?void 0:m,new x(C))},x.createGeometry=function(t){var u=t._length,b=t._topRadius,x=t._bottomRadius,_=t._vertexFormat,F=t._slices;if(!(u<=0||b<0||x<0||0===b&&0===x)){var C,w=F+F,G=F+w,D=w+w,R=i.CylinderGeometryLibrary.computePositions(u,b,x,F,!0),V=_.st?new Float32Array(2*D):void 0,O=_.normal?new Float32Array(3*D):void 0,T=_.tangent?new Float32Array(3*D):void 0,L=_.bitangent?new Float32Array(3*D):void 0,M=_.normal||_.tangent||_.bitangent;if(M){var P=_.tangent||_.bitangent,k=0,z=0,E=0,N=Math.atan2(x-b,u),I=v;I.z=Math.sin(N);var U=Math.cos(N),S=g,B=A;for(C=0;C<F;C++){var Y=C/F*p.CesiumMath.TWO_PI,Z=U*Math.cos(Y),J=U*Math.sin(Y);M&&(I.x=Z,I.y=J,P&&(S=n.Cartesian3.normalize(n.Cartesian3.cross(n.Cartesian3.UNIT_Z,I,S),S)),_.normal&&(O[k++]=I.x,O[k++]=I.y,O[k++]=I.z,O[k++]=I.x,O[k++]=I.y,O[k++]=I.z),_.tangent&&(T[z++]=S.x,T[z++]=S.y,T[z++]=S.z,T[z++]=S.x,T[z++]=S.y,T[z++]=S.z),_.bitangent&&(B=n.Cartesian3.normalize(n.Cartesian3.cross(I,S,B),B),L[E++]=B.x,L[E++]=B.y,L[E++]=B.z,L[E++]=B.x,L[E++]=B.y,L[E++]=B.z))}for(C=0;C<F;C++)_.normal&&(O[k++]=0,O[k++]=0,O[k++]=-1),_.tangent&&(T[z++]=1,T[z++]=0,T[z++]=0),_.bitangent&&(L[E++]=0,L[E++]=-1,L[E++]=0);for(C=0;C<F;C++)_.normal&&(O[k++]=0,O[k++]=0,O[k++]=1),_.tangent&&(T[z++]=1,T[z++]=0,T[z++]=0),_.bitangent&&(L[E++]=0,L[E++]=1,L[E++]=0)}var W=12*F-12,j=l.IndexDatatype.createTypedArray(D,W),q=0,H=0;for(C=0;C<F-1;C++)j[q++]=H,j[q++]=H+2,j[q++]=H+3,j[q++]=H,j[q++]=H+3,j[q++]=H+1,H+=2;for(j[q++]=w-2,j[q++]=0,j[q++]=1,j[q++]=w-2,j[q++]=1,j[q++]=w-1,C=1;C<F-1;C++)j[q++]=w+C+1,j[q++]=w+C,j[q++]=w;for(C=1;C<F-1;C++)j[q++]=G,j[q++]=G+C,j[q++]=G+C+1;var K=0;if(_.st){var Q=Math.max(b,x);for(C=0;C<D;C++){var X=n.Cartesian3.fromArray(R,3*C,h);V[K++]=(X.x+Q)/(2*Q),V[K++]=(X.y+Q)/(2*Q)}}var $=new d.GeometryAttributes;_.position&&($.position=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:R})),_.normal&&($.normal=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:O})),_.tangent&&($.tangent=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:T})),_.bitangent&&($.bitangent=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:L})),_.st&&($.st=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:V})),c.x=.5*u,c.y=Math.max(x,b);var tt=new a.BoundingSphere(n.Cartesian3.ZERO,r.Cartesian2.magnitude(c));if(s.defined(t._offsetAttribute)){u=R.length;var et=new Uint8Array(u/3),at=t._offsetAttribute===f.GeometryOffsetAttribute.NONE?0:1;e.arrayFill(et,at),$.applyOffset=new m.GeometryAttribute({componentDatatype:o.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:et})}return new m.Geometry({attributes:$,indices:j,primitiveType:y.PrimitiveType.TRIANGLES,boundingSphere:tt,offsetAttribute:t._offsetAttribute})}},x.getUnitCylinder=function(){return s.defined(_)||(_=x.createGeometry(new x({topRadius:1,bottomRadius:1,length:1,vertexFormat:b.VertexFormat.POSITION_ONLY}))),_},t.CylinderGeometry=x}));
