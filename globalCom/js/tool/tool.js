/*
* 常用工具类
*/


//axios本版本不支持jsonp
const axiosJsonp = (url) => {
  if (!url) {
    console.error('Axios.JSONP 至少需要一个url参数!')
    return;
  }
  return new Promise((resolve, reject) => {
    window.jsonCallBack = (result) => {
      resolve(result)
    }
    var JSONP = document.createElement("script");
    JSONP.type = "text/javascript";
    JSONP.src = `${url}&callback=jsonCallBack`;
    document.getElementsByTagName("head")[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName("head")[0].removeChild(JSONP)
    }, 500)
  })
};

//判断两数组或对象相等
const isEqualArr = (arg1, arg2) => {
  if(!arg1 || !arg2) return true;
  let bol = true;
  if (Object.keys(arg1).length != Object.keys(arg2).length) {
    return false;
  }
  for (let key in arg1) {
    if (typeof arg1[key] == 'object') {
      bol = isSame(arg1[key], arg2[key])
      if (!bol) {
        break;
      }
    } else if (arg1[key] != arg2[key]) {
      bol = false;
      break;
    }
  }
  return bol
};


//坐标转化
//笛卡尔转经纬度
const CartesiantoDegrees = (Cartesians) => {
  let array = [].concat(Cartesians);
  let positions = [];
  for (let i = 0, len = array.length; i < len; i++) {
    let cartographic = SuperMap3D.Cartographic.fromCartesian(array[i]);
    let longitude = SuperMap3D.Math.toDegrees(cartographic.longitude);
    let latitude = SuperMap3D.Math.toDegrees(cartographic.latitude);
    let h = cartographic.height;
    if (positions.indexOf(longitude) == -1 && positions.indexOf(latitude) == -1) {
      positions.push(longitude);
      positions.push(latitude);
      positions.push(h);
    }
  }
  return positions
};

//笛卡尔转经纬度(每个点是独立的对象)
const CartesiantoDegreesObjs = (Cartesians) => {
  let array = [].concat(Cartesians);
  let positions = [];
  for (let i = 0, len = array.length; i < len; i++) {
    let cartographic = SuperMap3D.Cartographic.fromCartesian(array[i]);
    let obj = {
      longitude: SuperMap3D.Math.toDegrees(cartographic.longitude),
      latitude: SuperMap3D.Math.toDegrees(cartographic.latitude),
      height: cartographic.height
    };
    positions.push(obj);
  }
  return positions
}

// 弧度转经纬度
const CartographictoDegrees =(wgsPosition) =>{
  let longitude = SuperMap3D.Math.toDegrees(wgsPosition.longitude);
  let latitude = SuperMap3D.Math.toDegrees(wgsPosition.latitude);
  let height = wgsPosition.height;
  return [longitude, latitude, height];
}

//去重函数  数组
const unique = (arr) => {
  let res = [];
  let json = {};
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
};

// 获取渐变色函数
function gradientColors(start, end, steps, gamma) {
  var i, j, ms, me, output = [], so = [];
  gamma = gamma || 1;
  var normalize = function (channel) {
    return Math.pow(channel / 255, gamma);
  };
  start = parseColor(start).map(normalize);
  end = parseColor(end).map(normalize);
  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1);
    me = 1 - ms;
    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
    }
    output.push('#' + so.join(''));
  }
  return output;
  function parseColor(hexStr) {
    return hexStr.length === 4 ? hexStr.substr(1).split('').map(function (s) { return 0x11 * parseInt(s, 16); }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) { return parseInt(s, 16); })
  };
  // zero-pad 1 digit to 2
  function pad(s) {
    return (s.length === 1) ? '0' + s : s;
  }
};

// 获取两点的角度和弧度
function getAngleAndRadian(pointA, pointB) {
  //建立以点A为原点，X轴为east,Y轴为north,Z轴朝上的坐标系
  const transform = SuperMap3D.Transforms.eastNorthUpToFixedFrame(pointA);
  //向量AB
  const positionvector = SuperMap3D.Cartesian3.subtract(pointB, pointA, new SuperMap3D.Cartesian3());
  //因transform是将A为原点的eastNorthUp坐标系中的点转换到世界坐标系的矩阵
  //AB为世界坐标中的向量
  //因此将AB向量转换为A原点坐标系中的向量，需乘以transform的逆矩阵。
  const vector = SuperMap3D.Matrix4.multiplyByPointAsVector(SuperMap3D.Matrix4.inverse(transform, new SuperMap3D.Matrix4()), positionvector, new SuperMap3D.Cartesian3());
  //归一化
  const direction = SuperMap3D.Cartesian3.normalize(vector, new SuperMap3D.Cartesian3());
  //heading
  const heading1 = Math.atan2(direction.y, direction.x) - SuperMap3D.Math.PI_OVER_TWO;

  let radian = SuperMap3D.Math.TWO_PI - SuperMap3D.Math.zeroToTwoPi(heading1);
  var angle = radian * (180 / Math.PI);
  if (angle < 0) {
      angle = angle + 360;
  }
  return {angle,radian};
}

function getPitch(pointA, pointB){
  let transfrom = SuperMap3D.Transforms.eastNorthUpToFixedFrame(pointA);
  const vector = SuperMap3D.Cartesian3.subtract(pointB, pointA, new SuperMap3D.Cartesian3());
  let direction = SuperMap3D.Matrix4.multiplyByPointAsVector(SuperMap3D.Matrix4.inverse(transfrom, transfrom), vector, vector);
  SuperMap3D.Cartesian3.normalize(direction, direction);
  //因为direction已归一化，斜边长度等于1，所以余弦函数等于direction.z
  let radian =  SuperMap3D.Math.PI_OVER_TWO - SuperMap3D.Math.acosClamped(direction.z);
  var angle = radian * (180 / Math.PI);
  if (angle < 0) {
      angle = angle + 360;
  }
  return {angle,radian};
}


export default {
  axiosJsonp,
  isEqualArr,
  CartesiantoDegrees,
  CartesiantoDegreesObjs,
  unique,
  gradientColors,
  getAngleAndRadian,
  CartographictoDegrees,
  getPitch
};

export  {
  axiosJsonp,
  isEqualArr,
  CartesiantoDegrees,
  CartesiantoDegreesObjs,
  unique,
  gradientColors,
  getAngleAndRadian,
  CartographictoDegrees,
  getPitch
};



