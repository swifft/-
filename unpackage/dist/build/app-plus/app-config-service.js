
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/my/my","pages/index/index","pages/dynamic/dynamic","pages/my/about/about","pages/my/userinfo/userinfo","pages/login/login","pages/register/register","pages/my/attestation/attestation","pages/my/WaitChecked/WaitChecked","pages/my/Checked/Checked","pages/my/WaitChecked/progress/progress","pages/index/viewDetail/viewDetail","pages/my/Checked/progress/progress","pages/my/history/history","pages/my/history/historyDetail/historyDetail"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#7A7E83","selectedColor":"#D4237A","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tabbar/index.png","selectedIconPath":"static/tabbar/indexselect.png","text":"主页"},{"pagePath":"pages/dynamic/dynamic","iconPath":"static/tabbar/dynamic.png","selectedIconPath":"static/tabbar/dynamicselect.png","text":"动态"},{"pagePath":"pages/my/my","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/myselect.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"软件开发实训","compilerVersion":"2.7.14","entryPagePath":"pages/my/my","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black","enablePullDownRefresh":true}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"主页","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black","enablePullDownRefresh":true}},{"path":"/pages/dynamic/dynamic","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"动态","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black","enablePullDownRefresh":true}},{"path":"/pages/my/about/about","meta":{},"window":{"navigationBarTitleText":"关于我们","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/my/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"个人信息","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/my/attestation/attestation","meta":{},"window":{"navigationBarTitleText":"身份认证","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/my/WaitChecked/WaitChecked","meta":{},"window":{"navigationBarTitleText":"待审核","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/my/Checked/Checked","meta":{},"window":{"navigationBarTitleText":"已审核","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/my/WaitChecked/progress/progress","meta":{},"window":{"navigationBarTitleText":"进度","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/index/viewDetail/viewDetail","meta":{},"window":{"navigationBarTitleText":"请假详情","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/my/Checked/progress/progress","meta":{},"window":{"navigationBarTitleText":"进度","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/my/history/history","meta":{},"window":{"navigationBarTitleText":"历史记录","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}},{"path":"/pages/my/history/historyDetail/historyDetail","meta":{},"window":{"navigationBarTitleText":"历史详情","navigationBarBackgroundColor":"#eeeeee","navigationBarTextStyle":"black"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
