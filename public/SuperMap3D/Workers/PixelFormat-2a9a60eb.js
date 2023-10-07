define(["exports","./WebGLConstants-6b41cc89","./when-7d8885d2"],(function(_,t,n){"use strict";var e={UNSIGNED_BYTE:t.WebGLConstants.UNSIGNED_BYTE,UNSIGNED_SHORT:t.WebGLConstants.UNSIGNED_SHORT,UNSIGNED_INT:t.WebGLConstants.UNSIGNED_INT,FLOAT:t.WebGLConstants.FLOAT,HALF_FLOAT:t.WebGLConstants.HALF_FLOAT_OES,UNSIGNED_INT_24_8:t.WebGLConstants.UNSIGNED_INT_24_8,UNSIGNED_SHORT_4_4_4_4:t.WebGLConstants.UNSIGNED_SHORT_4_4_4_4,UNSIGNED_SHORT_5_5_5_1:t.WebGLConstants.UNSIGNED_SHORT_5_5_5_1,UNSIGNED_SHORT_5_6_5:t.WebGLConstants.UNSIGNED_SHORT_5_6_5,isPacked:function(_){return _===e.UNSIGNED_INT_24_8||_===e.UNSIGNED_SHORT_4_4_4_4||_===e.UNSIGNED_SHORT_5_5_5_1||_===e.UNSIGNED_SHORT_5_6_5},sizeInBytes:function(_){switch(_){case e.UNSIGNED_BYTE:return 1;case e.UNSIGNED_SHORT:case e.UNSIGNED_SHORT_4_4_4_4:case e.UNSIGNED_SHORT_5_5_5_1:case e.UNSIGNED_SHORT_5_6_5:case t.WebGLConstants.HALF_FLOAT:case t.WebGLConstants.HALF_FLOAT_OES:return 2;case e.UNSIGNED_INT:case e.FLOAT:case e.UNSIGNED_INT_24_8:return 4}},validate:function(_){return _===e.UNSIGNED_BYTE||_===e.UNSIGNED_SHORT||_===e.UNSIGNED_INT||_===e.FLOAT||_===t.WebGLConstants.HALF_FLOAT||_===t.WebGLConstants.HALF_FLOAT_OES||_===e.UNSIGNED_INT_24_8||_===e.UNSIGNED_SHORT_4_4_4_4||_===e.UNSIGNED_SHORT_5_5_5_1||_===e.UNSIGNED_SHORT_5_6_5},toWebGLConstant:function(_,n){switch(_){case e.UNSIGNED_BYTE:return t.WebGLConstants.UNSIGNED_BYTE;case e.UNSIGNED_SHORT:return t.WebGLConstants.UNSIGNED_SHORT;case e.UNSIGNED_INT:return t.WebGLConstants.UNSIGNED_INT;case e.FLOAT:return t.WebGLConstants.FLOAT;case e.HALF_FLOAT:return n.webgl2?t.WebGLConstants.HALF_FLOAT:t.WebGLConstants.HALF_FLOAT_OES;case e.UNSIGNED_INT_24_8:return t.WebGLConstants.UNSIGNED_INT_24_8;case e.UNSIGNED_SHORT_4_4_4_4:return t.WebGLConstants.UNSIGNED_SHORT_4_4_4_4;case e.UNSIGNED_SHORT_5_5_5_1:return t.WebGLConstants.UNSIGNED_SHORT_5_5_5_1;case e.UNSIGNED_SHORT_5_6_5:return e.UNSIGNED_SHORT_5_6_5}}},G={DEPTH_COMPONENT:t.WebGLConstants.DEPTH_COMPONENT,DEPTH_COMPONENT16:t.WebGLConstants.DEPTH_COMPONENT16,DEPTH_COMPONENT32F:t.WebGLConstants.DEPTH_COMPONENT32F,DEPTH_STENCIL:t.WebGLConstants.DEPTH_STENCIL,ALPHA:t.WebGLConstants.ALPHA,RGB:t.WebGLConstants.RGB,RGBA:t.WebGLConstants.RGBA,LUMINANCE:t.WebGLConstants.LUMINANCE,LUMINANCE_ALPHA:t.WebGLConstants.LUMINANCE_ALPHA,RGB_DXT1:t.WebGLConstants.COMPRESSED_RGB_S3TC_DXT1_EXT,RGBA_DXT1:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT1_EXT,RGBA_DXT3:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT3_EXT,RGBA_DXT5:t.WebGLConstants.COMPRESSED_RGBA_S3TC_DXT5_EXT,RGB_PVRTC_4BPPV1:t.WebGLConstants.COMPRESSED_RGB_PVRTC_4BPPV1_IMG,RGB_PVRTC_2BPPV1:t.WebGLConstants.COMPRESSED_RGB_PVRTC_2BPPV1_IMG,RGBA_PVRTC_4BPPV1:t.WebGLConstants.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,RGBA_PVRTC_2BPPV1:t.WebGLConstants.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,RGBA_ASTC:t.WebGLConstants.COMPRESSED_RGBA_ASTC_4x4_WEBGL,RGB_ETC1:t.WebGLConstants.COMPRESSED_RGB_ETC1_WEBGL,RED_INTEGER:t.WebGLConstants.RED_INTEGER,RED:t.WebGLConstants.RED,RGB8_ETC2:t.WebGLConstants.COMPRESSED_RGB8_ETC2,RGBA8_ETC2_EAC:t.WebGLConstants.COMPRESSED_RGBA8_ETC2_EAC,RGBA_BC7:t.WebGLConstants.COMPRESSED_RGBA_BPTC_UNORM,componentsLength:function(_){switch(_){case G.RGB:return 3;case G.RGBA:return 4;case G.LUMINANCE_ALPHA:return 2;case G.ALPHA:case G.LUMINANCE:case G.RED:case G.RED_INTEGER:default:return 1}},validate:function(_){return _===G.DEPTH_COMPONENT||_===G.DEPTH_COMPONENT16||_===G.DEPTH_COMPONENT32F||_===G.DEPTH_STENCIL||_===G.ALPHA||_===G.RED||_===G.RED_INTEGER||_===G.RGB||_===G.RGBA||_===G.LUMINANCE||_===G.LUMINANCE_ALPHA||_===G.RGB_DXT1||_===G.RGBA_DXT1||_===G.RGBA_DXT3||_===G.RGBA_DXT5||_===G.RGB_PVRTC_4BPPV1||_===G.RGB_PVRTC_2BPPV1||_===G.RGBA_PVRTC_4BPPV1||_===G.RGBA_PVRTC_2BPPV1||_===G.RGBA_ASTC||_===G.RGB_ETC1||_===G.RGB8_ETC2||_===G.RGBA8_ETC2_EAC||_===G.RGBA_BC7},isColorFormat:function(_){return _===G.ALPHA||_===G.RED||_===G.RED_INTEGER||_===G.RGB||_===G.RGBA||_===G.LUMINANCE||_===G.LUMINANCE_ALPHA},isDepthFormat:function(_){return _===G.DEPTH_COMPONENT||_===G.DEPTH_COMPONENT16||_===G.DEPTH_COMPONENT32F||_===G.DEPTH_STENCIL},isCompressedFormat:function(_){return _===G.RGB_DXT1||_===G.RGBA_DXT1||_===G.RGBA_DXT3||_===G.RGBA_DXT5||_===G.RGB_PVRTC_4BPPV1||_===G.RGB_PVRTC_2BPPV1||_===G.RGBA_PVRTC_4BPPV1||_===G.RGBA_PVRTC_2BPPV1||_===G.RGBA_ASTC||_===G.RGB_ETC1||_===G.RGB8_ETC2||_===G.RGBA8_ETC2_EAC||_===G.RGBA_BC7},isDXTFormat:function(_){return _===G.RGB_DXT1||_===G.RGBA_DXT1||_===G.RGBA_DXT3||_===G.RGBA_DXT5},isPVRTCFormat:function(_){return _===G.RGB_PVRTC_4BPPV1||_===G.RGB_PVRTC_2BPPV1||_===G.RGBA_PVRTC_4BPPV1||_===G.RGBA_PVRTC_2BPPV1},isETC1Format:function(_){return _===G.RGB_ETC1},compressedTextureSizeInBytes:function(_,t,e,T){var E=n.defined(T)?T:1;switch(_){case G.RGB_DXT1:case G.RGBA_DXT1:case G.RGB_ETC1:case G.RGB8_ETC2:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8*E;case G.RGBA_DXT3:case G.RGBA_DXT5:case G.RGBA_ASTC:case G.RGBA8_ETC2_EAC:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16*E;case G.RGB_PVRTC_4BPPV1:case G.RGBA_PVRTC_4BPPV1:return Math.floor((Math.max(t,8)*Math.max(e,8)*4+7)/8)*E;case G.RGB_PVRTC_2BPPV1:case G.RGBA_PVRTC_2BPPV1:return Math.floor((Math.max(t,16)*Math.max(e,8)*2+7)/8)*E;case G.RGBA_BC7:return Math.ceil(t/4)*Math.ceil(e/4)*16;default:return 0}},textureSizeInBytes:function(_,t,T,E,s){var R=n.defined(s)?s:1,N=G.componentsLength(_);return e.isPacked(t)&&(N=1),N*e.sizeInBytes(t)*T*E*R},alignmentInBytes:function(_,t,n){var e=G.textureSizeInBytes(_,t,n,1)%4;return 0===e?4:2===e?2:1},createTypedArray:function(_,t,n,T){var E=e.sizeInBytes(t);return new(E===Uint8Array.BYTES_PER_ELEMENT?Uint8Array:E===Uint16Array.BYTES_PER_ELEMENT?Uint16Array:E===Float32Array.BYTES_PER_ELEMENT&&t===e.FLOAT?Float32Array:Uint32Array)(G.componentsLength(_)*n*T)},flipY:function(_,t,n,e,T){if(1===T)return _;for(var E=G.createTypedArray(t,n,e,T),s=G.componentsLength(t),R=e*s,N=0;N<T;++N)for(var C=N*e*s,a=(T-N-1)*e*s,r=0;r<R;++r)E[a+r]=_[C+r];return E},RGBToRGBA:function(_,t,n,e){for(var T=G.createTypedArray(G.RGBA,t,n,e),E=_.length/3,s=0;s<E;s++)T[4*s]=_[3*s],T[4*s+1]=_[3*s+1],T[4*s+2]=_[3*s+2];return T},toInternalFormat:function(_,n,T){if(!T.webgl2)return _;if(_===G.DEPTH_STENCIL)return t.WebGLConstants.DEPTH24_STENCIL8;if(_===G.DEPTH_COMPONENT){if(n===e.UNSIGNED_SHORT)return t.WebGLConstants.DEPTH_COMPONENT16;if(n===e.UNSIGNED_INT)return t.WebGLConstants.DEPTH_COMPONENT24;if(n===e.FLOAT)return t.WebGLConstants.DEPTH_COMPONENT32F}if(_===G.DEPTH_COMPONENT16)return t.WebGLConstants.DEPTH_COMPONENT16;if(_===G.DEPTH_COMPONENT32F)return t.WebGLConstants.DEPTH_COMPONENT32F;if(n===e.FLOAT)switch(_){case G.RGBA:return t.WebGLConstants.RGBA32F;case G.RGB:return t.WebGLConstants.RGB32F;case G.RG:return t.WebGLConstants.RG32F;case G.R:return t.WebGLConstants.R32F}if(n===e.HALF_FLOAT)switch(_){case G.RGBA:return t.WebGLConstants.RGBA16F;case G.RGB:return t.WebGLConstants.RGB16F;case G.RG:return t.WebGLConstants.RG16F;case G.R:return t.WebGLConstants.R16F}return _}},T=Object.freeze(G);_.PixelDatatype=e,_.PixelFormat=T}));