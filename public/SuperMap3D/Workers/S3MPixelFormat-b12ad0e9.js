define(["exports","./when-b60132fc","./Math-3024ab74","./WebGLConstants-aba9fc67"],(function(r,e,n,o){"use strict";function t(r,n,o,a){return n=e.defaultValue(n,0),o=e.defaultValue(o,r.byteLength-n),a=e.defaultValue(a,"utf-8"),r=r.subarray(n,n+o),t.decode(r,a)}function a(r,e,n){return e<=r&&r<=n}t.decodeWithTextDecoder=function(r,e){return new TextDecoder(e).decode(r)},t.decodeWithFromCharCode=function(r){for(var e="",n=function(r){for(var e=0,n=0,t=0,f=128,i=191,u=[],c=r.length,d=0;d<c;++d){var v=r[d];if(0===t){if(a(v,0,127)){u.push(v);continue}if(a(v,194,223)){t=1,e=31&v;continue}if(a(v,224,239)){224===v&&(f=160),237===v&&(i=159),t=2,e=15&v;continue}if(a(v,240,244)){240===v&&(f=144),244===v&&(i=143),t=3,e=7&v;continue}throw new o.RuntimeError("String decoding failed.")}a(v,f,i)?(f=128,i=191,e=e<<6|63&v,++n===t&&(u.push(e),e=t=n=0)):(e=t=n=0,f=128,i=191,--d)}return u}(r),t=n.length,f=0;f<t;++f){var i=n[f];i<=65535?e+=String.fromCharCode(i):(i-=65536,e+=String.fromCharCode(55296+(i>>10),56320+(1023&i)))}return e},"undefined"!=typeof TextDecoder?t.decode=t.decodeWithTextDecoder:t.decode=t.decodeWithFromCharCode;var f=5,i=11;
//! Use DXT1 compression.
function u(r,e,n,o){var t=r|e<<8,a=t>>11&31,f=t>>5&63,i=31&t;return n[o+0]=a<<3|a>>2,n[o+1]=f<<2|f>>4,n[o+2]=i<<3|i>>2,n[o+3]=255,t}function c(r,e,n,o){var t=0;0!=(6&o)&&(t=8),function(r,e,n,o){for(var t=new Uint8Array(16),a=u(e[n+0],e[n+1],t,0),f=u(e[n+2],e[n+3],t,4),i=0;i<3;i++){var c=t[i],d=t[4+i];o&&a<=f?(t[8+i]=(c+d)/2,t[12+i]=0):(t[8+i]=(2*c+d)/3,t[12+i]=(c+2*d)/3)}t[11]=255,t[15]=o&&a<=f?0:255;var v=new Uint8Array(16);for(i=0;i<4;++i){var A=e[n+4+i];v[4*i+0]=3&A,v[4*i+1]=A>>2&3,v[4*i+2]=A>>4&3,v[4*i+3]=A>>6&3}for(i=0;i<16;++i)for(var h=4*v[i],l=0;l<4;++l)r[4*i+l]=t[h+l]}(r,e,n+t,0!=(1&o)),0!=(2&o)?function(r,e,n){for(var o=0;o<8;++o){var t=bytes[n+o],a=15&t,f=240&t;r[8*o+3]=a|a<<4,r[8*o+7]=f|f>>4}}(r,0,n):0!=(4&o)&&function(r,e,n){var o=e[n+0],t=e[n+1],a=new Uint8Array(8);if(a[0]=o,a[1]=t,o<=t){for(var f=1;f<5;++f)a[1+f]=((5-f)*o+f*t)/5;a[6]=0,a[7]=255}else for(f=1;f<7;++f)a[1+f]=((7-f)*o+f*t)/7;var i=new Uint8Array(16),u=(n+=2,0);for(f=0;f<2;++f){for(var c=0,d=0;d<3;++d)c|=e[n++]<<8*d;for(d=0;d<8;++d){var v=c>>3*d&7;i[u++]=v}}for(f=0;f<16;++f)r[4*f+3]=a[i[f]]}(r,e,n)}function d(r){}d.decode=function(r,e,n,o,t){if(null!=r&&null!=o&&0!=n&&0!=e){var a=0;1&(a=t>i||t===f?4:33)&&32&a?function(r,e,n,o){for(var t=new Uint16Array(4),a=r,f=0,i=0,u=0,c=0,d=0,v=0,A=0,h=0,l=0,C=e/4,T=n/4,D=0;D<T;D++)for(var y=0;y<C;y++)u=4*((T-D)*C+y),t[0]=o[u],t[1]=o[u+1],c=31&t[0],d=2016&t[0],v=63488&t[0],A=31&t[1],h=2016&t[1],l=63488&t[1],t[2]=5*c+3*A>>3|5*d+3*h>>3&2016|5*v+3*l>>3&63488,t[3]=5*A+3*c>>3|5*h+3*d>>3&2016|5*l+3*v>>3&63488,f=o[u+2],a[i=4*D*e+4*y]=t[3&f],a[i+1]=t[f>>2&3],a[i+2]=t[f>>4&3],a[i+3]=t[f>>6&3],a[i+=e]=t[f>>8&3],a[i+1]=t[f>>10&3],a[i+2]=t[f>>12&3],a[i+3]=t[f>>14],f=o[u+3],a[i+=e]=t[3&f],a[i+1]=t[f>>2&3],a[i+2]=t[f>>4&3],a[i+3]=t[f>>6&3],a[i+=e]=t[f>>8&3],a[i+1]=t[f>>10&3],a[i+2]=t[f>>12&3],a[i+3]=t[f>>14]}
/*! @brief Decompresses an image in memory.

     @param rgba		Storage for the decompressed pixels.
     @param width	The width of the source image.
     @param height	The height of the source image.
     @param blocks	The compressed DXT blocks.
     @param flags	Compression flags.

     The decompressed pixels will be written as a contiguous array of width*height
     16 rgba values, with each component as 1 byte each. In memory this is:

     { r1, g1, b1, a1, .... , rn, gn, bn, an } for n = width*height

     The flags parameter should specify either kDxt1, kDxt3 or kDxt5 compression,
     however, DXT1 will be used by default if none is specified. All other flags
     are ignored.

     Internally this function calls squish::Decompress for each block.
     */(r,e,n,o):function(r,e,n,o,t){for(var a=0!=(1&t)?8:16,f=0,i=0;i<n;i+=4)for(var u=0;u<e;u+=4){var d=new Uint8Array(64);c(d,o,f,t);for(var v=0,A=0;A<4;++A)for(var h=0;h<4;++h){var l=u+h,C=i+A;if(l<e&&C<n)for(var T=4*(e*(n-C)+l),D=0;D<4;++D)r[T++]=d[v++];else v+=4}f+=a}}(r,e,n,o,a)}};var v=Object.freeze({LUMINANCE_8:1,LUMINANCE_16:2,ALPHA:3,ALPHA_4_LUMINANCE_4:4,LUMINANCE_ALPHA:5,RGB_565:6,BGR565:7,RGB:10,BGR:11,ARGB:12,ABGR:13,BGRA:14,WEBP:25,RGBA:28,DXT1:17,DXT2:18,DXT3:19,DXT4:20,DXT5:21,CRN_DXT5:26,STANDARD_CRN:27,KTX2:31});r.DXTTextureDecode=d,r.S3MPixelFormat=v,r.getStringFromTypedArray=t}));
