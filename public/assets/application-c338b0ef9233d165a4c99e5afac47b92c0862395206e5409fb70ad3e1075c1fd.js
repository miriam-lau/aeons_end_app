(function(){var t=this;(function(){(function(){this.Rails={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",buttonClickSelector:{selector:"button[data-remote]:not([form]), button[data-confirm]:not([form])",exclude:"form button"},inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",formDisableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",formEnableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",fileInputSelector:"input[name][type=file]:not([disabled])",linkDisableSelector:"a[data-disable-with], a[data-disable]",buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]"}}).call(this)}).call(t);var e=t.Rails;(function(){(function(){var t,n;n=Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector,e.matches=function(t,e){return null!=e.exclude?n.call(t,e.selector)&&!n.call(t,e.exclude):n.call(t,e)},t="_ujsData",e.getData=function(e,n){var o;return null!=(o=e[t])?o[n]:void 0},e.setData=function(e,n,o){return null==e[t]&&(e[t]={}),e[t][n]=o},e.$=function(t){return Array.prototype.slice.call(document.querySelectorAll(t))}}).call(this),function(){var t,n,o;t=e.$,o=e.csrfToken=function(){var t;return(t=document.querySelector("meta[name=csrf-token]"))&&t.content},n=e.csrfParam=function(){var t;return(t=document.querySelector("meta[name=csrf-param]"))&&t.content},e.CSRFProtection=function(t){var e;if(null!=(e=o()))return t.setRequestHeader("X-CSRF-Token",e)},e.refreshCSRFTokens=function(){var e,i;if(i=o(),e=n(),null!=i&&null!=e)return t('form input[name="'+e+'"]').forEach(function(t){return t.value=i})}}.call(this),function(){var t,n,o;o=e.matches,t=window.CustomEvent,"function"!=typeof t&&(t=function(t,e){var n;return n=document.createEvent("CustomEvent"),n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},t.prototype=window.Event.prototype),n=e.fire=function(e,n,o){var i;return i=new t(n,{bubbles:!0,cancelable:!0,detail:o}),e.dispatchEvent(i),!i.defaultPrevented},e.stopEverything=function(t){return n(t.target,"ujs:everythingStopped"),t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation()},e.delegate=function(t,e,n,i){return t.addEventListener(n,function(t){var n;for(n=t.target;n instanceof Element&&!o(n,e);)n=n.parentNode;if(n instanceof Element&&!1===i.call(n,t))return t.preventDefault(),t.stopPropagation()})}}.call(this),function(){var t,n,o,i,r,c;n=e.CSRFProtection,i=e.fire,t={"*":"*/*",text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript",script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},e.ajax=function(t){var e;return t=r(t),e=o(t,function(){var n;return n=c(e.response,e.getResponseHeader("Content-Type")),2===Math.floor(e.status/100)?"function"==typeof t.success&&t.success(n,e.statusText,e):"function"==typeof t.error&&t.error(n,e.statusText,e),"function"==typeof t.complete?t.complete(e,e.statusText):void 0}),"function"==typeof t.beforeSend&&t.beforeSend(e,t),e.readyState===XMLHttpRequest.OPENED?e.send(t.data):i(document,"ajaxStop")},r=function(e){return e.url=e.url||location.href,e.type=e.type.toUpperCase(),"GET"===e.type&&e.data&&(e.url.indexOf("?")<0?e.url+="?"+e.data:e.url+="&"+e.data),null==t[e.dataType]&&(e.dataType="*"),e.accept=t[e.dataType],"*"!==e.dataType&&(e.accept+=", */*; q=0.01"),e},o=function(t,e){var o;return o=new XMLHttpRequest,o.open(t.type,t.url,!0),o.setRequestHeader("Accept",t.accept),"string"==typeof t.data&&o.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.crossDomain||o.setRequestHeader("X-Requested-With","XMLHttpRequest"),n(o),o.withCredentials=!!t.withCredentials,o.onreadystatechange=function(){if(o.readyState===XMLHttpRequest.DONE)return e(o)},o},c=function(t,e){var n,o;if("string"==typeof t&&"string"==typeof e)if(e.match(/\bjson\b/))try{t=JSON.parse(t)}catch(t){}else if(e.match(/\b(?:java|ecma)script\b/))o=document.createElement("script"),o.text=t,document.head.appendChild(o).parentNode.removeChild(o);else if(e.match(/\b(xml|html|svg)\b/)){n=new DOMParser,e=e.replace(/;.+/,"");try{t=n.parseFromString(t,e)}catch(t){}}return t},e.href=function(t){return t.href},e.isCrossDomain=function(t){var e,n;e=document.createElement("a"),e.href=location.href,n=document.createElement("a");try{return n.href=t,!((!n.protocol||":"===n.protocol)&&!n.host||e.protocol+"//"+e.host==n.protocol+"//"+n.host)}catch(t){return t,!0}}}.call(this),function(){var t,n;t=e.matches,n=function(t){return Array.prototype.slice.call(t)},e.serializeElement=function(e,o){var i,r;return i=[e],t(e,"form")&&(i=n(e.elements)),r=[],i.forEach(function(e){if(e.name)return t(e,"select")?n(e.options).forEach(function(t){if(t.selected)return r.push({name:e.name,value:t.value})}):e.checked||-1===["radio","checkbox","submit"].indexOf(e.type)?r.push({name:e.name,value:e.value}):void 0}),o&&r.push(o),r.map(function(t){return null!=t.name?encodeURIComponent(t.name)+"="+encodeURIComponent(t.value):t}).join("&")},e.formElements=function(e,o){return t(e,"form")?n(e.elements).filter(function(e){return t(e,o)}):n(e.querySelectorAll(o))}}.call(this),function(){var t,n,o;n=e.fire,o=e.stopEverything,e.handleConfirm=function(e){if(!t(this))return o(e)},t=function(t){var e,o,i;if(!(i=t.getAttribute("data-confirm")))return!0;if(e=!1,n(t,"confirm")){try{e=confirm(i)}catch(t){}o=n(t,"confirm:complete",[e])}return e&&o}}.call(this),function(){var t,n,o,i,r,c,a,s,l,u,d;l=e.matches,s=e.getData,u=e.setData,d=e.stopEverything,a=e.formElements,e.handleDisabledElement=function(t){var e;if(e=this,e.disabled)return d(t)},e.enableElement=function(t){var n;return n=t instanceof Event?t.target:t,l(n,e.linkDisableSelector)?c(n):l(n,e.buttonDisableSelector)||l(n,e.formEnableSelector)?i(n):l(n,e.formSubmitSelector)?r(n):void 0},e.disableElement=function(i){var r;return r=i instanceof Event?i.target:i,l(r,e.linkDisableSelector)?o(r):l(r,e.buttonDisableSelector)||l(r,e.formDisableSelector)?t(r):l(r,e.formSubmitSelector)?n(r):void 0},o=function(t){var e;return e=t.getAttribute("data-disable-with"),null!=e&&(u(t,"ujs:enable-with",t.innerHTML),t.innerHTML=e),t.addEventListener("click",d),u(t,"ujs:disabled",!0)},c=function(t){var e;return e=s(t,"ujs:enable-with"),null!=e&&(t.innerHTML=e,u(t,"ujs:enable-with",null)),t.removeEventListener("click",d),u(t,"ujs:disabled",null)},n=function(n){return a(n,e.formDisableSelector).forEach(t)},t=function(t){var e;return e=t.getAttribute("data-disable-with"),null!=e&&(l(t,"button")?(u(t,"ujs:enable-with",t.innerHTML),t.innerHTML=e):(u(t,"ujs:enable-with",t.value),t.value=e)),t.disabled=!0,u(t,"ujs:disabled",!0)},r=function(t){return a(t,e.formEnableSelector).forEach(i)},i=function(t){var e;return e=s(t,"ujs:enable-with"),null!=e&&(l(t,"button")?t.innerHTML=e:t.value=e,u(t,"ujs:enable-with",null)),t.disabled=!1,u(t,"ujs:disabled",null)}}.call(this),function(){var t;t=e.stopEverything,e.handleMethod=function(n){var o,i,r,c,a,s,l;if(s=this,l=s.getAttribute("data-method"))return a=e.href(s),i=e.csrfToken(),o=e.csrfParam(),r=document.createElement("form"),c="<input name='_method' value='"+l+"' type='hidden' />",null==o||null==i||e.isCrossDomain(a)||(c+="<input name='"+o+"' value='"+i+"' type='hidden' />"),c+='<input type="submit" />',r.method="post",r.action=a,r.target=s.target,r.innerHTML=c,r.style.display="none",document.body.appendChild(r),r.querySelector('[type="submit"]').click(),t(n)}}.call(this),function(){var t,n,o,i,r,c,a,s,l,u=[].slice;c=e.matches,o=e.getData,s=e.setData,n=e.fire,l=e.stopEverything,t=e.ajax,i=e.isCrossDomain,a=e.serializeElement,r=function(t){var e;return null!=(e=t.getAttribute("data-remote"))&&"false"!==e},e.handleRemote=function(d){var p,f,h,m,b,g,v;return m=this,!r(m)||(n(m,"ajax:before")?(v=m.getAttribute("data-with-credentials"),h=m.getAttribute("data-type")||"script",c(m,e.formSubmitSelector)?(p=o(m,"ujs:submit-button"),b=o(m,"ujs:submit-button-formmethod")||m.method,g=o(m,"ujs:submit-button-formaction")||m.getAttribute("action")||location.href,"GET"===b.toUpperCase()&&(g=g.replace(/\?.*$/,"")),"multipart/form-data"===m.enctype?(f=new FormData(m),null!=p&&f.append(p.name,p.value)):f=a(m,p),s(m,"ujs:submit-button",null),s(m,"ujs:submit-button-formmethod",null),s(m,"ujs:submit-button-formaction",null)):c(m,e.buttonClickSelector)||c(m,e.inputChangeSelector)?(b=m.getAttribute("data-method"),g=m.getAttribute("data-url"),f=a(m,m.getAttribute("data-params"))):(b=m.getAttribute("data-method"),g=e.href(m),f=m.getAttribute("data-params")),t({type:b||"GET",url:g,data:f,dataType:h,beforeSend:function(t,e){return n(m,"ajax:beforeSend",[t,e])?n(m,"ajax:send",[t]):(n(m,"ajax:stopped"),t.abort())},success:function(){var t;return t=1<=arguments.length?u.call(arguments,0):[],n(m,"ajax:success",t)},error:function(){var t;return t=1<=arguments.length?u.call(arguments,0):[],n(m,"ajax:error",t)},complete:function(){var t;return t=1<=arguments.length?u.call(arguments,0):[],n(m,"ajax:complete",t)},crossDomain:i(g),withCredentials:null!=v&&"false"!==v}),l(d)):(n(m,"ajax:stopped"),!1))},e.formSubmitButtonClick=function(){var t,e;if(t=this,e=t.form)return t.name&&s(e,"ujs:submit-button",{name:t.name,value:t.value}),s(e,"ujs:formnovalidate-button",t.formNoValidate),s(e,"ujs:submit-button-formaction",t.getAttribute("formaction")),s(e,"ujs:submit-button-formmethod",t.getAttribute("formmethod"))},e.handleMetaClick=function(t){var e,n,o;if(n=this,o=(n.getAttribute("data-method")||"GET").toUpperCase(),e=n.getAttribute("data-params"),(t.metaKey||t.ctrlKey)&&"GET"===o&&!e)return t.stopImmediatePropagation()}}.call(this),function(){var t,n,o,i,r,c,a,s,l,u,d,p,f,h;c=e.fire,o=e.delegate,s=e.getData,t=e.$,h=e.refreshCSRFTokens,n=e.CSRFProtection,r=e.enableElement,i=e.disableElement,u=e.handleDisabledElement,l=e.handleConfirm,f=e.handleRemote,a=e.formSubmitButtonClick,d=e.handleMetaClick,p=e.handleMethod,"undefined"==typeof jQuery||null===jQuery||null==jQuery.ajax||jQuery.rails||(jQuery.rails=e,jQuery.ajaxPrefilter(function(t,e,o){if(!t.crossDomain)return n(o)})),e.start=function(){if(window._rails_loaded)throw new Error("rails-ujs has already been loaded!");return window.addEventListener("pageshow",function(){return t(e.formEnableSelector).forEach(function(t){if(s(t,"ujs:disabled"))return r(t)}),t(e.linkDisableSelector).forEach(function(t){if(s(t,"ujs:disabled"))return r(t)})}),o(document,e.linkDisableSelector,"ajax:complete",r),o(document,e.linkDisableSelector,"ajax:stopped",r),o(document,e.buttonDisableSelector,"ajax:complete",r),o(document,e.buttonDisableSelector,"ajax:stopped",r),o(document,e.linkClickSelector,"click",u),o(document,e.linkClickSelector,"click",l),o(document,e.linkClickSelector,"click",d),o(document,e.linkClickSelector,"click",i),o(document,e.linkClickSelector,"click",f),o(document,e.linkClickSelector,"click",p),o(document,e.buttonClickSelector,"click",u),o(document,e.buttonClickSelector,"click",l),o(document,e.buttonClickSelector,"click",i),o(document,e.buttonClickSelector,"click",f),o(document,e.inputChangeSelector,"change",u),o(document,e.inputChangeSelector,"change",l),o(document,e.inputChangeSelector,"change",f),o(document,e.formSubmitSelector,"submit",u),o(document,e.formSubmitSelector,"submit",l),o(document,e.formSubmitSelector,"submit",f),o(document,e.formSubmitSelector,"submit",function(t){return setTimeout(function(){return i(t)},13)}),o(document,e.formSubmitSelector,"ajax:send",i),o(document,e.formSubmitSelector,"ajax:complete",r),o(document,e.formInputClickSelector,"click",u),o(document,e.formInputClickSelector,"click",l),o(document,e.formInputClickSelector,"click",a),document.addEventListener("DOMContentLoaded",h),window._rails_loaded=!0},window.Rails===e&&c(document,"rails:attachBindings")&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd&&define(e)}).call(this),function(){var t=this;(function(){(function(){var t=[].slice;this.ActionCable={INTERNAL:{message_types:{welcome:"welcome",ping:"ping",confirmation:"confirm_subscription",rejection:"reject_subscription"},default_mount_path:"/cable",protocols:["actioncable-v1-json","actioncable-unsupported"]},WebSocket:window.WebSocket,logger:window.console,createConsumer:function(t){var n;return null==t&&(t=null!=(n=this.getConfig("url"))?n:this.INTERNAL.default_mount_path),new e.Consumer(this.createWebSocketURL(t))},getConfig:function(t){var e;return e=document.head.querySelector("meta[name='action-cable-"+t+"']"),null!=e?e.getAttribute("content"):void 0},createWebSocketURL:function(t){var e;return t&&!/^wss?:/i.test(t)?(e=document.createElement("a"),e.href=t,e.href=e.href,e.protocol=e.protocol.replace("http","ws"),e.href):t},startDebugging:function(){return this.debugging=!0},stopDebugging:function(){return this.debugging=null},log:function(){var e,n;if(e=1<=arguments.length?t.call(arguments,0):[],this.debugging)return e.push(Date.now()),(n=this.logger).log.apply(n,["[ActionCable]"].concat(t.call(e)))}}}).call(this)}).call(t);var e=t.ActionCable;(function(){(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ConnectionMonitor=function(){function n(e){this.connection=e,this.visibilityDidChange=t(this.visibilityDidChange,this),this.reconnectAttempts=0}var o,i,r;return n.pollInterval={min:3,max:30},n.staleThreshold=6,n.prototype.start=function(){if(!this.isRunning())return this.startedAt=i(),delete this.stoppedAt,this.startPolling(),document.addEventListener("visibilitychange",this.visibilityDidChange),e.log("ConnectionMonitor started. pollInterval = "+this.getPollInterval()+" ms")},n.prototype.stop=function(){if(this.isRunning())return this.stoppedAt=i(),this.stopPolling(),document.removeEventListener("visibilitychange",this.visibilityDidChange),e.log("ConnectionMonitor stopped")},n.prototype.isRunning=function(){return null!=this.startedAt&&null==this.stoppedAt},n.prototype.recordPing=function(){return this.pingedAt=i()},n.prototype.recordConnect=function(){return this.reconnectAttempts=0,this.recordPing(),delete this.disconnectedAt,e.log("ConnectionMonitor recorded connect")},n.prototype.recordDisconnect=function(){return this.disconnectedAt=i(),e.log("ConnectionMonitor recorded disconnect")},n.prototype.startPolling=function(){return this.stopPolling(),this.poll()},n.prototype.stopPolling=function(){return clearTimeout(this.pollTimeout)},n.prototype.poll=function(){return this.pollTimeout=setTimeout(function(t){return function(){return t.reconnectIfStale(),t.poll()}}(this),this.getPollInterval())},n.prototype.getPollInterval=function(){var t,e,n,i;return i=this.constructor.pollInterval,n=i.min,e=i.max,t=5*Math.log(this.reconnectAttempts+1),Math.round(1e3*o(t,n,e))},n.prototype.reconnectIfStale=function(){if(this.connectionIsStale())return e.log("ConnectionMonitor detected stale connection. reconnectAttempts = "+this.reconnectAttempts+", pollInterval = "+this.getPollInterval()+" ms, time disconnected = "+r(this.disconnectedAt)+" s, stale threshold = "+this.constructor.staleThreshold+" s"),this.reconnectAttempts++,this.disconnectedRecently()?e.log("ConnectionMonitor skipping reopening recent disconnect"):(e.log("ConnectionMonitor reopening"),this.connection.reopen())},n.prototype.connectionIsStale=function(){var t;return r(null!=(t=this.pingedAt)?t:this.startedAt)>this.constructor.staleThreshold},n.prototype.disconnectedRecently=function(){return this.disconnectedAt&&r(this.disconnectedAt)<this.constructor.staleThreshold},n.prototype.visibilityDidChange=function(){if("visible"===document.visibilityState)return setTimeout(function(t){return function(){if(t.connectionIsStale()||!t.connection.isOpen())return e.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = "+document.visibilityState),t.connection.reopen()}}(this),200)},i=function(){return(new Date).getTime()},r=function(t){return(i()-t)/1e3},o=function(t,e,n){return Math.max(e,Math.min(n,t))},n}()}).call(this),function(){var t,n,o,i,r,c=[].slice,a=function(t,e){return function(){return t.apply(e,arguments)}},s=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1};i=e.INTERNAL,n=i.message_types,o=i.protocols,r=2<=o.length?c.call(o,0,t=o.length-1):(t=0,[]),o[t++],e.Connection=function(){function t(t){this.consumer=t,this.open=a(this.open,this),this.subscriptions=this.consumer.subscriptions,this.monitor=new e.ConnectionMonitor(this),this.disconnected=!0}return t.reopenDelay=500,t.prototype.send=function(t){return!!this.isOpen()&&(this.webSocket.send(JSON.stringify(t)),!0)},t.prototype.open=function(){return this.isActive()?(e.log("Attempted to open WebSocket, but existing socket is "+this.getState()),!1):(e.log("Opening WebSocket, current state is "+this.getState()+", subprotocols: "+o),null!=this.webSocket&&this.uninstallEventHandlers(),this.webSocket=new e.WebSocket(this.consumer.url,o),this.installEventHandlers(),this.monitor.start(),!0)},t.prototype.close=function(t){var e,n;if(e=(null!=t?t:{allowReconnect:!0}).allowReconnect,e||this.monitor.stop(),this.isActive())return null!=(n=this.webSocket)?n.close():void 0},t.prototype.reopen=function(){var t;if(e.log("Reopening WebSocket, current state is "+this.getState()),!this.isActive())return this.open();try{return this.close()}catch(n){return t=n,e.log("Failed to reopen WebSocket",t)}finally{e.log("Reopening WebSocket in "+this.constructor.reopenDelay+"ms"),setTimeout(this.open,this.constructor.reopenDelay)}},t.prototype.getProtocol=function(){var t;return null!=(t=this.webSocket)?t.protocol:void 0},t.prototype.isOpen=function(){return this.isState("open")},t.prototype.isActive=function(){return this.isState("open","connecting")},t.prototype.isProtocolSupported=function(){var t;return t=this.getProtocol(),s.call(r,t)>=0},t.prototype.isState=function(){var t,e;return e=1<=arguments.length?c.call(arguments,0):[],t=this.getState(),s.call(e,t)>=0},t.prototype.getState=function(){var t,e;for(e in WebSocket)if(WebSocket[e]===(null!=(t=this.webSocket)?t.readyState:void 0))return e.toLowerCase();return null},t.prototype.installEventHandlers=function(){var t,e;for(t in this.events)e=this.events[t].bind(this),this.webSocket["on"+t]=e},t.prototype.uninstallEventHandlers=function(){var t;for(t in this.events)this.webSocket["on"+t]=function(){}},t.prototype.events={message:function(t){var e,o,i,r;if(this.isProtocolSupported())switch(i=JSON.parse(t.data),e=i.identifier,o=i.message,r=i.type,r){case n.welcome:return this.monitor.recordConnect(),this.subscriptions.reload();case n.ping:return this.monitor.recordPing();case n.confirmation:return this.subscriptions.notify(e,"connected");case n.rejection:return this.subscriptions.reject(e);default:return this.subscriptions.notify(e,"received",o)}},open:function(){if(e.log("WebSocket onopen event, using '"+this.getProtocol()+"' subprotocol"),this.disconnected=!1,!this.isProtocolSupported())return e.log("Protocol is unsupported. Stopping monitor and disconnecting."),this.close({allowReconnect:!1})},close:function(){if(e.log("WebSocket onclose event"),!this.disconnected)return this.disconnected=!0,this.monitor.recordDisconnect(),this.subscriptions.notifyAll("disconnected",{willAttemptReconnect:this.monitor.isRunning()})},error:function(){return e.log("WebSocket onerror event")}},t}()}.call(this),function(){var t=[].slice;e.Subscriptions=function(){function n(t){this.consumer=t,this.subscriptions=[]}return n.prototype.create=function(t,n){var o,i,r;return o=t,i="object"==typeof o?o:{channel:o},r=new e.Subscription(this.consumer,i,n),this.add(r)},n.prototype.add=function(t){return this.subscriptions.push(t),this.consumer.ensureActiveConnection(),this.notify(t,"initialized"),this.sendCommand(t,"subscribe"),t},n.prototype.remove=function(t){return this.forget(t),this.findAll(t.identifier).length||this.sendCommand(t,"unsubscribe"),t},n.prototype.reject=function(t){var e,n,o,i,r;for(o=this.findAll(t),i=[],e=0,n=o.length;e<n;e++)r=o[e],this.forget(r),this.notify(r,"rejected"),i.push(r);return i},n.prototype.forget=function(t){var e;return this.subscriptions=function(){var n,o,i,r;for(i=this.subscriptions,r=[],n=0,o=i.length;n<o;n++)(e=i[n])!==t&&r.push(e);return r}.call(this),t},n.prototype.findAll=function(t){var e,n,o,i,r;for(o=this.subscriptions,i=[],e=0,n=o.length;e<n;e++)r=o[e],r.identifier===t&&i.push(r);return i},n.prototype.reload=function(){var t,e,n,o,i;for(n=this.subscriptions,o=[],t=0,e=n.length;t<e;t++)i=n[t],o.push(this.sendCommand(i,"subscribe"));return o},n.prototype.notifyAll=function(){var e,n,o,i,r,c,a;for(n=arguments[0],e=2<=arguments.length?t.call(arguments,1):[],r=this.subscriptions,c=[],o=0,i=r.length;o<i;o++)a=r[o],c.push(this.notify.apply(this,[a,n].concat(t.call(e))));return c},n.prototype.notify=function(){var e,n,o,i,r,c,a;for(c=arguments[0],n=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],a="string"==typeof c?this.findAll(c):[c],r=[],o=0,i=a.length;o<i;o++)c=a[o],r.push("function"==typeof c[n]?c[n].apply(c,e):void 0);return r},n.prototype.sendCommand=function(t,e){var n;return n=t.identifier,this.consumer.send({command:e,identifier:n})},n}()}.call(this),function(){e.Subscription=function(){function t(t,n,o){this.consumer=t,null==n&&(n={}),this.identifier=JSON.stringify(n),e(this,o)}var e;return t.prototype.perform=function(t,e){return null==e&&(e={}),e.action=t,this.send(e)},t.prototype.send=function(t){return this.consumer.send({command:"message",identifier:this.identifier,data:JSON.stringify(t)})},t.prototype.unsubscribe=function(){return this.consumer.subscriptions.remove(this)},e=function(t,e){var n,o;if(null!=e)for(n in e)o=e[n],t[n]=o;return t},t}()}.call(this),function(){e.Consumer=function(){function t(t){this.url=t,this.subscriptions=new e.Subscriptions(this),this.connection=new e.Connection(this)}return t.prototype.send=function(t){return this.connection.send(t)},t.prototype.connect=function(){return this.connection.open()},t.prototype.disconnect=function(){return this.connection.close({allowReconnect:!1})},t.prototype.ensureActiveConnection=function(){if(!this.connection.isActive())return this.connection.open()},t}()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd&&define(e)}.call(this),function(){this.App||(this.App={}),App.cable=ActionCable.createConsumer()}.call(this);