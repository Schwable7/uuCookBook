// Copyright (c) 2015-2022 Software602 a.s. All rights reserved.

// debug
var debug = true;
// port to extension background
var tabID;
var backPort = null;
var errConnectExt = "Error connecting to extension";

function Log(msg) {
	console.log(getTime() + " FACE " + msg);
}

function getTime()
{
	var now = new Date();
	var day = now.getDate();
	var month = now.getMonth() + 1;
	var year = now.getFullYear();
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
	if (day < 10)
		day = '0' + day;
	if (month < 10)
		month = '0' + month;
	if (min < 10)
		min = '0' + min;
	if (sec < 10)
		sec = '0' + sec;
	return /*day + "." + month + "." + year + " " +*/ hour + ':' + min + ':' + sec;
}
  
function init()
{
	try {
		/*if (debug)*/ Log("extension version: " + chrome.runtime.getManifest().version);
		Log("extension setting: debug " + (debug ? "ON" : "OFF"));
		// komunikace s javascriptem ze stránky
		window.addEventListener("message", function(event) {
		  // we only accept messages from ourselves
		  if (event.source !== window || event.origin !== window.location.origin)
			return;

		  if (event.data !== undefined && event.data.sender === "fas_formpage") {
			// debug-on, debug-off
			if (event.data.request == "debug-on") {
				debug = true;
				Log("debug ON");
			} else if (event.data.request == "debug-off") {
				debug = false;
				Log("debug OFF");
			}
			if (debug) Log("content script received: host=" + event.data.host + ", " + JSON.stringify(event.data));
			if (event.data.request) {
				// connect
				// ext-version
				// app-version
				// logfile
				// <request><lng>cs</lng><debug>true</debug><task>......</task></request>
				// <task>......</task>
				// stop
				//Log("sendMessageBack(\"" + event.data.request + "\")");
				host = event.data.host;
				//host = "javawff";
				if (host == undefined) {
					host = "appwff";
					if (debug) Log("setting host to default: appwff");
				}
				sendMessageBack(host, event.data.request);
			}
		  }
		}, false);
	}
	catch(ex) {
		Log(ex);
	}
}

function connect(msg) {
	//try {
		if (debug) Log("extension: connecting...");
		
		//if (backPort == null)
			//backPort = chrome.runtime.connect({name: msg.sender});
			if (msg.request == "connect-ext")
				backPort = chrome.runtime.connect({name: msg.sender + "_ext"});
			else
				backPort = chrome.runtime.connect({name: msg.sender + "_app"});
		//Log("backPort: " + backPort);

		backPort.onMessage.addListener(function(msg) {
			if (msg.log) {
				if (debug) Log("background log: " + msg.log);
			}
			else {
				if (debug) Log("message from extension: " + JSON.stringify(msg));
				if (msg.response == "stop") {
					backPort = null;
				}
				window.postMessage(msg, "*");
			}
		});
	/*}
	catch(ex) {
		Log(ex);
	}*/
}

function sendMessageBack(host, request) {
	try {
		if (request == "stop" && backPort == null) {
			window.postMessage({ sender: "chrome_native_extension", response: "stop", result: "already stopped" }, "*");
			return;
		}
		if (request[0] != "<") {
			try {
				msg = {"host": host, "request": request};
				chrome.runtime.sendMessage(msg, function(response) {
					if (debug) Log("direct response from extension: " + JSON.stringify(response));
					if (response != undefined && response.response === "app-version") {
						Log("app-version: " + response.result);
					}
					if (response != undefined && response.tabid != undefined && response.tabid != "") {
						tabID = response.tabid.toString();
						if (debug) Log("current tab id: " + tabID);
					}
					window.postMessage(response, "*");
				});
			}
			catch(ex) {
				if (ex.message.substr(0, errConnectExt.length) == errConnectExt) {
					window.postMessage({ sender: "chrome_native_extension", response: request, result: "notinstalled", lasterror: "FormApps Chrome Extension not found."}, "*");
				}
				else
					throw(ex);
			}
			return;
		}
		//if (backPort == null) {
			if (request == "ext-version")
				msg = { sender: "fas_formpage", request: "connect-ext" };
			else
				msg = { sender: "fas_formpage", request: "connect-app" };
			try {
				connect(msg);
			}
			catch(ex) {
				if (ex.message.substr(0, errConnectExt.length) == errConnectExt) {
					window.postMessage({ sender: "chrome_native_extension", response: request, result: "notinstalled", lasterror: "FormApps Chrome Extension not found."}, "*");
					return;
				}
				else
					throw(ex);
			}
		//}
		msg = {host: host, request: request, tabid: tabID};
		if (debug) Log("send message to background: " + JSON.stringify(msg));
		backPort.postMessage(msg);
	}
	catch(ex) {
		Log(ex);
	}
}

try {
	// DIV pro detekci rozsireni
	var fillerForm = document.getElementById('wf_fillerform');
	var fasExt = document.getElementById('wf_fas_extension');
	if (fillerForm != null && fasExt == null) {
		var extNode = document.createElement('div');
		extNode.setAttribute("id", "wf_fas_extension");
		extNode.setAttribute("data-extversion", chrome.runtime.getManifest().version);
		extNode.setAttribute("style", "visibility: hidden");
		//extNode.innerHTML = 'FAS';
		document.body.appendChild(extNode);
	}

	init();
}
catch(ex) {
	Log(ex);
}
