define(["exports","./S3MPixelFormat-4f2b7689","./when-7d8885d2","./Cartographic-9ee1f1bd","./Check-737bd4ec","./IndexDatatype-cb5f74b7","./WebGLConstants-6b41cc89","./FeatureDetection-07e177c7","./ComponentDatatype-94b9147c"],(function(e,t,r,n,i,a,s,o,_){"use strict";
//! Use DXT1 compression.
function E(e,t,r,n){var i=e|t<<8,a=i>>11&31,s=i>>5&63,o=31&i;return r[n+0]=a<<3|a>>2,r[n+1]=s<<2|s>>4,r[n+2]=o<<3|o>>2,r[n+3]=255,i}function f(e,t,r,n){var i=0;0!=(6&n)&&(i=8),function(e,t,r,n){for(var i=new Uint8Array(16),a=E(t[r+0],t[r+1],i,0),s=E(t[r+2],t[r+3],i,4),o=0;o<3;o++){var _=i[o],f=i[4+o];n&&a<=s?(i[8+o]=(_+f)/2,i[12+o]=0):(i[8+o]=(2*_+f)/3,i[12+o]=(_+2*f)/3)}i[11]=255,i[15]=n&&a<=s?0:255;var T=new Uint8Array(16);for(o=0;o<4;++o){var u=t[r+4+o];T[4*o+0]=3&u,T[4*o+1]=u>>2&3,T[4*o+2]=u>>4&3,T[4*o+3]=u>>6&3}for(o=0;o<16;++o)for(var A=4*T[o],c=0;c<4;++c)e[4*o+c]=i[A+c]}(e,t,r+i,0!=(1&n)),0!=(2&n)?function(e,t,r){for(var n=0;n<8;++n){var i=bytes[r+n],a=15&i,s=240&i;e[8*n+3]=a|a<<4,e[8*n+7]=s|s>>4}}(e,0,r):0!=(4&n)&&function(e,t,r){var n=t[r+0],i=t[r+1],a=new Uint8Array(8);if(a[0]=n,a[1]=i,n<=i){for(var s=1;s<5;++s)a[1+s]=((5-s)*n+s*i)/5;a[6]=0,a[7]=255}else for(s=1;s<7;++s)a[1+s]=((7-s)*n+s*i)/7;var o=new Uint8Array(16),_=(r+=2,0);for(s=0;s<2;++s){for(var E=0,f=0;f<3;++f)E|=t[r++]<<8*f;for(f=0;f<8;++f){var T=E>>3*f&7;o[_++]=T}}for(s=0;s<16;++s)e[4*s+3]=a[o[s]]}(e,t,r)}function T(e){}T.decode=function(e,r,n,i,a){if(null!=e&&null!=i&&0!=n&&0!=r){var s=0;1&(s=a>t.S3MPixelFormat.BGR||a===t.S3MPixelFormat.LUMINANCE_ALPHA?4:33)&&32&s?function(e,t,r,n){for(var i=new Uint16Array(4),a=e,s=0,o=0,_=0,E=0,f=0,T=0,u=0,A=0,c=0,R=t/4,y=r/4,p=0;p<y;p++)for(var d=0;d<R;d++)_=4*((y-p)*R+d),i[0]=n[_],i[1]=n[_+1],E=31&i[0],f=2016&i[0],T=63488&i[0],u=31&i[1],A=2016&i[1],c=63488&i[1],i[2]=5*E+3*u>>3|5*f+3*A>>3&2016|5*T+3*c>>3&63488,i[3]=5*u+3*E>>3|5*A+3*f>>3&2016|5*c+3*T>>3&63488,s=n[_+2],a[o=4*p*t+4*d]=i[3&s],a[o+1]=i[s>>2&3],a[o+2]=i[s>>4&3],a[o+3]=i[s>>6&3],a[o+=t]=i[s>>8&3],a[o+1]=i[s>>10&3],a[o+2]=i[s>>12&3],a[o+3]=i[s>>14],s=n[_+3],a[o+=t]=i[3&s],a[o+1]=i[s>>2&3],a[o+2]=i[s>>4&3],a[o+3]=i[s>>6&3],a[o+=t]=i[s>>8&3],a[o+1]=i[s>>10&3],a[o+2]=i[s>>12&3],a[o+3]=i[s>>14]}
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
     */(e,r,n,i):function(e,t,r,n,i){for(var a=0!=(1&i)?8:16,s=0,o=0;o<r;o+=4)for(var _=0;_<t;_+=4){var E=new Uint8Array(64);f(E,n,s,i);for(var T=0,u=0;u<4;++u)for(var A=0;A<4;++A){var c=_+A,R=o+u;if(c<t&&R<r)for(var y=4*(t*(r-R)+c),p=0;p<4;++p)e[y++]=E[T++];else T+=4}s+=a}}(e,r,n,i,s)}};var u=Object.freeze({encNONE:0,enrS3TCDXTN:14,enrPVRTPF_PVRTC2:19,enrPVRTPF_PVRTC:20,enrPVRTPF_PVRTC_4bpp:21,enrPVRTPF_ETC1:22}),A=Object.freeze({SVC_Vertex:1,SVC_Normal:2,SVC_VertexColor:4,SVC_SecondColor:8,SVC_TexutreCoord:16,SVC_TexutreCoordIsW:32});function c(){return!0}function R(e,t){function r(){}for(var n in e)"function"==typeof e[n]&&(e[n]=r);e.isDestroyed=c}var y={STREAM_DRAW:s.WebGLConstants.STREAM_DRAW,STATIC_DRAW:s.WebGLConstants.STATIC_DRAW,DYNAMIC_DRAW:s.WebGLConstants.DYNAMIC_DRAW,validate:function(e){return e===y.STREAM_DRAW||e===y.STATIC_DRAW||e===y.DYNAMIC_DRAW}};function p(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).context._gl,n=e.bufferTarget,i=e.typedArray,a=e.sizeInBytes,s=e.usage,o=r.defined(i);o&&(a=i.byteLength);var _=t.createBuffer();t.bindBuffer(n,_),t.bufferData(n,o?i:a,s),t.bindBuffer(n,null),this._gl=t,this._webgl2=e.context._webgl2,this._bufferTarget=n,this._sizeInBytes=a,this._usage=s,this._buffer=_,this.context=e.context,e.context.memorySize+=a}function d(){}function I(){this.references=0,this.capacity=0,this.is32Bits=!1,this.uniqueId=I._Counter++}function O(e,t,r,n,i,a,s,o){void 0===n&&(n=0),void 0===i&&(i=!1),void 0===a&&(a=!1),void 0===s&&(s=!1),this._isAlreadyOwned=!1,e.getScene?this._engine=e.getScene().getEngine():this._engine=e,this._updatable=r,this._instanced=a,this._divisor=o||1,t instanceof I?(this._data=null,this._buffer=t):(this._data=t,this._buffer=null),this.byteStride=s?n:n*Float32Array.BYTES_PER_ELEMENT,i||this.create()}function h(e,t,r,n,i,a,s,o,_,E,f,T,u,A){if(void 0===f&&(f=!1),void 0===T&&(T=!1),void 0===u&&(u=1),void 0===A&&(A=!1),t instanceof O?(this._buffer=t,this._ownsBuffer=A):(this._buffer=new O(e,t,n,a,i,s,T),this._ownsBuffer=!0),this.uniqueId=h._Counter++,this._kind=r,null==E){var c=this.getData();this.type=h.FLOAT,c instanceof Int8Array?this.type=h.BYTE:c instanceof Uint8Array?this.type=h.UNSIGNED_BYTE:c instanceof Int16Array?this.type=h.SHORT:c instanceof Uint16Array?this.type=h.UNSIGNED_SHORT:c instanceof Int32Array?this.type=h.INT:c instanceof Uint32Array&&(this.type=h.UNSIGNED_INT)}else this.type=E;var R=h.GetTypeByteLength(this.type);T?(this._size=_||(a?a/R:h.DeduceStride(r)),this.byteStride=a||this._buffer.byteStride||this._size*R,this.byteOffset=o||0):(this._size=_||a||h.DeduceStride(r),this.byteStride=a?a*R:this._buffer.byteStride||this._size*R,this.byteOffset=(o||0)*R),this.normalized=f,this._instanced=void 0!==s&&s,this._instanceDivisor=s?u:0,this._computeHashCode()}function S(e,t,r){void 0===r&&(r=d.BUFFER_CREATIONFLAG_READWRITE),this._engine=e,this._engine._storageBuffers.push(this),this._create(t,r)}function N(e){var t=(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).context,n=e.bufferTarget,i=e.typedArray,o=e.sizeInBytes,_=e.usage,E=r.defined(i);E?o=i.byteLength:i=new Uint8Array(o);var f=d.BUFFER_CREATIONFLAG_STORAGE;r.defined(_)&&(_==y.STREAM_DRAW||_==y.STATIC_DRAW?f|=d.BUFFER_CREATIONFLAG_WRITE:_==y.DYNAMIC_DRAW&&(f|=d.BUFFER_CREATIONFLAG_READWRITE)),r.defined(n)?n==s.WebGLConstants.ELEMENT_ARRAY_BUFFER?(i instanceof Uint8Array&&(e.indexDatatype==a.IndexDatatype.UNSIGNED_INT?i=new Uint32Array(i.buffer,i.byteOffset,i.byteLength/4):e.indexDatatype==a.IndexDatatype.UNSIGNED_SHORT&&(i=new Uint16Array(i.buffer,i.byteOffset,i.byteLength/2))),this._dataBuffer=t.engine.createIndexBuffer(i)):n==s.WebGLConstants.ARRAY_BUFFER?(this._dataBuffer=new O(t.engine,i,!0),this._dataBuffer._data=null):console.log("BufferGPU not supported bufferTarget"):(this._dataBuffer=new S(t.engine,o,f),E&&this._dataBuffer.update(i,0,o)),this._bufferTarget=n,this._sizeInBytes=o,this._usage=_,this.context=e.context,e.context.memorySize+=o}function D(e){return new D({context:(e=r.defaultValue(e,r.defaultValue.EMPTY_OBJECT)).context,bufferTarget:s.WebGLConstants.ARRAY_BUFFER,typedArray:e.typedArray,sizeInBytes:e.sizeInBytes,usage:e.usage})}function C(){}Object.defineProperties(p.prototype,{sizeInBytes:{get:function(){return this._sizeInBytes}},usage:{get:function(){return this._usage}}}),p.prototype._getBuffer=function(){return this._buffer},p.prototype.copyFromArrayView=function(e,t){t=r.defaultValue(t,0);var n=this._gl,i=this._bufferTarget;n.bindBuffer(i,this._buffer),n.bufferSubData(i,t,e),n.bindBuffer(i,null)},p.prototype.copyFromBuffer=function(e,t,r,n){var i=s.WebGLConstants.COPY_READ_BUFFER,a=s.WebGLConstants.COPY_WRITE_BUFFER,o=this._gl;o.bindBuffer(a,this._buffer),o.bindBuffer(i,e._buffer),o.copyBufferSubData(i,a,t,r,n),o.bindBuffer(a,null),o.bindBuffer(i,null)},p.prototype.getBufferData=function(e,t,n,i){t=r.defaultValue(t,0),n=r.defaultValue(n,0);var a=this._gl,o=s.WebGLConstants.COPY_READ_BUFFER;a.bindBuffer(o,this._buffer),a.getBufferSubData(o,t,e,n,i),a.bindBuffer(o,null)},p.prototype.isDestroyed=function(){return!1},p.prototype.destroy=function(){return this._gl.deleteBuffer(this._buffer),this.context.memorySize-=this.sizeInBytes,R(this)},d.ALPHA_DISABLE=0,d.ALPHA_ADD=1,d.ALPHA_COMBINE=2,d.ALPHA_SUBTRACT=3,d.ALPHA_MULTIPLY=4,d.ALPHA_MAXIMIZED=5,d.ALPHA_ONEONE=6,d.ALPHA_PREMULTIPLIED=7,d.ALPHA_PREMULTIPLIED_PORTERDUFF=8,d.ALPHA_INTERPOLATE=9,d.ALPHA_SCREENMODE=10,d.ALPHA_ONEONE_ONEONE=11,d.ALPHA_ALPHATOCOLOR=12,d.ALPHA_REVERSEONEMINUS=13,d.ALPHA_SRC_DSTONEMINUSSRCALPHA=14,d.ALPHA_ONEONE_ONEZERO=15,d.ALPHA_EXCLUSION=16,d.ALPHA_LAYER_ACCUMULATE=17,d.ALPHA_EQUATION_ADD=0,d.ALPHA_EQUATION_SUBSTRACT=1,d.ALPHA_EQUATION_REVERSE_SUBTRACT=2,d.ALPHA_EQUATION_MAX=3,d.ALPHA_EQUATION_MIN=4,d.ALPHA_EQUATION_DARKEN=5,d.DELAYLOADSTATE_NONE=0,d.DELAYLOADSTATE_LOADED=1,d.DELAYLOADSTATE_LOADING=2,d.DELAYLOADSTATE_NOTLOADED=4,d.NEVER=512,d.ALWAYS=519,d.LESS=513,d.EQUAL=514,d.LEQUAL=515,d.GREATER=516,d.GEQUAL=518,d.NOTEQUAL=517,d.KEEP=7680,d.ZERO=0,d.REPLACE=7681,d.INCR=7682,d.DECR=7683,d.INVERT=5386,d.INCR_WRAP=34055,d.DECR_WRAP=34056,d.FRONT=0,d.BACK=1,d.TEXTURE_CLAMP_ADDRESSMODE=0,d.TEXTURE_WRAP_ADDRESSMODE=1,d.TEXTURE_MIRROR_ADDRESSMODE=2,d.TEXTURE_CREATIONFLAG_STORAGE=1,d.TEXTUREFORMAT_ALPHA=0,d.TEXTUREFORMAT_LUMINANCE=1,d.TEXTUREFORMAT_LUMINANCE_ALPHA=2,d.TEXTUREFORMAT_RGB=4,d.TEXTUREFORMAT_RGBA=5,d.TEXTUREFORMAT_RED=6,d.TEXTUREFORMAT_R=6,d.TEXTUREFORMAT_RG=7,d.TEXTUREFORMAT_RED_INTEGER=8,d.TEXTUREFORMAT_R_INTEGER=8,d.TEXTUREFORMAT_RG_INTEGER=9,d.TEXTUREFORMAT_RGB_INTEGER=10,d.TEXTUREFORMAT_RGBA_INTEGER=11,d.TEXTUREFORMAT_BGRA=12,d.TEXTUREFORMAT_DEPTH24_STENCIL8=13,d.TEXTUREFORMAT_DEPTH32_FLOAT=14,d.TEXTUREFORMAT_DEPTH16=15,d.TEXTUREFORMAT_DEPTH24=16,d.TEXTUREFORMAT_DEPTH24UNORM_STENCIL8=17,d.TEXTUREFORMAT_DEPTH32FLOAT_STENCIL8=18,d.TEXTUREFORMAT_COMPRESSED_RGBA_BPTC_UNORM=36492,d.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_BPTC_UNORM=36493,d.TEXTUREFORMAT_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT=36495,d.TEXTUREFORMAT_COMPRESSED_RGB_BPTC_SIGNED_FLOAT=36494,d.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT5=33779,d.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT=35919,d.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT3=33778,d.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT=35918,d.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT1=33777,d.TEXTUREFORMAT_COMPRESSED_RGB_S3TC_DXT1=33776,d.TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT=35917,d.TEXTUREFORMAT_COMPRESSED_SRGB_S3TC_DXT1_EXT=35916,d.TEXTUREFORMAT_COMPRESSED_RGBA_ASTC_4x4=37808,d.TEXTUREFORMAT_COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR=37840,d.TEXTUREFORMAT_COMPRESSED_RGB_ETC1_WEBGL=36196,d.TEXTUREFORMAT_COMPRESSED_RGB8_ETC2=37492,d.TEXTUREFORMAT_COMPRESSED_SRGB8_ETC2=37493,d.TEXTUREFORMAT_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2=37494,d.TEXTUREFORMAT_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2=37495,d.TEXTUREFORMAT_COMPRESSED_RGBA8_ETC2_EAC=37496,d.TEXTUREFORMAT_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC=37497,d.TEXTURETYPE_UNSIGNED_BYTE=0,d.TEXTURETYPE_UNSIGNED_INT=0,d.TEXTURETYPE_FLOAT=1,d.TEXTURETYPE_HALF_FLOAT=2,d.TEXTURETYPE_BYTE=3,d.TEXTURETYPE_SHORT=4,d.TEXTURETYPE_UNSIGNED_SHORT=5,d.TEXTURETYPE_INT=6,d.TEXTURETYPE_UNSIGNED_INTEGER=7,d.TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4=8,d.TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1=9,d.TEXTURETYPE_UNSIGNED_SHORT_5_6_5=10,d.TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV=11,d.TEXTURETYPE_UNSIGNED_INT_24_8=12,d.TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV=13,d.TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV=14,d.TEXTURETYPE_FLOAT_32_UNSIGNED_INT_24_8_REV=15,d.TEXTURETYPE_UNDEFINED=16,d.TEXTURE_NEAREST_SAMPLINGMODE=1,d.TEXTURE_NEAREST_NEAREST=1,d.TEXTURE_BILINEAR_SAMPLINGMODE=2,d.TEXTURE_LINEAR_LINEAR=2,d.TEXTURE_TRILINEAR_SAMPLINGMODE=3,d.TEXTURE_LINEAR_LINEAR_MIPLINEAR=3,d.TEXTURE_NEAREST_NEAREST_MIPNEAREST=4,d.TEXTURE_NEAREST_LINEAR_MIPNEAREST=5,d.TEXTURE_NEAREST_LINEAR_MIPLINEAR=6,d.TEXTURE_NEAREST_LINEAR=7,d.TEXTURE_NEAREST_NEAREST_MIPLINEAR=8,d.TEXTURE_LINEAR_NEAREST_MIPNEAREST=9,d.TEXTURE_LINEAR_NEAREST_MIPLINEAR=10,d.TEXTURE_LINEAR_LINEAR_MIPNEAREST=11,d.TEXTURE_LINEAR_NEAREST=12,d.TEXTURE_EXPLICIT_MODE=0,d.TEXTURE_SPHERICAL_MODE=1,d.TEXTURE_PLANAR_MODE=2,d.TEXTURE_CUBIC_MODE=3,d.TEXTURE_PROJECTION_MODE=4,d.TEXTURE_SKYBOX_MODE=5,d.TEXTURE_INVCUBIC_MODE=6,d.TEXTURE_EQUIRECTANGULAR_MODE=7,d.TEXTURE_FIXED_EQUIRECTANGULAR_MODE=8,d.TEXTURE_FIXED_EQUIRECTANGULAR_MIRRORED_MODE=9,d.TEXTURE_FILTERING_QUALITY_OFFLINE=4096,d.TEXTURE_FILTERING_QUALITY_HIGH=64,d.TEXTURE_FILTERING_QUALITY_MEDIUM=16,d.TEXTURE_FILTERING_QUALITY_LOW=8,d.SCALEMODE_FLOOR=1,d.SCALEMODE_NEAREST=2,d.SCALEMODE_CEILING=3,d.MATERIAL_TextureDirtyFlag=1,d.MATERIAL_LightDirtyFlag=2,d.MATERIAL_FresnelDirtyFlag=4,d.MATERIAL_AttributesDirtyFlag=8,d.MATERIAL_MiscDirtyFlag=16,d.MATERIAL_PrePassDirtyFlag=32,d.MATERIAL_AllDirtyFlag=63,d.MATERIAL_TriangleFillMode=0,d.MATERIAL_WireFrameFillMode=1,d.MATERIAL_PointFillMode=2,d.MATERIAL_PointListDrawMode=3,d.MATERIAL_LineListDrawMode=4,d.MATERIAL_LineLoopDrawMode=5,d.MATERIAL_LineStripDrawMode=6,d.MATERIAL_TriangleStripDrawMode=7,d.MATERIAL_TriangleFanDrawMode=8,d.MATERIAL_ClockWiseSideOrientation=0,d.MATERIAL_CounterClockWiseSideOrientation=1,d.ACTION_NothingTrigger=0,d.ACTION_OnPickTrigger=1,d.ACTION_OnLeftPickTrigger=2,d.ACTION_OnRightPickTrigger=3,d.ACTION_OnCenterPickTrigger=4,d.ACTION_OnPickDownTrigger=5,d.ACTION_OnDoublePickTrigger=6,d.ACTION_OnPickUpTrigger=7,d.ACTION_OnPickOutTrigger=16,d.ACTION_OnLongPressTrigger=8,d.ACTION_OnPointerOverTrigger=9,d.ACTION_OnPointerOutTrigger=10,d.ACTION_OnEveryFrameTrigger=11,d.ACTION_OnIntersectionEnterTrigger=12,d.ACTION_OnIntersectionExitTrigger=13,d.ACTION_OnKeyDownTrigger=14,d.ACTION_OnKeyUpTrigger=15,d.PARTICLES_BILLBOARDMODE_Y=2,d.PARTICLES_BILLBOARDMODE_ALL=7,d.PARTICLES_BILLBOARDMODE_STRETCHED=8,d.MESHES_CULLINGSTRATEGY_STANDARD=0,d.MESHES_CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY=1,d.MESHES_CULLINGSTRATEGY_OPTIMISTIC_INCLUSION=2,d.MESHES_CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY=3,d.SCENELOADER_NO_LOGGING=0,d.SCENELOADER_MINIMAL_LOGGING=1,d.SCENELOADER_SUMMARY_LOGGING=2,d.SCENELOADER_DETAILED_LOGGING=3,d.PREPASS_IRRADIANCE_TEXTURE_TYPE=0,d.PREPASS_POSITION_TEXTURE_TYPE=1,d.PREPASS_VELOCITY_TEXTURE_TYPE=2,d.PREPASS_REFLECTIVITY_TEXTURE_TYPE=3,d.PREPASS_COLOR_TEXTURE_TYPE=4,d.PREPASS_DEPTH_TEXTURE_TYPE=5,d.PREPASS_NORMAL_TEXTURE_TYPE=6,d.PREPASS_ALBEDO_SQRT_TEXTURE_TYPE=7,d.BUFFER_CREATIONFLAG_READ=1,d.BUFFER_CREATIONFLAG_WRITE=2,d.BUFFER_CREATIONFLAG_READWRITE=3,d.BUFFER_CREATIONFLAG_UNIFORM=4,d.BUFFER_CREATIONFLAG_VERTEX=8,d.BUFFER_CREATIONFLAG_INDEX=16,d.BUFFER_CREATIONFLAG_STORAGE=32,d.RENDERPASS_MAIN=0,d.INPUT_ALT_KEY=18,d.INPUT_CTRL_KEY=17,d.INPUT_META_KEY1=91,d.INPUT_META_KEY2=92,d.INPUT_META_KEY3=93,d.INPUT_SHIFT_KEY=16,d.SNAPSHOTRENDERING_STANDARD=0,d.SNAPSHOTRENDERING_FAST=1,d.PERSPECTIVE_CAMERA=0,d.ORTHOGRAPHIC_CAMERA=1,d.FOVMODE_VERTICAL_FIXED=0,d.FOVMODE_HORIZONTAL_FIXED=1,d.RIG_MODE_NONE=0,d.RIG_MODE_STEREOSCOPIC_ANAGLYPH=10,d.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL=11,d.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED=12,d.RIG_MODE_STEREOSCOPIC_OVERUNDER=13,d.RIG_MODE_STEREOSCOPIC_INTERLACED=14,d.RIG_MODE_VR=20,d.RIG_MODE_WEBVR=21,d.RIG_MODE_CUSTOM=22,d.MAX_SUPPORTED_UV_SETS=6,d.GL_ALPHA_EQUATION_ADD=32774,d.GL_ALPHA_EQUATION_MIN=32775,d.GL_ALPHA_EQUATION_MAX=32776,d.GL_ALPHA_EQUATION_SUBTRACT=32778,d.GL_ALPHA_EQUATION_REVERSE_SUBTRACT=32779,d.GL_ALPHA_FUNCTION_SRC=768,d.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_COLOR=769,d.GL_ALPHA_FUNCTION_SRC_ALPHA=770,d.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA=771,d.GL_ALPHA_FUNCTION_DST_ALPHA=772,d.GL_ALPHA_FUNCTION_ONE_MINUS_DST_ALPHA=773,d.GL_ALPHA_FUNCTION_DST_COLOR=774,d.GL_ALPHA_FUNCTION_ONE_MINUS_DST_COLOR=775,d.GL_ALPHA_FUNCTION_SRC_ALPHA_SATURATED=776,d.GL_ALPHA_FUNCTION_CONSTANT_COLOR=32769,d.GL_ALPHA_FUNCTION_ONE_MINUS_CONSTANT_COLOR=32770,d.GL_ALPHA_FUNCTION_CONSTANT_ALPHA=32771,d.GL_ALPHA_FUNCTION_ONE_MINUS_CONSTANT_ALPHA=32772,d.SnippetUrl="https://snippet.babylonjs.com",Object.defineProperty(I.prototype,"underlyingResource",{get:function(){return null},enumerable:!1,configurable:!0}),I._Counter=0,O.prototype.createVertexBuffer=function(e,t,r,n,i,a,s){void 0===a&&(a=!1);var o=a?t:t*Float32Array.BYTES_PER_ELEMENT,_=n?a?n:n*Float32Array.BYTES_PER_ELEMENT:this.byteStride;return new h(this._engine,this,e,this._updatable,!0,_,void 0===i?this._instanced:i,o,r,void 0,void 0,!0,this._divisor||s)},O.prototype.isUpdatable=function(){return this._updatable},O.prototype.getData=function(){return this._data},O.prototype.getBuffer=function(){return this._buffer},O.prototype.getStrideSize=function(){return this.byteStride/Float32Array.BYTES_PER_ELEMENT},O.prototype.create=function(e){void 0===e&&(e=null),!e&&this._buffer||(e=e||this._data)&&(this._buffer?this._updatable&&(this._engine.updateDynamicVertexBuffer(this._buffer,e),this._data=e):this._updatable?(this._buffer=this._engine.createDynamicVertexBuffer(e),this._data=e):this._buffer=this._engine.createVertexBuffer(e))},O.prototype._rebuild=function(){this._buffer=null,this.create(this._data)},O.prototype.update=function(e){this.create(e)},O.prototype.updateDirectly=function(e,t,r,n){void 0===n&&(n=!1),this._buffer&&this._updatable&&(this._engine.updateDynamicVertexBuffer(this._buffer,e,n?t:t*Float32Array.BYTES_PER_ELEMENT,r?r*this.byteStride:void 0),this._data=0===t&&void 0===r?e:null)},O.prototype._increaseReferences=function(){this._buffer&&(this._isAlreadyOwned?this._buffer.references++:this._isAlreadyOwned=!0)},O.prototype.dispose=function(){this._buffer&&this._engine._releaseBuffer(this._buffer)&&(this._buffer=null,this._data=null)},Object.defineProperty(h.prototype,"instanceDivisor",{get:function(){return this._instanceDivisor},set:function(e){this._instanceDivisor=e,this._instanced=0!=e,this._computeHashCode()},enumerable:!1,configurable:!0}),h.prototype._computeHashCode=function(){this.hashCode=(this.type-5120<<0)+((this.normalized?1:0)<<3)+(this._size<<4)+((this._instanced?1:0)<<6)+(this.byteStride<<12)},h.prototype._rebuild=function(){this._buffer&&this._buffer._rebuild()},h.prototype.getKind=function(){return this._kind},h.prototype.isUpdatable=function(){return this._buffer.isUpdatable()},h.prototype.getData=function(){return this._buffer.getData()},h.prototype.getFloatData=function(e,t){var r=this.getData();if(!r)return null;var n=this.getSize()*h.GetTypeByteLength(this.type),i=e*this.getSize();if(this.type!==h.FLOAT||this.byteStride!==n){var a=new Float32Array(i);return this.forEach(i,(function(e,t){return a[t]=e})),a}if(!(r instanceof Array||r instanceof Float32Array)||0!==this.byteOffset||r.length!==i){if(r instanceof Array){var s=this.byteOffset/4;return r.slice(s,s+i)}if(r instanceof ArrayBuffer)return new Float32Array(r,this.byteOffset,i);s=r.byteOffset+this.byteOffset;if(t){var o=new Float32Array(i),_=new Float32Array(r.buffer,s,i);return o.set(_),o}var E=s%4;return E&&(s=Math.max(0,s-E)),new Float32Array(r.buffer,s,i)}return t?r.slice():r},h.prototype.getBuffer=function(){return this._buffer.getBuffer()},h.prototype.getStrideSize=function(){return this.byteStride/h.GetTypeByteLength(this.type)},h.prototype.getOffset=function(){return this.byteOffset/h.GetTypeByteLength(this.type)},h.prototype.getSize=function(e){return void 0===e&&(e=!1),e?this._size*h.GetTypeByteLength(this.type):this._size},h.prototype.getIsInstanced=function(){return this._instanced},h.prototype.getInstanceDivisor=function(){return this._instanceDivisor},h.prototype.create=function(e){this._buffer.create(e)},h.prototype.update=function(e){this._buffer.update(e)},h.prototype.updateDirectly=function(e,t,r){void 0===r&&(r=!1),this._buffer.updateDirectly(e,t,void 0,r)},h.prototype.dispose=function(){this._ownsBuffer&&this._buffer.dispose()},h.prototype.forEach=function(e,t){h.ForEach(this._buffer.getData(),this.byteOffset,this.byteStride,this._size,this.type,e,this.normalized,t)},h.DeduceStride=function(e){switch(e){case h.UVKind:case h.UV2Kind:case h.UV3Kind:case h.UV4Kind:case h.UV5Kind:case h.UV6Kind:return 2;case h.NormalKind:case h.PositionKind:return 3;case h.ColorKind:case h.MatricesIndicesKind:case h.MatricesIndicesExtraKind:case h.MatricesWeightsKind:case h.MatricesWeightsExtraKind:case h.TangentKind:return 4;default:throw new Error("Invalid kind '"+e+"'")}},h.GetTypeByteLength=function(e){switch(e){case h.BYTE:case h.UNSIGNED_BYTE:return 1;case h.SHORT:case h.UNSIGNED_SHORT:return 2;case h.INT:case h.UNSIGNED_INT:case h.FLOAT:return 4;default:throw new Error("Invalid type '".concat(e,"'"))}},h.ForEach=function(e,t,r,n,i,a,s,o){if(e instanceof Array)for(var _=t/4,E=r/4,f=0;f<a;f+=n){for(var T=0;T<n;T++)o(e[_+T],f+T);_+=E}else{var u=e instanceof ArrayBuffer?new DataView(e):new DataView(e.buffer,e.byteOffset,e.byteLength),A=h.GetTypeByteLength(i);for(f=0;f<a;f+=n){var c=t;for(T=0;T<n;T++){o(h._GetFloatValue(u,i,c,s),f+T),c+=A}t+=r}}},h._GetFloatValue=function(e,t,r,n){switch(t){case h.BYTE:var i=e.getInt8(r);return n&&(i=Math.max(i/127,-1)),i;case h.UNSIGNED_BYTE:i=e.getUint8(r);return n&&(i/=255),i;case h.SHORT:i=e.getInt16(r,!0);return n&&(i=Math.max(i/32767,-1)),i;case h.UNSIGNED_SHORT:i=e.getUint16(r,!0);return n&&(i/=65535),i;case h.INT:return e.getInt32(r,!0);case h.UNSIGNED_INT:return e.getUint32(r,!0);case h.FLOAT:return e.getFloat32(r,!0);default:throw new Error("Invalid component type ".concat(t))}},h._Counter=0,h.BYTE=5120,h.UNSIGNED_BYTE=5121,h.SHORT=5122,h.UNSIGNED_SHORT=5123,h.INT=5124,h.UNSIGNED_INT=5125,h.FLOAT=5126,h.PositionKind="position",h.NormalKind="normal",h.TangentKind="tangent",h.UVKind="uv",h.UV2Kind="uv2",h.UV3Kind="uv3",h.UV4Kind="uv4",h.UV5Kind="uv5",h.UV6Kind="uv6",h.ColorKind="color",h.ColorInstanceKind="instanceColor",h.MatricesIndicesKind="matricesIndices",h.MatricesWeightsKind="matricesWeights",h.MatricesIndicesExtraKind="matricesIndicesExtra",h.MatricesWeightsExtraKind="matricesWeightsExtra",S.prototype._create=function(e,t){this._bufferSize=e,this._creationFlags=t,this._buffer=this._engine.createStorageBuffer(e,t)},S.prototype._rebuild=function(){this._create(this._bufferSize,this._creationFlags)},S.prototype.getBuffer=function(){return this._buffer},S.prototype.update=function(e,t,r){this._buffer&&this._engine.updateStorageBuffer(this._buffer,e,t,r)},S.prototype.read=function(e,t,r){return this._engine.readFromStorageBuffer(this._buffer,e,t,r)},S.prototype.dispose=function(){var e=this._engine._storageBuffers,t=e.indexOf(this);-1!==t&&(e[t]=e[e.length-1],e.pop()),this._engine._releaseBuffer(this._buffer),this._buffer=null},Object.defineProperties(N.prototype,{sizeInBytes:{get:function(){return this._sizeInBytes}},usage:{get:function(){return this._usage}},dataBuffer:{get:function(){return this._dataBuffer}}}),N.prototype._getBuffer=function(){return console.log("BufferGPU.prototype._getBuffer"),this._dataBuffer},N.prototype.copyFromArrayView=function(e,t){this._dataBuffer.updateDirectly(e,t,null,!0)},N.prototype.copyFromBuffer=function(e,t,r,n){console.log("BufferGPU.prototype.copyFromBuffer")},N.prototype.getBufferData=function(e,t,r,n){console.log("BufferGPU.prototype.getBufferData")},N.prototype.isDestroyed=function(){return!1},N.prototype.destroy=function(){return this._bufferTarget!==s.WebGLConstants.ELEMENT_ARRAY_BUFFER?this._dataBuffer.dispose():this.context._engine._releaseBuffer(this._dataBuffer),this.context.memorySize-=this.sizeInBytes,R(this)},D.createIndexBuffer=function(e){var t=e.context,r=e.indexDatatype,n=a.IndexDatatype.getSizeInBytes(r),i=new D({context:t,bufferTarget:s.WebGLConstants.ELEMENT_ARRAY_BUFFER,typedArray:e.typedArray,sizeInBytes:e.sizeInBytes,usage:e.usage,indexDatatype:r}),o=i.sizeInBytes/n;return Object.defineProperties(i,{indexDatatype:{get:function(){return r}},bytesPerIndex:{get:function(){return n}},numberOfIndices:{get:function(){return o}}}),i},Object.defineProperties(D.prototype,{sizeInBytes:{get:function(){return this._inner.sizeInBytes}},usage:{get:function(){return this._inner.usage}}}),D.prototype._getBuffer=function(){return this._inner._getBuffer()},D.prototype.copyFromArrayView=function(e,t){this._inner.copyFromArrayView(e,t)},D.prototype.copyFromBuffer=function(e,t,r,n){this._inner.copyFromBuffer(e,t,r,n)},D.prototype.getBufferData=function(e,t,r,n){this._inner.getBufferData(e,t,r,n)},D.prototype.isDestroyed=function(){return!1},D.prototype.destroy=function(){return this._inner.destroy(),R(this)},C.computeNeighbors=function(e,t){for(var r=e.length/3,n=new Uint32Array(t+1),i=new Uint32Array(t+1),a=function(e,t){e<t?n[e+1]++:i[t+1]++},s=0;s<r;s++){var o=e[3*s],_=e[3*s+1],E=e[3*s+2];a(o,_),a(_,E),a(E,o)}for(s=_=o=0;s<t;s++)E=n[s+1],a=i[s+1],n[s+1]=o,i[s+1]=_,o+=E,_+=a;var f=new Uint32Array(6*r),T=n[t];for(a=function(e,t,r){if(e<t){var a=n[e+1]++;f[2*a]=t,f[2*a+1]=r}else a=i[t+1]++,f[2*T+2*a]=e,f[2*T+2*a+1]=r},s=0;s<r;s++)o=e[3*s],_=e[3*s+1],E=e[3*s+2],a(o,_,s),a(_,E,s),a(E,o,s);for(o=function(e,t){var r=2*e;for(e=t-e,t=1;t<e;t++){for(var n=f[r+2*t],i=f[r+2*t+1],a=t-1;0<=a&&f[r+2*a]>n;a--)f[r+2*a+2]=f[r+2*a],f[r+2*a+3]=f[r+2*a+1];f[r+2*a+2]=n,f[r+2*a+3]=i}},s=0;s<t;s++)o(n[s],n[s+1]),o(T+i[s],T+i[s+1]);var u=new Int32Array(3*r),A=function(t,r){return t===e[3*r]?0:t===e[3*r+1]?1:t===e[3*r+2]?2:-1};for(r=function(e,t){e=A(e,t),u[3*t+e]=-1},o=function(e,t,r,n){e=A(e,t),u[3*t+e]=n,r=A(r,n),u[3*n+r]=t},s=0;s<t;s++){_=n[s],E=n[s+1],a=i[s];for(var c=i[s+1];_<E&&a<c;){var R=f[2*_],y=f[2*T+2*a];R===y?(o(s,f[2*_+1],y,f[2*T+2*a+1]),_++,a++):R<y?(r(s,f[2*_+1]),_++):(r(y,f[2*T+2*a+1]),a++)}for(;_<E;)r(s,f[2*_+1]),_++;for(;a<c;)r(y=f[2*T+2*a],f[2*T+2*a+1]),a++}return u};var L=null;function l(){}function U(e){return e*Math.PI/180}C.deduplicate=function(e,t,r,n,i){void 0===r&&(r=0),void 0===n&&(n=0),void 0===i&&(i=e.byteLength/(4*t)),e=new Uint32Array(e,n,i*t),n=new Uint32Array(i);var a=Math.floor(1.1*i)+1;(null==L||L.length<2*a)&&(L=new Uint32Array(function(e){--e;for(var t=1;32>t;t<<=1)e|=e>>t;return e+1}(2*a)));for(var s=0;s<2*a;s++)L[s]=0;var o=0,_=0!==r?Math.ceil(7.84*1.96/(r*r)*r*(1-r)):i;for(s=0;s<i;s++){if(s===_){if((f=1-o/s)+1.96*Math.sqrt(f*(1-f)/s)<r)return null;_*=2}for(var E,f=s*t,T=E=0;T<t;T++)E=(E=e[f+T]+E|0)+(E<<11)+(E>>>2)|0;T=(E>>>=0)%a;for(var u=o;0!==L[2*T+1];){if(L[2*T]===E){var A=L[2*T+1]-1,c=A*t;e:{for(var R=0;R<t;R++)if(e[f+R]!==e[c+R]){c=!1;break e}c=!0}if(c){u=n[A];break}}++T>=a&&(T-=a)}u===o&&(L[2*T]=E,L[2*T+1]=s+1,o++),n[s]=u}if(0!==r&&1-o/i<r)return null;for(r=new Uint32Array(t*o),s=o=0;s<i;s++)if(n[s]===o){for(a=e,_=s*t,f=r,E=o*t,T=t,u=0;u<T;u++)f[E+u]=a[_+u];o++}return{buffer:r.buffer,indices:n,uniqueCount:o}};var P=U(4),g=U(35),B=Math.cos(g),b=Math.cos(P);var M={position0:new n.Cartesian3,position1:new n.Cartesian3,faceNormal0:new n.Cartesian3,faceNormal1:new n.Cartesian3,cosAngle:0},F=new n.Cartesian3,v=new n.Cartesian3;function G(e,t){var r,i=(r=e.cosAngle,Math.acos(1<r?1:-1>r?-1:r));return function(e,t,r){var n=r.x-t.x,i=r.y-t.y;(r=n*n+i*i+(t=r.z-t.z)*t)?(r=1/Math.sqrt(r),e.x=n*r,e.y=i*r,e.z=t*r):(e.x=0,e.y=0,e.z=0)}(v,e.position1,e.position0),n.Cartesian3.cross(e.faceNormal0,e.faceNormal1,F),i*(0<n.Cartesian3.dot(F,v)?-1:1)>t}var x=new n.Cartesian3,m=new n.Cartesian3,X=new n.Cartesian3;function H(e){var t=e.x*e.x+e.y*e.y+e.z*e.z;t>0&&(t=1/Math.sqrt(t),e.x*=t,e.y*=t,e.z*=t)}function z(e){}function w(e){if(r.defined(e.cachedSidenessVertexBuffer))return e.cachedSidenessVertexBuffer;var t=new Float32Array(8),n=0;return t[n++]=0,t[n++]=0,t[n++]=0,t[n++]=1,t[n++]=1,t[n++]=1,t[n++]=1,t[n++]=0,e.cachedSidenessVertexBuffer=D.createVertexBuffer({context:e,typedArray:t,usage:y.STATIC_DRAW}),e.cachedSidenessVertexBuffer.vertexArrayDestroyable=!1,e.cachedSidenessVertexBuffer}function V(e,t){for(var r,i,a,s=t.componentsPerAttribute,o=e.vertCompressConstant,_=new n.Cartesian3(e.minVerticesValue.x,e.minVerticesValue.y,e.minVerticesValue.z),E=new Uint16Array(t.typedArray.buffer,t.typedArray.byteOffset,t.typedArray.byteLength/2),f=new Float32Array(3*e.verticesCount),T=0;T<e.verticesCount;T++)r=E[s*T]*o+_.x,i=E[s*T+1]*o+_.y,a=E[s*T+2]*o+_.z,f[3*T]=r,f[3*T+1]=i,f[3*T+2]=a;return f}l.extractEdges=function(e){var t=e.vertices,r=e.dim,i=M,a=i.position0,s=i.position1,o=i.faceNormal0,_=i.faceNormal1,E=function(e){for(var t=e.faces.length/3,r=e.vertices,i=e.dim,a=e.faces,s=new Float32Array(3*t),o=0;o<t;o++){var _=a[3*o+0],E=a[3*o+1],f=a[3*o+2];x.x=r[i*_],x.y=r[i*_+1],x.z=r[i*_+2],m.x=r[i*E],m.y=r[i*E+1],m.z=r[i*E+2],X.x=r[i*f],X.y=r[i*f+1],X.z=r[i*f+2],n.Cartesian3.subtract(m,x,m),n.Cartesian3.subtract(X,x,X),n.Cartesian3.cross(m,X,x),H(x),s[3*o+0]=x.x,s[3*o+1]=x.y,s[3*o+2]=x.z}return s}(e),f=function(e){var t=e.faces.length/3,r=e.faces,n=e.neighbors,i=0,a=0;for(a=0;a<t;a++){var s=n[3*a+0],o=n[3*a+1],_=n[3*a+2],E=r[3*a+0],f=r[3*a+1],T=r[3*a+2];i+=-1===s||E<f?1:0,i+=-1===o||f<T?1:0,i+=-1===_||T<E?1:0}var u=new Int32Array(4*i),A=0;for(a=0;a<t;a++)s=n[3*a+0],o=n[3*a+1],_=n[3*a+2],E=r[3*a+0],f=r[3*a+1],T=r[3*a+2],(-1===s||E<f)&&(u[A++]=E,u[A++]=f,u[A++]=a,u[A++]=s),(-1===o||f<T)&&(u[A++]=f,u[A++]=T,u[A++]=a,u[A++]=o),(-1===_||T<E)&&(u[A++]=T,u[A++]=E,u[A++]=a,u[A++]=_);return u}(e),T=f.length/4,u=new Float32Array(9*T),A=0,c=new Float32Array(12*T),R=0,y=0,p=0,d=function(e,t){0===t&&(t=e,e=0);for(var r=Array(t-e),n=e;n<t;n++)r[n-e]=n;return r}(0,T),I=new Float32Array(T);I.forEach((function(e,i,o){var _=f[4*i+0],E=f[4*i+1];a.x=t[_*r],a.y=t[_*r+1],a.z=t[_*r+2],s.x=t[E*r],s.y=t[E*r+1],s.z=t[E*r+2],o[i]=n.Cartesian3.distance(a,s)})),d.sort((function(e,t){return I[t]-I[e]}));for(var O=[],h=[],S=0;S<T;S++){var N=d[S],D=I[N],C=f[4*N+0],L=f[4*N+1],l=f[4*N+2],U=f[4*N+3],g=-1===U;if(a.x=t[C*r],a.y=t[C*r+1],a.z=t[C*r+2],s.x=t[L*r],s.y=t[L*r+1],s.z=t[L*r+2],g)o.x=E[3*l],o.y=E[3*l+1],o.z=E[3*l+2],_.x=o.x,_.y=o.y,_.z=o.z,i.cosAngle=n.Cartesian3.dot(o,_);else if(o.x=E[3*l],o.y=E[3*l+1],o.z=E[3*l+2],_.x=E[3*U],_.y=E[3*U+1],_.z=E[3*U+2],i.cosAngle=n.Cartesian3.dot(o,_),i.cosAngle>b)continue;y+=D,p++,g||i.cosAngle<B?(u[A++]=i.position0.x,u[A++]=i.position0.y,u[A++]=i.position0.z,u[A++]=i.position1.x,u[A++]=i.position1.y,u[A++]=i.position1.z,u[A++]=i.faceNormal0.x,u[A++]=i.faceNormal0.y,u[A++]=i.faceNormal0.z,O.push(D)):G(i,P)&&(c[R++]=i.position0.x,c[R++]=i.position0.y,c[R++]=i.position0.z,c[R++]=i.position1.x,c[R++]=i.position1.y,c[R++]=i.position1.z,c[R++]=i.faceNormal0.x,c[R++]=i.faceNormal0.y,c[R++]=i.faceNormal0.z,c[R++]=i.faceNormal1.x,c[R++]=i.faceNormal1.y,c[R++]=i.faceNormal1.z,h.push(D))}u=u.slice(0,A),c=c.slice(0,R);var F=y/p,v=O.length,z=h.length;return{regular:{instancesData:u,instanceCount:v,edgeLength:v*F},silhouette:{instancesData:c,instanceCount:z,edgeLength:z*F},averageEdgeLength:F}},z.RegularInstanceStride=12,z.SilhouetteInstanceStride=15,z.createEdgeData=function(e,t,n){if(0==t.length)return null;var i,a=t[0];i=0===a.indexType?new Uint16Array(a.indicesTypedArray.buffer,a.indicesTypedArray.byteOffset,a.indicesTypedArray.byteLength/2):new Uint32Array(a.indicesTypedArray.buffer,a.indicesTypedArray.byteOffset,a.indicesTypedArray.byteLength/4);var s=z.extractEdgeInformation(e,!1,i),o=l.extractEdges(s);return r.defined(n)&&(r.defined(o.regular.instancesData)&&n.push(o.regular.instancesData.buffer),r.defined(o.silhouette.instancesData)&&n.push(o.silhouette.instancesData.buffer)),o},z.createIndexBuffer=function(e){return r.defined(e.cachedSidenessIndexBuffer)||(e.cachedSidenessIndexBuffer=D.createIndexBuffer({context:e,typedArray:(t=new Uint16Array(6),n=0,t[n++]=2,t[n++]=1,t[n++]=0,t[n++]=3,t[n++]=2,t[n++]=0,t),usage:y.STATIC_DRAW,indexDatatype:a.IndexDatatype.UNSIGNED_SHORT}),e.cachedSidenessIndexBuffer.vertexArrayDestroyable=!1),e.cachedSidenessIndexBuffer;var t,n},z.createRegularEdgeAttributes=function(e,t,n){if(r.defined(t.instancesData)&&0!=t.instancesData.length){var i={},a=[];t.attributeLocations=i,t.attributes=a;var s=D.createVertexBuffer({context:e,typedArray:t.instancesData,usage:y.STATIC_DRAW});t.instancesData=null;var o=_.ComponentDatatype.getSizeInBytes(_.ComponentDatatype.FLOAT),E=w(e),f=0;i.aSideness=f++,a.push({index:i.aSideness,vertexBuffer:E,componentsPerAttribute:2,componentDatatype:_.ComponentDatatype.FLOAT,offsetInBytes:0,strideInBytes:2*_.ComponentDatatype.getSizeInBytes(_.ComponentDatatype.FLOAT),normalize:!1});var T=n||z.RegularInstanceStride,u=0;i.aPosition0=f++,a.push({index:i.aPosition0,vertexBuffer:s,componentsPerAttribute:3,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!1,offsetInBytes:o*u,strideInBytes:o*T,instanceDivisor:1}),u+=3,i.aPosition1=f++,a.push({index:i.aPosition1,vertexBuffer:s,componentsPerAttribute:3,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!1,offsetInBytes:o*u,strideInBytes:o*T,instanceDivisor:1}),u+=3,i.aNormal=f++,a.push({index:i.aNormal,vertexBuffer:s,componentsPerAttribute:3,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:o*u,strideInBytes:o*T,instanceDivisor:1}),u+=3,i.batchId=f++,a.push({index:i.batchId,vertexBuffer:s,componentsPerAttribute:1,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:o*u,strideInBytes:o*T,instanceDivisor:1}),u+=1,i.aVariantStroke=f++,a.push({index:i.aVariantStroke,vertexBuffer:s,componentsPerAttribute:1,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:o*u,strideInBytes:o*T,instanceDivisor:1}),u+=1,i.aVariantExtension=f++,a.push({index:i.aVariantExtension,vertexBuffer:s,componentsPerAttribute:1,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:o*u,strideInBytes:o*T,instanceDivisor:1}),u+=1}},z.createSilhouetteEdgeAttributes=function(e,t){if(r.defined(t.instancesData)&&0!=t.instancesData.length){var n={},i=[];t.attributeLocations=n,t.attributes=i;var a=D.createVertexBuffer({context:e,typedArray:t.instancesData,usage:y.STATIC_DRAW});t.instancesData=null;var s=_.ComponentDatatype.getSizeInBytes(_.ComponentDatatype.FLOAT),o=0;n.aSideness=o++,i.push({index:n.aSideness,vertexBuffer:w(e),componentsPerAttribute:2,componentDatatype:_.ComponentDatatype.FLOAT,offsetInBytes:0,strideInBytes:2*s,normalize:!1});var E=z.SilhouetteInstanceStride,f=0;n.aPosition0=o++,i.push({index:n.aPosition0,vertexBuffer:a,componentsPerAttribute:3,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!1,offsetInBytes:s*f,strideInBytes:s*E,instanceDivisor:1}),f+=3,n.aPosition1=o++,i.push({index:n.aPosition1,vertexBuffer:a,componentsPerAttribute:3,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!1,offsetInBytes:s*f,strideInBytes:s*E,instanceDivisor:1}),f+=3,n.aNormalA=o++,i.push({index:n.aNormalA,vertexBuffer:a,componentsPerAttribute:3,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:s*f,strideInBytes:s*E,instanceDivisor:1}),f+=3,n.aNormalB=o++,i.push({index:n.aNormalB,vertexBuffer:a,componentsPerAttribute:3,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:s*f,strideInBytes:s*E,instanceDivisor:1}),f+=3,n.batchId=o++,i.push({index:n.batchId,vertexBuffer:a,componentsPerAttribute:1,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:s*f,strideInBytes:s*E,instanceDivisor:1}),f+=1,n.aVariantStroke=o++,i.push({index:n.aVariantStroke,vertexBuffer:a,componentsPerAttribute:1,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:s*f,strideInBytes:s*E,instanceDivisor:1}),f+=1,n.aVariantExtension=o++,i.push({index:n.aVariantExtension,vertexBuffer:a,componentsPerAttribute:1,componentDatatype:_.ComponentDatatype.FLOAT,normalize:!0,offsetInBytes:s*f,strideInBytes:s*E,instanceDivisor:1}),f+=1}},z.extractEdgeInformation=function(e,t,n){var i,a=e.attrLocation.aPosition,s=e.vertexAttributes[a],o=r.defined(e.nCompressOptions)&&(e.nCompressOptions&A.SVC_Vertex)===A.SVC_Vertex,_=s.componentsPerAttribute;o?(_=3,i=V(e,s)):i=new Float32Array(s.typedArray.buffer,s.typedArray.byteOffset,s.typedArray.byteLength/4);var E=i.length/_;if(t&&n)return{faces:n,neighbors:C.computeNeighbors(n,E),vertices:i,dim:_};var f,T=s.typedArray.buffer;f=o?i.buffer:T.slice(s.typedArray.byteOffset,s.typedArray.byteOffset+s.typedArray.byteLength);var u=C.deduplicate(f,_),c=z.selectIndexData(u.indices,n);return{faces:c,neighbors:C.computeNeighbors(c,u.uniqueCount),vertices:new Float32Array(u.buffer),dim:_}},z.selectIndexData=function(e,t){if(t){t=t.slice();for(var r=0;r<t.length;r++)t[r]=e[t[r]];return t}return e};var Y=new n.Cartesian3,W=new n.Cartesian3,K=new n.Cartesian3,k=new n.Cartesian3,Q=new n.Cartesian3,q=new n.Cartesian3,j=new n.Cartesian3,Z=new n.Cartesian3;function J(e,t){function n(e,t,r){var n=48217*e%2147483647,i=t+n/2147483647*(r-=t);return{seed:n,result:Math.round(i)}}var i=function(e,t){var r=new Float32Array(6),n=new Uint32Array(r.buffer),i=new Uint32Array(1);r[0]=e.x,r[1]=e.y,r[2]=e.z,r[3]=t.x,r[4]=t.y,r[5]=t.z,i[0]=5381;for(var a=0;a<n.length;a++)i[0]=31*i[0]+n[a];return i[0]}(e,t);r.defined(i)||(i=2147483647*Math.random());var a=n(i,0,255);i=a.seed,a.result,i=(a=n(i,0,5)).seed;var s=a.result;a=function(e){var t=48217*e%2147483647;return{seed:t,result:t/2147483646}}(i),i=a.seed;var o=a.result;return o=-(1-Math.min(o/.7,1))+Math.max(0,o-.7)/(1-.7),{variantStroke:s,variantExtension:o=255*(Math.abs(o)**1.2*(0>o?-1:1)*.5+.5)}}z.createEdgeDataByIndices=function(e,t){var i,a,s=e.attrLocation.aPosition,o=e.vertexAttributes[s],_=r.defined(e.nCompressOptions)&&(e.nCompressOptions&A.SVC_Vertex)===A.SVC_Vertex,E=o.componentsPerAttribute;_?(E=3,i=V(e,o)):i=new Float32Array(o.typedArray.buffer,o.typedArray.byteOffset,o.typedArray.byteLength/4);for(var f=[],T=[],u=(a=0===t.indexType?new Uint16Array(t.indicesTypedArray.buffer,t.indicesTypedArray.byteOffset,t.indicesTypedArray.byteLength/2):new Uint32Array(t.indicesTypedArray.buffer,t.indicesTypedArray.byteOffset,t.indicesTypedArray.byteLength/4)).length,c=0,R=0,y=4*Math.floor(u/4);R<y;R+=4){var p=a[R],d=a[R+1],I=a[R+2],O=a[R+3];if(Y.x=i[E*p],Y.y=i[E*p+1],Y.z=i[E*p+2],W.x=i[E*d],W.y=i[E*d+1],W.z=i[E*d+2],K.x=i[E*I],K.y=i[E*I+1],K.z=i[E*I+2],k.x=i[E*O],k.y=i[E*O+1],k.z=i[E*O+2],!(n.Cartesian3.equals(W,K)||n.Cartesian3.equals(W,k)||n.Cartesian3.equals(W,Y)||n.Cartesian3.equals(K,Y)||n.Cartesian3.equals(k,Y))){if(I===O){if(n.Cartesian3.subtract(W,Y,Q),n.Cartesian3.subtract(K,Y,q),n.Cartesian3.cross(Q,q,Q),n.Cartesian3.equals(Q,n.Cartesian3.ZERO))continue;n.Cartesian3.normalize(Q,Q),f.push(Y.x),f.push(Y.y),f.push(Y.z),f.push(W.x),f.push(W.y),f.push(W.z),f.push(Q.x),f.push(Q.y),f.push(Q.z),f.push(p);var h=(N=J(Y,W)).variantStroke,S=N.variantExtension;f.push(h),f.push(S)}else{if(n.Cartesian3.subtract(W,Y,Q),n.Cartesian3.subtract(K,Y,q),n.Cartesian3.cross(Q,q,Q),n.Cartesian3.equals(Q,n.Cartesian3.ZERO))continue;if(n.Cartesian3.normalize(Q,Q),n.Cartesian3.subtract(W,Y,j),n.Cartesian3.subtract(k,Y,Z),n.Cartesian3.cross(Z,j,j),n.Cartesian3.equals(j,n.Cartesian3.ZERO))continue;n.Cartesian3.normalize(j,j),T.push(Y.x),T.push(Y.y),T.push(Y.z),T.push(W.x),T.push(W.y),T.push(W.z),T.push(Q.x),T.push(Q.y),T.push(Q.z),T.push(j.x),T.push(j.y),T.push(j.z),T.push(p);var N;h=(N=J(Y,W)).variantStroke,S=N.variantExtension;T.push(h),T.push(S)}c+=n.Cartesian3.distance(Y,W)}}var D=c/(u/4),C=f.length/z.RegularInstanceStride,L=T.length/z.SilhouetteInstanceStride;return{regular:{instancesData:new Float32Array(f),instanceCount:C,edgeLength:C*D},silhouette:{instancesData:new Float32Array(T),instanceCount:L,edgeLength:L},averageEdgeLength:D}},e.DXTTextureDecode=T,e.S3MCompressType=u,e.S3MEdgeProcessor=z,e.VertexCompressOption=A}));