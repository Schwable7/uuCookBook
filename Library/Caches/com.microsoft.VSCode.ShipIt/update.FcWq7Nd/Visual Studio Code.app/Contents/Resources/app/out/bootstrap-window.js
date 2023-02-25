"use strict";(function(v,a){typeof exports=="object"?module.exports=a():v.MonacoBootstrapWindow=a()})(this,function(){const v=D(),a=$(),t=a.process;async function h(r,d,n){const c=!!t.env.VSCODE_DEV;let m=c;t.sandboxed||t.on("uncaughtException",function(i){b(i,m)});const w=setTimeout(()=>{console.error("[resolve window config] Could not resolve window configuration within 10 seconds, but will continue to wait...")},1e4);performance.mark("code/willWaitForWindowConfig");const e=await a.context.resolveConfiguration();performance.mark("code/didWaitForWindowConfig"),clearTimeout(w),typeof n?.canModifyDOM=="function"&&n.canModifyDOM(e);const{forceDisableShowDevtoolsOnError:s,forceEnableDeveloperKeybindings:u,disallowReloadKeybinding:E,removeDeveloperKeybindingsAfterLoad:O}=typeof n?.configureDeveloperSettings=="function"?n.configureDeveloperSettings(e):{forceDisableShowDevtoolsOnError:!1,forceEnableDeveloperKeybindings:!1,disallowReloadKeybinding:!1,removeDeveloperKeybindingsAfterLoad:!1};m=c&&!s;const _=c||u;let x;_&&(x=y(E)),t.sandboxed||globalThis.MonacoBootstrap.enableASARSupport(e.appRoot);const p=globalThis.MonacoBootstrap.setupNLS();let f=p.availableLanguages["*"]||"en";f==="zh-tw"?f="zh-Hant":f==="zh-cn"&&(f="zh-Hans"),window.document.documentElement.setAttribute("lang",f),t.sandboxed||require.define("fs",[],function(){return require.__$__nodeRequire("original-fs")}),window.MonacoEnvironment={},globalThis._VSCODE_NODE_MODULES=new Proxy(Object.create(null),{get:(i,l)=>(require.__$__nodeRequire??require)(String(l))}),t.sandboxed||(globalThis._VSCODE_PRODUCT_JSON=(require.__$__nodeRequire??require)(e.appRoot+"/product.json"),globalThis._VSCODE_PACKAGE_JSON=(require.__$__nodeRequire??require)(e.appRoot+"/package.json"));const g={baseUrl:`${v.fileUriFromPath(e.appRoot,{isWindows:t.platform==="win32",scheme:"vscode-file",fallbackAuthority:"vscode-app"})}/out`,"vs/nls":p,preferScriptTags:!0};g.trustedTypesPolicy=window.trustedTypes?.createPolicy("amdLoader",{createScriptURL(i){if(i.startsWith(window.location.origin))return i;throw new Error(`Invalid script url: ${i}`)}});const o=c?"../node_modules":"../node_modules.asar";g.paths={"vscode-textmate":`${o}/vscode-textmate/release/main.js`,"vscode-oniguruma":`${o}/vscode-oniguruma/release/main.js`,xterm:`${o}/xterm/lib/xterm.js`,"xterm-addon-canvas":`${o}/xterm-addon-canvas/lib/xterm-addon-canvas.js`,"xterm-addon-search":`${o}/xterm-addon-search/lib/xterm-addon-search.js`,"xterm-addon-unicode11":`${o}/xterm-addon-unicode11/lib/xterm-addon-unicode11.js`,"xterm-addon-webgl":`${o}/xterm-addon-webgl/lib/xterm-addon-webgl.js`,"@vscode/iconv-lite-umd":`${o}/@vscode/iconv-lite-umd/lib/iconv-lite-umd.js`,jschardet:`${o}/jschardet/dist/jschardet.min.js`,"@vscode/vscode-languagedetection":`${o}/@vscode/vscode-languagedetection/dist/lib/index.js`,"vscode-regexp-languagedetection":`${o}/vscode-regexp-languagedetection/dist/index.js`,"tas-client-umd":`${o}/tas-client-umd/lib/tas-client-umd.js`},t.sandboxed||(g.amdModulesPattern=/(^vs\/)|(^vscode-textmate$)|(^vscode-oniguruma$)|(^xterm$)|(^xterm-addon-canvas$)|(^xterm-addon-search$)|(^xterm-addon-unicode11$)|(^xterm-addon-webgl$)|(^@vscode\/iconv-lite-umd$)|(^jschardet$)|(^@vscode\/vscode-languagedetection$)|(^vscode-regexp-languagedetection$)|(^tas-client-umd$)/),typeof n?.beforeLoaderConfig=="function"&&n.beforeLoaderConfig(g),require.config(g),p.pseudo&&require(["vs/nls"],function(i){i.setPseudoTranslation(p.pseudo)}),typeof n?.beforeRequire=="function"&&n.beforeRequire(),require(r,async i=>{try{const l=d(i,e);l instanceof Promise&&(await l,x&&O&&x())}catch(l){b(l,_)}},b)}function y(r){const d=a.ipcRenderer,n=function(s){return[s.ctrlKey?"ctrl-":"",s.metaKey?"meta-":"",s.altKey?"alt-":"",s.shiftKey?"shift-":"",s.keyCode].join("")},c=t.platform==="darwin"?"meta-alt-73":"ctrl-shift-73",m="123",w=t.platform==="darwin"?"meta-82":"ctrl-82";let e=function(s){const u=n(s);u===c||u===m?d.send("vscode:toggleDevTools"):u===w&&!r&&d.send("vscode:reloadWindow")};return window.addEventListener("keydown",e),function(){e&&(window.removeEventListener("keydown",e),e=void 0)}}function b(r,d){d&&a.ipcRenderer.send("vscode:openDevTools"),console.error(`[uncaught exception]: ${r}`),r&&typeof r!="string"&&r.stack&&console.error(r.stack)}function D(){return window.MonacoBootstrap}function $(){return window.vscode}return{load:h}});

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/1ad8d514439d5077d2b0b7ee64d2ce82a9308e5a/core/bootstrap-window.js.map
