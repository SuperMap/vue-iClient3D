define(["exports","./Cartesian4-442405e6","./Math-3024ab74","./when-b60132fc"],(function(e,n,i,o){"use strict";function h(){this.high=n.Cartesian3.clone(n.Cartesian3.ZERO),this.low=n.Cartesian3.clone(n.Cartesian3.ZERO)}h.encode=function(e,n){var i;return o.defined(n)||(n={high:0,low:0}),e>=0?(i=65536*Math.floor(e/65536),n.high=i,n.low=e-i):(i=65536*Math.floor(-e/65536),n.high=-i,n.low=e+i),n};var a={high:0,low:0};h.fromCartesian=function(e,n){o.defined(n)||(n=new h);var i=n.high,t=n.low;return h.encode(e.x,a),i.x=a.high,t.x=a.low,h.encode(e.y,a),i.y=a.high,t.y=a.low,h.encode(e.z,a),i.z=a.high,t.z=a.low,n};var t=new h;h.writeElements=function(e,n,i){h.fromCartesian(e,t);var o=t.high,a=t.low;n[i]=o.x,n[i+1]=o.y,n[i+2]=o.z,n[i+3]=a.x,n[i+4]=a.y,n[i+5]=a.z},e.EncodedCartesian3=h}));
