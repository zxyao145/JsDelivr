/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.2.0 (2020-02-13)
 */
!function(l){"use strict";function n(){}function i(n){return function(){return n}}function t(){return a}var e,r=tinymce.util.Tools.resolve("tinymce.PluginManager"),c=i(!1),u=i(!0),a=(e={fold:function(n,t){return n()},is:c,isSome:c,isNone:u,getOr:f,getOrThunk:s,getOrDie:function(n){throw new Error(n||"error: getOrDie called on none.")},getOrNull:i(null),getOrUndefined:i(undefined),or:f,orThunk:s,map:t,each:n,bind:t,exists:c,forall:u,filter:t,equals:o,equals_:o,toArray:function(){return[]},toString:i("none()")},Object.freeze&&Object.freeze(e),e);function o(n){return n.isNone()}function s(n){return n()}function f(n){return n}function m(n,t){return-1!==n.indexOf(t)}function g(n,t){return m(n.title.toLowerCase(),t)||function(n,t){for(var e=0,r=n.length;e<r;e++){if(t(n[e],e))return!0}return!1}(n.keywords,function(n){return m(n.toLowerCase(),t)})}function d(n,t,e){for(var r=[],o=t.toLowerCase(),i=e.fold(function(){return c},function(t){return function(n){return t<=n}}),u=0;u<n.length&&(0!==t.length&&!g(n[u],o)||(r.push({value:n[u]["char"],text:n[u].title,icon:n[u]["char"]}),!i(r.length)));u++);return r}function y(n,t){for(var e=D(n),r=0,o=e.length;r<o;r++){var i=e[r];t(n[i],i)}}function p(n,t){return function(n,t){return S.call(n,t)}(n,t)?n[t]:t}function v(n){return function(n,e){return x(n,function(n,t){return{k:t,v:e(n,t)}})}(z(n),function(n){return T({keywords:[],category:"user"},n)})}function h(e,o,n){var r=k(A.none()),u=k(A.none());e.on("init",function(){L.load(n,o).then(function(n){var t=v(e);!function(n){var o={},i=[];y(n,function(n,t){var e={title:t,keywords:n.keywords,"char":n["char"],category:p(M,n.category)},r=o[e.category]!==undefined?o[e.category]:[];o[e.category]=r.concat([e]),i.push(e)}),r.set(A.some(o)),u.set(A.some(i))}(P(n,t))},function(n){l.console.log("Failed to load emoticons: "+n),r.set(A.some({})),u.set(A.some([]))})});var i=function(){return u.get().getOr([])},c=function(){return r.get().isSome()&&u.get().isSome()};return{listCategories:function(){return[I].concat(D(r.get().getOr({})))},hasLoaded:c,waitForLoad:function(){return c()?E.resolve(!0):new E(function(n,t){var e=15,r=N.setInterval(function(){c()?(N.clearInterval(r),n(!0)):--e<0&&(l.console.log("Could not load emojis from url: "+o),N.clearInterval(r),t(!1))},100)})},listAll:i,listCategory:function(t){return t===I?i():r.get().bind(function(n){return A.from(n[t])}).getOr([])}}}var b,O,w=function(e){function n(){return o}function t(n){return n(e)}var r=i(e),o={fold:function(n,t){return t(e)},is:function(n){return e===n},isSome:u,isNone:c,getOr:r,getOrThunk:r,getOrDie:r,getOrNull:r,getOrUndefined:r,or:n,orThunk:n,map:function(n){return w(n(e))},each:function(n){n(e)},bind:t,exists:t,forall:t,filter:function(n){return n(e)?o:a},toArray:function(){return[e]},toString:function(){return"some("+e+")"},equals:function(n){return n.is(e)},equals_:function(n,t){return n.fold(c,function(n){return t(e,n)})}};return o},A={some:w,none:t,from:function(n){return null===n||n===undefined?a:w(n)}},j=(b="function",function(n){return function(n){if(null===n)return"null";var t=typeof n;return"object"==t&&(Array.prototype.isPrototypeOf(n)||n.constructor&&"Array"===n.constructor.name)?"array":"object"==t&&(String.prototype.isPrototypeOf(n)||n.constructor&&"String"===n.constructor.name)?"string":t}(n)===b}),C=Array.prototype.slice,k=(j(Array.from)&&Array.from,function(n){function t(){return e}var e=n;return{get:t,set:function(n){e=n},clone:function(){return k(t())}}}),T=function(){return(T=Object.assign||function(n){for(var t,e=1,r=arguments.length;e<r;e++)for(var o in t=arguments[e])Object.prototype.hasOwnProperty.call(t,o)&&(n[o]=t[o]);return n}).apply(this,arguments)},_=Object.prototype.hasOwnProperty,P=(O=function(n,t){return t},function(){for(var n=new Array(arguments.length),t=0;t<n.length;t++)n[t]=arguments[t];if(0===n.length)throw new Error("Can't merge zero objects");for(var e={},r=0;r<n.length;r++){var o=n[r];for(var i in o)_.call(o,i)&&(e[i]=O(e[i],o[i]))}return e}),D=Object.keys,S=Object.hasOwnProperty,x=function(n,r){var o={};return y(n,function(n,t){var e=r(n,t);o[e.k]=e.v}),o},L=tinymce.util.Tools.resolve("tinymce.Resource"),N=tinymce.util.Tools.resolve("tinymce.util.Delay"),E=tinymce.util.Tools.resolve("tinymce.util.Promise"),F=function(n,t){return n.getParam("emoticons_database_url",t+"/js/emojis"+n.suffix+".js")},q=function(n){return n.getParam("emoticons_database_id","tinymce.plugins.emoticons","string")},z=function(n){return n.getParam("emoticons_append",{},"object")},I="All",M={symbols:"Symbols",people:"People",animals_and_nature:"Animals and Nature",food_and_drink:"Food and Drink",activity:"Activity",travel_and_places:"Travel and Places",objects:"Objects",flags:"Flags",user:"User Defined"},U="pattern",R=function(e,i){function n(){return{title:"Emoticons",size:"normal",body:{type:"tabpanel",tabs:function(n,t){for(var e=n.length,r=new Array(e),o=0;o<e;o++){var i=n[o];r[o]=t(i,o)}return r}(i.listCategories(),function(n){return{title:n,name:n,items:[o,c]}})},initialData:t,onTabChange:function(n,t){u.set(t.newTabName),r.throttle(n)},onChange:r.throttle,onAction:function(n,t){"results"===t.name&&(function(n,t){n.insertContent(t)}(e,t.value),n.close())},buttons:[{type:"cancel",text:"Close",primary:!0}]}}var t={pattern:"",results:d(i.listAll(),"",A.some(300))},u=k(I),r=function(e,r){var o=null;return{cancel:function(){null!==o&&(l.clearTimeout(o),o=null)},throttle:function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];null!==o&&l.clearTimeout(o),o=l.setTimeout(function(){e.apply(null,n),o=null},r)}}}(function(n){!function(n){var t=n.getData(),e=u.get(),r=i.listCategory(e),o=d(r,t[U],e===I?A.some(300):A.none());n.setData({results:o})}(n)},200),o={label:"Search",type:"input",name:U},c={type:"collection",name:"results"},a=e.windowManager.open(n());a.focus(U),i.hasLoaded()||(a.block("Loading emoticons..."),i.waitForLoad().then(function(){a.redial(n()),r.throttle(a),a.focus(U),a.unblock()})["catch"](function(n){a.redial({title:"Emoticons",body:{type:"panel",items:[{type:"alertbanner",level:"error",icon:"warning",text:"<p>Could not load emoticons</p>"}]},buttons:[{type:"cancel",text:"Close",primary:!0}],initialData:{pattern:"",results:[]}}),a.focus(U),a.unblock()}))},B=function(n,t){function e(){return R(n,t)}n.ui.registry.addButton("emoticons",{tooltip:"Emoticons",icon:"emoji",onAction:e}),n.ui.registry.addMenuItem("emoticons",{text:"Emoticons...",icon:"emoji",onAction:e})};!function G(){r.add("emoticons",function(n,t){var e=F(n,t),r=q(n),o=h(n,e,r);B(n,o),function(r,o){r.ui.registry.addAutocompleter("emoticons",{ch:":",columns:"auto",minChars:2,fetch:function(t,e){return o.waitForLoad().then(function(){var n=o.listAll();return d(n,t,A.some(e))})},onAction:function(n,t,e){r.selection.setRng(t),r.insertContent(e),n.hide()}})}(n,o)})}()}(window);