define(["exports","./Cartesian2-54f49cd5","./Cartographic-9ee1f1bd","./Check-737bd4ec","./FeatureDetection-07e177c7","./OrientedBoundingBox-89debfbe"],(function(n,e,t,r,a,i){"use strict";var o={},u=new t.Cartesian3,s=new t.Cartesian3,C=new t.Cartesian3,c=new t.Cartesian3,d=new i.OrientedBoundingBox;function m(n,r,a,i,o){var s=t.Cartesian3.subtract(n,r,u),C=t.Cartesian3.dot(a,s),c=t.Cartesian3.dot(i,s);return e.Cartesian2.fromElements(C,c,o)}o.validOutline=function(n){var e=i.OrientedBoundingBox.fromPoints(n,d).halfAxes,r=a.Matrix3.getColumn(e,0,s),o=a.Matrix3.getColumn(e,1,C),u=a.Matrix3.getColumn(e,2,c),m=t.Cartesian3.magnitude(r),g=t.Cartesian3.magnitude(o),f=t.Cartesian3.magnitude(u);return!(0===m&&(0===g||0===f)||0===g&&0===f)},o.computeProjectTo2DArguments=function(n,e,r,o){var u,m,g=i.OrientedBoundingBox.fromPoints(n,d),f=g.halfAxes,l=a.Matrix3.getColumn(f,0,s),x=a.Matrix3.getColumn(f,1,C),B=a.Matrix3.getColumn(f,2,c),P=t.Cartesian3.magnitude(l),h=t.Cartesian3.magnitude(x),M=t.Cartesian3.magnitude(B),b=Math.min(P,h,M);return(0!==P||0!==h&&0!==M)&&(0!==h||0!==M)&&(b!==h&&b!==M||(u=l),b===P?u=x:b===M&&(m=x),b!==P&&b!==h||(m=B),t.Cartesian3.normalize(u,r),t.Cartesian3.normalize(m,o),t.Cartesian3.clone(g.center,e),!0)},o.createProjectPointsTo2DFunction=function(n,e,t){return function(r){for(var a=new Array(r.length),i=0;i<r.length;i++)a[i]=m(r[i],n,e,t);return a}},o.createProjectPointTo2DFunction=function(n,e,t){return function(r,a){return m(r,n,e,t,a)}},n.CoplanarPolygonGeometryLibrary=o}));
