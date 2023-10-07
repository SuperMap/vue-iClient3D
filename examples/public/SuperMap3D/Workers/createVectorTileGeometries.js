define(["./buildModuleUrl-9403d69d","./BoxGeometry-1755e65a","./Cartographic-9ee1f1bd","./Color-1274f10e","./CylinderGeometry-039cf3db","./when-7d8885d2","./EllipsoidGeometry-69cc9d40","./IndexDatatype-cb5f74b7","./FeatureDetection-07e177c7","./createTaskProcessorWorker","./Check-737bd4ec","./Cartesian2-54f49cd5","./Math-4ffce144","./Event-1c0f5ff4","./RuntimeError-f53bcb51","./arrayFill-0e93951b","./ComponentDatatype-94b9147c","./WebGLConstants-6b41cc89","./GeometryAttribute-bf27d0ff","./Cartesian4-6d2e270a","./GeometryAttributes-2f749385","./GeometryOffsetAttribute-fbeb6f1a","./VertexFormat-86386b6b","./CylinderGeometryLibrary-37f81d0f"],(function(e,t,r,n,a,i,o,d,s,c,f,l,u,h,b,p,y,g,v,x,C,m,I,k){"use strict";function M(e){this.offset=e.offset,this.count=e.count,this.color=e.color,this.batchIds=e.batchIds}var B=new r.Cartesian3,w=s.Matrix4.packedLength+r.Cartesian3.packedLength,A=s.Matrix4.packedLength+2,O=s.Matrix4.packedLength+r.Cartesian3.packedLength,L=r.Cartesian3.packedLength+1,E={modelMatrix:new s.Matrix4,boundingVolume:new e.BoundingSphere};function U(e,t){var n=t*w,a=r.Cartesian3.unpack(e,n,B);n+=r.Cartesian3.packedLength;var i=s.Matrix4.unpack(e,n,E.modelMatrix);s.Matrix4.multiplyByScale(i,a,i);var o=E.boundingVolume;return r.Cartesian3.clone(r.Cartesian3.ZERO,o.center),o.radius=Math.sqrt(3),E}function G(e,t){var n=t*A,a=e[n++],i=e[n++],o=r.Cartesian3.fromElements(a,a,i,B),d=s.Matrix4.unpack(e,n,E.modelMatrix);s.Matrix4.multiplyByScale(d,o,d);var c=E.boundingVolume;return r.Cartesian3.clone(r.Cartesian3.ZERO,c.center),c.radius=Math.sqrt(2),E}function F(e,t){var n=t*O,a=r.Cartesian3.unpack(e,n,B);n+=r.Cartesian3.packedLength;var i=s.Matrix4.unpack(e,n,E.modelMatrix);s.Matrix4.multiplyByScale(i,a,i);var o=E.boundingVolume;return r.Cartesian3.clone(r.Cartesian3.ZERO,o.center),o.radius=1,E}function S(e,t){var n=t*L,a=e[n++],i=r.Cartesian3.unpack(e,n,B),o=s.Matrix4.fromTranslation(i,E.modelMatrix);s.Matrix4.multiplyByUniformScale(o,a,o);var d=E.boundingVolume;return r.Cartesian3.clone(r.Cartesian3.ZERO,d.center),d.radius=1,E}var V=new r.Cartesian3;function T(t,a,o,d,c){if(i.defined(a)){for(var f=o.length,l=d.attributes.position.values,u=d.indices,h=t.positions,b=t.vertexBatchIds,p=t.indices,y=t.batchIds,g=t.batchTableColors,v=t.batchedIndices,x=t.indexOffsets,C=t.indexCounts,m=t.boundingVolumes,I=t.modelMatrix,k=t.center,B=t.positionOffset,w=t.batchIdIndex,A=t.indexOffset,O=t.batchedIndicesOffset,L=0;L<f;++L){var E=c(a,L),U=E.modelMatrix;s.Matrix4.multiply(I,U,U);for(var G=o[L],F=l.length,S=0;S<F;S+=3){var T=r.Cartesian3.unpack(l,S,V);s.Matrix4.multiplyByPoint(U,T,T),r.Cartesian3.subtract(T,k,T),r.Cartesian3.pack(T,h,3*B+S),b[w++]=G}for(var R=u.length,D=0;D<R;++D)p[A+D]=u[D]+B;var Z=L+O;v[Z]=new M({offset:A,count:R,color:n.Color.fromRgba(g[G]),batchIds:[G]}),y[Z]=G,x[Z]=A,C[Z]=R,m[Z]=e.BoundingSphere.transform(E.boundingVolume,U),B+=F/3,A+=R}t.positionOffset=B,t.batchIdIndex=w,t.indexOffset=A,t.batchedIndicesOffset+=f}}var R=new r.Cartesian3,D=new s.Matrix4;function Z(t,r,a){var i=a.length,o=2+i*e.BoundingSphere.packedLength+1+function(e){for(var t=e.length,r=0,a=0;a<t;++a)r+=n.Color.packedLength+3+e[a].batchIds.length;return r}(r),d=new Float64Array(o),s=0;d[s++]=t,d[s++]=i;for(var c=0;c<i;++c)e.BoundingSphere.pack(a[c],d,s),s+=e.BoundingSphere.packedLength;var f=r.length;d[s++]=f;for(var l=0;l<f;++l){var u=r[l];n.Color.pack(u.color,d,s),s+=n.Color.packedLength,d[s++]=u.offset,d[s++]=u.count;var h=u.batchIds,b=h.length;d[s++]=b;for(var p=0;p<b;++p)d[s++]=h[p]}return d}return c((function(e,n){var c=i.defined(e.boxes)?new Float32Array(e.boxes):void 0,f=i.defined(e.boxBatchIds)?new Uint16Array(e.boxBatchIds):void 0,l=i.defined(e.cylinders)?new Float32Array(e.cylinders):void 0,u=i.defined(e.cylinderBatchIds)?new Uint16Array(e.cylinderBatchIds):void 0,h=i.defined(e.ellipsoids)?new Float32Array(e.ellipsoids):void 0,b=i.defined(e.ellipsoidBatchIds)?new Uint16Array(e.ellipsoidBatchIds):void 0,p=i.defined(e.spheres)?new Float32Array(e.spheres):void 0,y=i.defined(e.sphereBatchIds)?new Uint16Array(e.sphereBatchIds):void 0,g=i.defined(c)?f.length:0,v=i.defined(l)?u.length:0,x=i.defined(h)?b.length:0,C=i.defined(p)?y.length:0,m=t.BoxGeometry.getUnitBox(),I=a.CylinderGeometry.getUnitCylinder(),k=o.EllipsoidGeometry.getUnitEllipsoid(),M=m.attributes.position.values,B=I.attributes.position.values,w=k.attributes.position.values,A=M.length*g;A+=B.length*v,A+=w.length*(x+C);var O=m.indices,L=I.indices,E=k.indices,V=O.length*g;V+=L.length*v,V+=E.length*(x+C);var P=new Float32Array(A),q=new Uint16Array(A/3),W=d.IndexDatatype.createTypedArray(A/3,V),_=g+v+x+C,N=new Uint16Array(_),Y=new Array(_),j=new Uint32Array(_),z=new Uint32Array(_),H=new Array(_);!function(e){var t=new Float64Array(e),n=0;r.Cartesian3.unpack(t,n,R),n+=r.Cartesian3.packedLength,s.Matrix4.unpack(t,n,D)}(e.packedBuffer);var J={batchTableColors:new Uint32Array(e.batchTableColors),positions:P,vertexBatchIds:q,indices:W,batchIds:N,batchedIndices:Y,indexOffsets:j,indexCounts:z,boundingVolumes:H,positionOffset:0,batchIdIndex:0,indexOffset:0,batchedIndicesOffset:0,modelMatrix:D,center:R};T(J,c,f,m,U),T(J,l,u,I,G),T(J,h,b,k,F),T(J,p,y,k,S);var K=Z(W.BYTES_PER_ELEMENT,Y,H);return n.push(P.buffer,q.buffer,W.buffer),n.push(N.buffer,j.buffer,z.buffer),n.push(K.buffer),{positions:P.buffer,vertexBatchIds:q.buffer,indices:W.buffer,indexOffsets:j.buffer,indexCounts:z.buffer,batchIds:N.buffer,packedBuffer:K.buffer}}))}));