define(["./PixelFormat-4f95fc60","./when-b60132fc","./WebGLConstants-aba9fc67","./createTaskProcessorWorker"],(function(e,r,t,n){"use strict";
/**
     * @license
     *
     * Copyright (c) 2014, Brandon Jones. All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without modification,
     * are permitted provided that the following conditions are met:
     *
     *  * Redistributions of source code must retain the above copyright notice, this
     *  list of conditions and the following disclaimer.
     *  * Redistributions in binary form must reproduce the above copyright notice,
     *  this list of conditions and the following disclaimer in the documentation
     *  and/or other materials provided with the distribution.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
     * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
     * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
     * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
     * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
     * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
     * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
     * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */var f,a,s=1,i=2,o={};o[0]=e.PixelFormat.RGB_DXT1,o[s]=e.PixelFormat.RGBA_DXT3,o[i]=e.PixelFormat.RGBA_DXT5;var u,d=0;function c(n,s){var i=n.data,c=i.byteLength,l=new Uint8Array(i),_=u._malloc(c);!function(e,r,t,n){var f,a=t/4,s=n%4,i=new Uint32Array(e.buffer,0,(n-s)/4),o=new Uint32Array(r.buffer);for(f=0;f<i.length;f++)o[a+f]=i[f];for(f=n-s;f<n;f++)r[t+f]=e[f]}(l,u.HEAPU8,_,c);var m=u._crn_get_dxt_format(_,c),b=o[m];if(!r.defined(b))throw new t.RuntimeError("Unsupported compressed format.");var p,w=u._crn_get_levels(_,c),x=u._crn_get_width(_,c),y=u._crn_get_height(_,c),g=0;for(p=0;p<w;++p)g+=e.PixelFormat.compressedTextureSizeInBytes(b,x>>p,y>>p);if(d<g&&(r.defined(f)&&u._free(f),f=u._malloc(g),a=new Uint8Array(u.HEAPU8.buffer,f,g),d=g),u._crn_decompress(_,c,f,g,0,w),u._free(_),r.defaultValue(n.bMipMap,!1)){var h=a.slice(0,g);return s.push(h.buffer),new e.CompressedTextureBuffer(b,x,y,h)}var v=e.PixelFormat.compressedTextureSizeInBytes(b,x,y),A=a.subarray(0,v),P=new Uint8Array(v);return P.set(A,0),s.push(P.buffer),new e.CompressedTextureBuffer(b,x,y,P)}function l(e){u=e,self.onmessage=n(c),self.postMessage(!0)}return function(e){var t=e.data.webAssemblyConfig;if(r.defined(t))return require([t.modulePath],(function(e){r.defined(t.wasmBinaryFile)?(r.defined(e)||(e=self.Module),l(e)):l(e)}))}}));
