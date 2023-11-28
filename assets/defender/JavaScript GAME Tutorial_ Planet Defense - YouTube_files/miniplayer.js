(function(g){var window=this;'use strict';var arb=function(a,b){g.V.call(this,{I:"button",Ma:["ytp-miniplayer-expand-watch-page-button","ytp-button","ytp-miniplayer-button-top-left"],X:{title:"{{title}}","data-tooltip-target-id":"ytp-miniplayer-expand-watch-page-button","aria-keyshortcuts":"i","data-title-no-tooltip":"{{data-title-no-tooltip}}"},V:[{I:"svg",X:{height:"24px",version:"1.1",viewBox:"0 0 24 24",width:"24px"},V:[{I:"g",X:{fill:"none","fill-rule":"evenodd",stroke:"none","stroke-width":"1"},V:[{I:"g",X:{transform:"translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "},
V:[{I:"path",X:{d:"M19,19 L5,19 L5,5 L12,5 L12,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,12 L19,12 L19,19 Z M14,3 L14,5 L17.59,5 L7.76,14.83 L9.17,16.24 L19,6.41 L19,10 L21,10 L21,3 L14,3 Z",fill:"#fff","fill-rule":"nonzero"}}]}]}]}]});this.J=a;this.Ta("click",this.onClick,this);this.updateValue("title",g.dU(a,"Expand","i"));this.update({"data-title-no-tooltip":"Expand"});this.addOnDisposeCallback(g.bU(b.Jd(),this.element))},brb=function(a){g.V.call(this,
{I:"div",
S:"ytp-miniplayer-ui"});this.og=!1;this.player=a;this.T(a,"minimized",this.yh);this.T(a,"onStateChange",this.XR)},crb=function(a){g.vV.call(this,a);
this.B=new g.GK(this);this.j=new brb(this.player);this.j.hide();g.oU(this.player,this.j.element,4);a.qg()&&(this.load(),g.Nu(a.getRootNode(),"ytp-player-minimized",!0))};
g.w(arb,g.V);arb.prototype.onClick=function(){this.J.Qa("onExpandMiniplayer")};g.w(brb,g.V);g.k=brb.prototype;
g.k.HO=function(){this.tooltip=new g.NX(this.player,this);g.L(this,this.tooltip);g.oU(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.Tc=new g.ZV(this.player);g.L(this,this.Tc);this.yk=new g.V({I:"div",S:"ytp-miniplayer-scrim"});g.L(this,this.yk);this.yk.Da(this.element);this.T(this.yk.element,"click",this.yJ);var a=new g.V({I:"button",Ma:["ytp-miniplayer-close-button","ytp-button"],X:{"aria-label":"Close"},V:[g.dG()]});g.L(this,a);a.Da(this.yk.element);this.T(a.element,"click",this.Rp);
a=new arb(this.player,this);g.L(this,a);a.Da(this.yk.element);this.wv=new g.V({I:"div",S:"ytp-miniplayer-controls"});g.L(this,this.wv);this.wv.Da(this.yk.element);this.T(this.wv.element,"click",this.yJ);var b=new g.V({I:"div",S:"ytp-miniplayer-button-container"});g.L(this,b);b.Da(this.wv.element);a=new g.V({I:"div",S:"ytp-miniplayer-play-button-container"});g.L(this,a);a.Da(this.wv.element);var c=new g.V({I:"div",S:"ytp-miniplayer-button-container"});g.L(this,c);c.Da(this.wv.element);this.IZ=new g.$W(this.player,
this,!1);g.L(this,this.IZ);this.IZ.Da(b.element);b=new g.ZW(this.player,this);g.L(this,b);b.Da(a.element);this.nextButton=new g.$W(this.player,this,!0);g.L(this,this.nextButton);this.nextButton.Da(c.element);this.Gj=new g.GX(this.player,this);g.L(this,this.Gj);this.Gj.Da(this.yk.element);this.Oc=new g.eX(this.player,this);g.L(this,this.Oc);g.oU(this.player,this.Oc.element,4);this.hJ=new g.V({I:"div",S:"ytp-miniplayer-buttons"});g.L(this,this.hJ);g.oU(this.player,this.hJ.element,4);a=new g.V({I:"button",
Ma:["ytp-miniplayer-close-button","ytp-button"],X:{"aria-label":"Close"},V:[g.dG()]});g.L(this,a);a.Da(this.hJ.element);this.T(a.element,"click",this.Rp);a=new g.V({I:"button",Ma:["ytp-miniplayer-replay-button","ytp-button"],X:{"aria-label":"Close"},V:[g.Qva()]});g.L(this,a);a.Da(this.hJ.element);this.T(a.element,"click",this.h$);this.T(this.player,"presentingplayerstatechange",this.Rd);this.T(this.player,"appresize",this.Hb);this.T(this.player,"fullscreentoggled",this.Hb);this.Hb()};
g.k.show=function(){this.yf=new g.zu(this.Fw,null,this);this.yf.start();this.og||(this.HO(),this.og=!0);0!==this.player.getPlayerState()&&g.V.prototype.show.call(this);this.Oc.show();this.player.unloadModule("annotations_module")};
g.k.hide=function(){this.yf&&(this.yf.dispose(),this.yf=void 0);g.V.prototype.hide.call(this);this.player.qg()||(this.og&&this.Oc.hide(),this.player.loadModule("annotations_module"))};
g.k.ya=function(){this.yf&&(this.yf.dispose(),this.yf=void 0);g.V.prototype.ya.call(this)};
g.k.Rp=function(){this.player.stopVideo();this.player.Qa("onCloseMiniplayer")};
g.k.h$=function(){this.player.playVideo()};
g.k.yJ=function(a){if(a.target===this.yk.element||a.target===this.wv.element)g.DL(this.player.Qb())?this.player.pauseVideo():this.player.playVideo()};
g.k.yh=function(){g.Nu(this.player.getRootNode(),"ytp-player-minimized",this.player.qg())};
g.k.Xe=function(){this.Oc.Ec();this.Gj.Ec()};
g.k.Fw=function(){this.Xe();this.yf&&this.yf.start()};
g.k.Rd=function(a){g.FG(a.state,32)&&this.tooltip.hide()};
g.k.Hb=function(){g.qX(this.Oc,0,this.player.kb().getPlayerSize().width,!1);g.fX(this.Oc)};
g.k.XR=function(a){this.player.qg()&&(0===a?this.hide():this.show())};
g.k.Jd=function(){return this.tooltip};
g.k.Yf=function(){return!1};
g.k.Kf=function(){return!1};
g.k.Yj=function(){return!1};
g.k.tB=function(){};
g.k.vp=function(){};
g.k.Ns=function(){};
g.k.xn=function(){return null};
g.k.IH=function(){return null};
g.k.YN=function(){return new g.te(0,0)};
g.k.Sk=function(){return new g.Sr(0,0,0,0)};
g.k.handleGlobalKeyDown=function(){return!1};
g.k.handleGlobalKeyUp=function(){return!1};
g.k.Dr=function(a,b,c,d,e){var f=0,h=d=0,l=g.fs(a);if(b){c=g.Iu(b,"ytp-prev-button")||g.Iu(b,"ytp-next-button");var m=g.Iu(b,"ytp-play-button"),n=g.Iu(b,"ytp-miniplayer-expand-watch-page-button");c?f=h=12:m?(b=g.ds(b,this.element),h=b.x,f=b.y-12):n&&(h=g.Iu(b,"ytp-miniplayer-button-top-left"),f=g.ds(b,this.element),b=g.fs(b),h?(h=8,f=f.y+40):(h=f.x-l.width+b.width,f=f.y-20))}else h=c-l.width/2,d=25+(e||0);b=this.player.kb().getPlayerSize().width;e=f+(e||0);l=g.le(h,0,b-l.width);e?(a.style.top=e+"px",
a.style.bottom=""):(a.style.top="",a.style.bottom=d+"px");a.style.left=l+"px"};
g.k.showControls=function(){};
g.k.kq=function(){};
g.k.Rj=function(){return!1};
g.k.mu=function(){};
g.k.Lr=function(){};
g.k.Dm=function(){};
g.k.Cm=function(){};
g.k.Aq=function(){};
g.k.xp=function(){};
g.k.ax=function(){};
g.k.JH=function(){return null};g.w(crb,g.vV);g.k=crb.prototype;g.k.onVideoDataChange=function(){if(this.player.getVideoData()){var a=this.player.getVideoAspectRatio(),b=16/9;a=a>b+.1||a<b-.1;g.Nu(this.player.getRootNode(),"ytp-rounded-miniplayer-not-regular-wide-video",a)}};
g.k.create=function(){g.vV.prototype.create.call(this);this.B.T(this.player,"videodatachange",this.onVideoDataChange);this.onVideoDataChange()};
g.k.Dl=function(){return!1};
g.k.load=function(){this.player.hideControls();this.j.show()};
g.k.unload=function(){this.player.showControls();this.j.hide()};g.uV("miniplayer",crb);})(_yt_player);
