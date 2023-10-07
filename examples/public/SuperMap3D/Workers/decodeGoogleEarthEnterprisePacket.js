define(["./Check-737bd4ec","./RuntimeError-f53bcb51","./when-7d8885d2","./pako_inflate-f73548c4","./createTaskProcessorWorker"],(function(r,t,e,n,i){"use strict";function a(r,e){if(a.passThroughDataForTesting)return e;var n=r.byteLength;if(0===n||n%4!=0)throw new t.RuntimeError("The length of key must be greater than 0 and a multiple of 4.");var i=new DataView(e),o=i.getUint32(0,!0);if(1953029805===o||2917034100===o)return e;for(var s,u=new DataView(r),f=0,h=e.byteLength,v=h-h%8,c=n,g=8;f<v;)for(s=g=(g+8)%24;f<v&&s<c;)i.setUint32(f,i.getUint32(f,!0)^u.getUint32(s,!0),!0),i.setUint32(f+4,i.getUint32(f+4,!0)^u.getUint32(s+4,!0),!0),f+=8,s+=24;if(f<h)for(s>=c&&(s=g=(g+8)%24);f<h;)i.setUint8(f,i.getUint8(f)^u.getUint8(s)),f++,s++}function o(r,t){return 0!=(r&t)}a.passThroughDataForTesting=!1;var s=[1,2,4,8];function u(r,t,e,n,i,a){this._bits=r,this.cnodeVersion=t,this.imageryVersion=e,this.terrainVersion=n,this.imageryProvider=i,this.terrainProvider=a,this.ancestorHasTerrain=!1,this.terrainState=void 0}u.clone=function(r,t){return e.defined(t)?(t._bits=r._bits,t.cnodeVersion=r.cnodeVersion,t.imageryVersion=r.imageryVersion,t.terrainVersion=r.terrainVersion,t.imageryProvider=r.imageryProvider,t.terrainProvider=r.terrainProvider):t=new u(r._bits,r.cnodeVersion,r.imageryVersion,r.terrainVersion,r.imageryProvider,r.terrainProvider),t.ancestorHasTerrain=r.ancestorHasTerrain,t.terrainState=r.terrainState,t},u.prototype.setParent=function(r){this.ancestorHasTerrain=r.ancestorHasTerrain||this.hasTerrain()},u.prototype.hasSubtree=function(){return o(this._bits,16)},u.prototype.hasImagery=function(){return o(this._bits,64)},u.prototype.hasTerrain=function(){return o(this._bits,128)},u.prototype.hasChildren=function(){return o(this._bits,15)},u.prototype.hasChild=function(r){return o(this._bits,s[r])},u.prototype.getChildBitmask=function(){return 15&this._bits};var f=Uint16Array.BYTES_PER_ELEMENT,h=Int32Array.BYTES_PER_ELEMENT,v=Uint32Array.BYTES_PER_ELEMENT,c={METADATA:0,TERRAIN:1,DBROOT:2};c.fromString=function(r){return"Metadata"===r?c.METADATA:"Terrain"===r?c.TERRAIN:"DbRoot"===r?c.DBROOT:void 0};var g=1953029805,d=2917034100;return i((function(r,e){var i=c.fromString(r.type),o=r.buffer;a(r.key,o);var s=function(r){var e=new DataView(r),i=0,a=e.getUint32(i,!0);if(i+=v,a!==g&&a!==d)throw new t.RuntimeError("Invalid magic");var o=e.getUint32(i,a===g);i+=v;var s=new Uint8Array(r,i),u=n.pako.inflate(s);if(u.length!==o)throw new t.RuntimeError("Size of packet doesn't match header");return u}(o);o=s.buffer;var T=s.length;switch(i){case c.METADATA:return function(r,e,n){var i=new DataView(r),a=0,o=i.getUint32(a,!0);if(a+=v,32301!==o)throw new t.RuntimeError("Invalid magic");var s=i.getUint32(a,!0);if(a+=v,1!==s)throw new t.RuntimeError("Invalid data type. Must be 1 for QuadTreePacket");var c=i.getUint32(a,!0);if(a+=v,2!==c)throw new t.RuntimeError("Invalid QuadTreePacket version. Only version 2 is supported.");var g=i.getInt32(a,!0);a+=h;var d=i.getInt32(a,!0);if(a+=h,32!==d)throw new t.RuntimeError("Invalid instance size.");var T=i.getInt32(a,!0);a+=h;var w=i.getInt32(a,!0);a+=h;var E=i.getInt32(a,!0);if(T!==g*d+(a+=h))throw new t.RuntimeError("Invalid dataBufferOffset");if(T+w+E!==e)throw new t.RuntimeError("Invalid packet offsets");for(var l=[],p=0;p<g;++p){var m=i.getUint8(a);++a,++a;var y=i.getUint16(a,!0);a+=f;var U=i.getUint16(a,!0);a+=f;var b=i.getUint16(a,!0);a+=f,a+=f,a+=f,a+=h,a+=h,a+=8;var R=i.getUint8(a++),I=i.getUint8(a++);a+=f,l.push(new u(m,y,U,b,R,I))}var V=[],_=0;function A(r,t,e){var n=!1;if(4===e){if(t.hasSubtree())return;n=!0}for(var i=0;i<4;++i){var a=r+i.toString();if(n)V[a]=null;else if(e<4)if(t.hasChild(i)){if(_===g)return void console.log("Incorrect number of instances");var o=l[_++];V[a]=o,A(a,o,e+1)}else V[a]=null}}var P=0,D=l[_++];""===n?++P:V[n]=D;return A(n,D,P),V}(o,T,r.quadKey);case c.TERRAIN:return function(r,t,e){var n=new DataView(r),i=0,a=[];for(;i<t;){for(var o=i,s=0;s<4;++s){var u=n.getUint32(i,!0);i+=v,i+=u}var f=r.slice(o,i);e.push(f),a.push(f)}return a}(o,T,e);case c.DBROOT:return e.push(o),{buffer:o}}}))}));
