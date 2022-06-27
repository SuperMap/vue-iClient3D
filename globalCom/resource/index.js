import ResourceCN from "./resourceCN"
import ResourceEN from "./resourceEN"
import ResourceJA from "./resourceJA"

var currentLanguage, Resource;
var cookieLanguage = getLang().toLowerCase();


function getLang() {
    //浏览器语言  IE用browserLanguage，非IE使用language进行判断
    let lang = (navigator.language || navigator.browserLanguage).toLowerCase();
    window.lang = lang;
    return lang;
};

function inputCSS(href) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.getElementsByTagName("HEAD")[0].appendChild(link);
}

function initResource(app, languageType) {
    if (languageType) {
        switch (languageType) {
            case 'zh':
                Resource = ResourceCN;
                break;
            case 'ja':
                Resource = ResourceJA;
                break;
            case 'en':
                Resource = ResourceEN;
                break;
            default:  Resource = ResourceCN;
            break;
        }
    } else {
        if (cookieLanguage !== undefined) {
            currentLanguage = cookieLanguage;
        } else {
            currentLanguage = (navigator.language || navigator.browserLanguage).toLowerCase(); // 获取当前浏览器的语言
        }
        if (currentLanguage.startsWith('zh')) {
            Resource = ResourceCN;
        } else if (currentLanguage.startsWith('ja')) {
            Resource = ResourceJA;
            //   inputCSS("../../../src/common/styles/cover_JA.css") 
        } else {
            Resource = ResourceEN;
            //   inputCSS("../../../src/common/styles/cover_EN.css")
        }
    }
    if(app){
        app.config.globalProperties.Resource = Resource
    }else{
        console.log('err:'+'初始化语言需要传入当前实例app')
    }
   
}

export default initResource;
