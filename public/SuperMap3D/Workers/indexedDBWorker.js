define(["./createTaskProcessorWorker","./when-7d8885d2"],(function(e,t){"use strict";function r(e){return null!=e}function n(e){var t;this.name="DeveloperError",this.message=e;try{throw new Error}catch(e){t=e.stack}this.stack=t}r(Object.create)&&(n.prototype=Object.create(Error.prototype),n.prototype.constructor=n),n.prototype.toString=function(){var e=this.name+": "+this.message;return r(this.stack)&&(e+="\n"+this.stack.toString()),e},n.throwInstantiationError=function(){throw new n("This function defines an interface and should not be called directly.")};var o=1,c=2,a=3;function s(e){if(!r(e.name))throw new n("options.name is required.");var o=t.when.defer();this.dbname=e.name;var c=indexedDB.open(this.dbname),a=this;return c.onsuccess=function(e){a.db=e.target.result,a.version=a.db.version,r(a.cachestatus)||(a.cachestatus={}),o.resolve(a)},c.onupgradeneeded=function(e){a.db=e.target.result,a.version=a.db.version,o.resolve(a)},c.onerror=function(e){a.db=null,o.reject("create database fail, error code : "+e.target.errorcode)},this.layer=e.layer||null,this.storageType=e.storageType||"arrayBuffer",this.creatingTable=!1,this.cachestatus={},o.promise}s.prototype.checkObjectStoreExit=function(e){return!!r(this.db)&&this.db.objectStoreNames.contains(e)},s.prototype.createObjectStore=function(e){var n=t.when.defer();if(this.creatingTable)n.reject(!1);else{if(this.db.objectStoreNames.contains(e))return n.reject(!1),n.promise;this.creatingTable=!0;var o=this,c=parseInt(o.db.version);o.db.close();var a=indexedDB.open(o.dbname,c+1);a.onupgradeneeded=function(t){var c=t.target.result;o.db=c;var a=c.createObjectStore(e,{keyPath:"id"});r(a)?(a.createIndex("value","value",{unique:!1}),o.creatingTable=!1,r(o.cachestatus)||(o.cachestatus={}),o.cachestatus[e]={},o.db.close(),indexedDB.open(o.dbname).onsuccess=function(e){var t=e.target.result;o.db=t,n.resolve(!0)}):(o.creatingTable=!1,n.reject(!1))},a.onsuccess=function(e){e.target.result.close(),n.resolve(!0)},a.onerror=function(e){o.creatingTable=!1,n.reject(!1)}}return n.promise},s.prototype.putElementInDB=function(e,n,s,i){var u,l=t.when.defer();if(!r(this.db))return l.reject(!1),l.promise;var h=this;if(r(h.cachestatus[e])&&!r(i)&&r(h.cachestatus[e][n])&&(h.cachestatus[e][n]===o||h.cachestatus[e][n]===c))return l.resolve(!1),l.promise;if(this.db.objectStoreNames.contains(e)){var d;r(h.cachestatus[e])||(h.cachestatus[e]={});try{d=this.db.transaction([e],"readwrite")}catch(e){return l.reject(null),l.promise}if(u=d.objectStore(e),r(i))if(i instanceof Array){for(var v=0,f=i.length;v<f;v++)h.cachestatus[e][i[v].key]!==c&&(u.add({id:i[v].key,value:i[v].value}),h.cachestatus[e][i[v].key]=c);l.resolve(!0)}else{for(var n in i)isNaN(1*n)||u.add({id:n,value:i[n]});l.resolve(!0)}else{if(!r(n)||!r(s))return;if(n instanceof Array&&s instanceof Array){for(v=0,f=n.length;v<f;v++)h.cachestatus[e][n[v]]!==c&&(u.add({id:n[v],value:s[v]}),h.cachestatus[e][n[v]]=c);d.oncomplete=function(e){l.resolve(!0)},d.onerror=function(e){l.reject(!1)}}else{var b=u.add({id:n,value:s});h.cachestatus[e][n]=o,b.onsuccess=function(t){h.cachestatus[e][n]=c,l.resolve(!0)},b.onerror=function(t){h.cachestatus[e][n]=a,l.reject(!1)}}}}else this.createObjectStore(e).then((function(t){var o=h.db.transaction([e],"readwrite");if(u=o.objectStore(e),r(i)){for(var c=0,a=i.length;c<a;c++)u.add({id:i[c].key,value:i[c].value});l.resolve(!0)}else{var d=u.add({id:n,value:s});d.onsuccess=function(e){l.resolve(!0)},d.onerror=function(e){l.reject(!1)}}}),(function(e){l.reject(!1)}));return l.promise},s.prototype.getRangeFromDB=function(e,n){var o,c,a=t.when.defer();if(!r(this.db))return null;if(!this.db.objectStoreNames.contains(e))return null;try{o=this.db.transaction([e])}catch(e){return a.reject(null),a.promise}try{c=o.objectStore(e)}catch(e){a.reject(null)}var s=c.openCursor(IDBKeyRange.bound(n[0],n[1])),i=[];return s.onsuccess=function(e){var t=e.target.result;r(t)?(i.push(t.value),t.continue()):a.resolve(i)},s.onerror=function(e){a.reject(null)},a.promise},s.prototype.getElementFromDB=function(e,n){var o,c,a=t.when.defer();if(!r(this.db))return null;if(!this.db.objectStoreNames.contains(e))return null;try{o=this.db.transaction([e])}catch(e){return a.reject(null),a.promise}try{c=o.objectStore(e)}catch(e){a.reject(null)}var s=c.get(n);return s.onsuccess=function(e){r(e.target.result)?a.resolve(e.target.result.value):a.reject(null)},s.onerror=function(e){a.reject(null)},a.promise},s.prototype.getAllElementFromDB=function(e){var n,o,c=t.when.defer();if(!r(this.db))return null;if(!this.db.objectStoreNames.contains(e))return null;if(null!=this.transaction)n=this.transaction;else try{n=this.db.transaction([e])}catch(e){return c.reject(null),c.promise}try{o=n.objectStore(e)}catch(e){c.reject(null)}var a=o.getAll();return a.onsuccess=function(e){r(e.target.result)?c.resolve(e.target.result):c.reject(null)},a.onerror=function(e){c.reject(null)},c.promise},s.prototype.updateElementInDB=function(e,n,o,c){var a=t.when.defer();if(!r(this.db))return a.resolve(!1),a.promise;if(!this.db.objectStoreNames.contains(e))return a.resolve(!1),a.promise;var s,i=this.db.transaction([e],"readwrite");try{s=i.objectStore(e)}catch(e){a.resolve(!1)}var u=s.get(n);return u.onsuccess=function(e){var t=e.target.result;r(t)||(t={id:n}),t.value=!0===c?Object.assign(t.value,o):o;var i=s.put(t);i.onsuccess=function(e){a.resolve(!0)},i.onerror=function(e){a.resolve(!1)}},u.onerror=function(e){a.resolve(!1)},a.promise},s.prototype.removeElementFromDB=function(e,n){var o=t.when.defer();if(!r(this.db))return o.resolve(!1),o.promise;if(!this.db.objectStoreNames.contains(e))return o.resolve(!1),o.promise;var c,a=this.db.transaction([e],"readwrite");try{c=a.objectStore(e)}catch(e){o.resolve(!1)}var s=c.delete(n);return s.onerror=function(e){o.resolve(!1)},s.onsuccess=function(e){o.resolve(!0)},o.promise},s.prototype.clear=function(e){var n=t.when.defer();if(!r(this.db))return n.resolve(!1),n.promise;if(!this.db.objectStoreNames.contains(e))return n.resolve(!1),n.promise;var o,c=this.db.transaction([e],"readwrite");try{o=c.objectStore(e)}catch(e){n.resolve(!1)}var a=o.clear();return a.onerror=function(e){n.resolve(!1)},a.onsuccess=function(e){n.resolve(!0)},n.promise};var i={};function u(e,t,r){null===r.scheduler?r.creatingDB||(r.creatingDB=!0,new s({name:e}).then((function(e){r.creatingDB=!1,r.scheduler=e,e.checkObjectStoreExit(t)?(e.putElementInDB(t,null,null,r.cache),r.cache=[]):r.creatingTable||(r.creatingTable=!0,e.createObjectStore(t).then((function(){r.creatingTable=!1,e.putElementInDB(t,null,null,r.cache),r.cache=[]})))}))):r.scheduler.checkObjectStoreExit(t)?(r.scheduler.putElementInDB(t,null,null,r.cache),r.cache=[]):r.creatingTable||(r.creatingTable=!0,r.scheduler.createObjectStore(t).then((function(){r.creatingTable=!1,r.scheduler.putElementInDB(t,null,null,r.cache),r.cache=[]})))}return e((function(e,t){var r=e.blob,n=e.key;if(void 0!==r&&void 0!==n){var o=e.tablename,c=e.dbname;void 0===i[h=c+o]&&(i[h]={cache:[],creatingDB:!1,scheduler:null,creatingTable:!1});var a=50;void 0!==e.reserveCount&&(a=e.reserveCount),i[h].cache.length<a&&i[h].cache.push({key:n,value:r})}else for(var s=e.nameArray,l=0;l<s.length;l++){var h;o=s[l].tablename,c=s[l].dbname;void 0!==i[h=c+o]&&0!==Object.keys(i[h].cache).length&&u(c,o,i[h])}}))}));
