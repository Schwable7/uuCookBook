// Copyright (c) 2015-2022 Software602 a.s. All rights reserved.

var HOST_PATH = "cz.software602.chrome.";
var lastRequest = null;
var lastError = null;
// packets
var packetMsg = "";
// debug
var debug = true;
// port maps
var usePortMap = false;
// ports to foreground
var forePortMap = new PortMap();
// ports to native application
var nativePortMap = new PortMap();

function LOG(msg, tabid) {
	try {
		// výběr portu
		var fPort = forePortMap.getActivePort(tabid);
		var tabid_msg = "[" + forePortMap.getActivePortKey(tabid) + "] " + msg;
		console.log(getTime() + " " + tabid_msg)
		//if (debug) console.log("fPort: " + JSON.stringify(fPort));
		// ochrana proti disconnected portu
		if (fPort != null && (!usePortMap || forePortMap.getPort(tabid) != null)) {
			fPort.postMessage({log: tabid_msg});
		}
	}
	catch(ex) {
		console.log(getTime() + " " + ex);
	}
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

function errorMsg(request, lastError) {
	msg = null;
	
	if (request[0] == "<" && lastError != null)
		msg = {sender: "chrome_native_extension", response: "response", result: "<response result=\"error\" lasterror=\"" + lastError.message + "\"></response>", lasterror: lastError.message};
	else if (request[0] == "<")
		msg = {sender: "chrome_native_extension", response: "response", result: "<response result=\"error\"></response>"};
	else if (lastError != null)
		msg = {sender: "chrome_native_extension", response: request, result: "notinstalled", lasterror: lastError.message};
	else
		msg = {sender: "chrome_native_extension", response: request, result: "notinstalled"};
	
	return msg;
}

function isFirefox()
{
	return navigator.userAgent.indexOf('Firefox') != -1;
}

function onDirectMessage(request, sender, sendResponse) {
	var sender_tab_id = "";
	
	try {
		//if (debug) LOG("direct message sender: " + JSON.stringify(sender));
		if (sender != undefined && sender.tab != undefined && sender.tab.id != undefined) {
			sender_tab_id = sender.tab.id.toString();
		}
		if (debug || request.request == "debug-on") LOG("direct message received: " + JSON.stringify(request), sender_tab_id);
		//if (usePortList) {
		//	request.tabid = sender.tab.id;
		//}
		host = request.host;
		//if (host == undefined)
		//	host = "appwff";
		request.host = undefined;
		if (request.request == "ext-version") {
			lastRequest = null;
		
			if (usePortMap)
				sendResponse({sender: "chrome_native_extension", tabid: sender_tab_id, response: "ext-version", result: chrome.runtime.getManifest().version});
			else {
				//sendResponse({sender: "chrome_native_extension", response: "ext-version", result: chrome.app.getDetails().version});
				sendResponse({sender: "chrome_native_extension", response: "ext-version", result: chrome.runtime.getManifest().version});
			}
			return true;
		}
		if (request.request == "debug-on") {
			debug = true;
			LOG("debug ON");
			return true;
		} else if (request.request == "debug-off") {
			debug = false;
			LOG("debug OFF");
			return true;
		}
		chrome.runtime.sendNativeMessage(HOST_PATH + host, request, function(response) {
			try {
				if (debug) LOG("direct native response: " + JSON.stringify(response), sender_tab_id);
				if (response == undefined) {
					if (chrome.runtime.lastError != null)
						sendResponse(errorMsg(request.request, chrome.runtime.lastError));
				}
				else {
					if (response.response == "app-version") {
						if (!usePortMap) {
							LOG("app-version: " + response.result, sender_tab_id);
							if (response.tabid != undefined) {
								usePortMap = true;
								LOG("usePortMap ON", sender_tab_id);
							}
						}
						if (usePortMap && response.tabid === "") {
							response.tabid = sender_tab_id;
						}
					}
					sendResponse(response);
				}
			}
			catch(ex) {
				LOG(ex);
			}
		});
		return true;
	}
	catch(ex) {
		LOG(ex);
	}
}

try {
	var settings = "settings: debug " + (debug ? "ON" : "OFF");
	settings += ", usePortMap " + (usePortMap ? "ON" : "OFF");
	LOG(settings);
	
	chrome.runtime.onConnect.addListener(onConnect);
	chrome.runtime.onMessage.addListener(onDirectMessage);
}
catch(ex) {
	LOG(ex);
}

function onConnect(port) {
	var port_sender_tab_id = "";
	
	try {
		if (port != undefined && port.sender != undefined && port.sender.tab != undefined && port.sender.tab.id != undefined) {
			port_sender_tab_id = port.sender.tab.id.toString();
		}
		//if (debug) LOG("JSON port: '" + JSON.stringify(port) + "'");
		//if (debug) LOG("port.sender.tab.id: " + port.sender.tab.id);
		console.assert(port.name == "fas_formpage_ext" || port.name == "fas_formpage_app");
		if (debug) LOG("connect received from: " + port.name, port_sender_tab_id);
		//if (port.name == "fas_formpage_app" && nativePort == null)
		//	connectNative();

		port.onMessage.addListener(onMessage);
		if (forePortMap.getPort(port_sender_tab_id) == null) {
			port.onDisconnect.addListener(onForeDisconnected);
		}
		forePortMap.connect(port_sender_tab_id, port);
	}
	catch(ex) {
		LOG(ex, port_sender_tab_id);
	}
}

function onMessage(msg, sender) {
	var sender_sender_tab_id= "";
	
	try {
		//if (debug) LOG("message sender: '" + JSON.stringify(sender) + "'");
		if (sender != undefined && sender.sender != undefined && sender.sender.tab != undefined && sender.sender.tab.id != undefined) {
			sender_sender_tab_id = sender.sender.tab.id.toString();
		}
		else if (msg.tabid != undefined) {
			sender_sender_tab_id = msg.tabid;
		}
		if (debug) LOG("message received: " + JSON.stringify(msg), sender_sender_tab_id);	// request from formapps.js (html)
		//if (debug) LOG("message sender: '" + JSON.stringify(sender) + "'", sender_sender_tab_id);
		if (msg.request == "ext-version") {
			lastRequest = null;
			var fPort = forePortMap.getActivePort(sender_sender_tab_id);
			if (usePortMap)
				fPort.postMessage({ sender: "chrome_native_extension", tabid: sender_sender_tab_id, response: "ext-version", result: chrome.runtime.getManifest().version });
			else {
				//fPort.postMessage({ sender: "chrome_native_extension", response: "ext-version", result: chrome.app.getDetails().version });
				fPort.postMessage({ sender: "chrome_native_extension", response: "ext-version", result: chrome.runtime.getManifest().version });
			}
		}
		else {
			host = msg.host;
			msg.host = undefined;
			if (msg.request[0] != "<") {
				sendNativeMessage(host, msg);
			}
			else {
				lastRequest = msg.request;
				var nPort = connectNative(host, sender_sender_tab_id);
				//if (nativePort != null) {
				//if (lastError == null) {
					if (usePortMap) {
						msg.tabid = sender_sender_tab_id;
					}
					if (debug) LOG("posting message to native: 'host=" + host + ", " + JSON.stringify(msg) + "'", sender_sender_tab_id);
					nPort.postMessage(msg);	// send request to app
				//}
			}
			lastError = null;
		}
	}
	catch(ex) {
		LOG(ex, sender_sender_tab_id);
	}
}

function onForeDisconnected(port) {
	var port_sender_tab_id = port.sender.tab.id.toString();
	
	forePortMap.disconnect(port_sender_tab_id);

	//if (debug) LOG("forePort: " + JSON.stringify(port));
	if (debug) LOG("fPort disconnected: " + port_sender_tab_id + (chrome.runtime.lastError ? ", " + chrome.runtime.lastError.message : ""));
	//if (chrome.runtime.lastError && chrome.runtime.lastError.message) {
	//	lastError = chrome.runtime.lastError;
	//}
}

function connectNative(host, tabid) {
	try {
		var nPort;
		
		if (debug) LOG("connecting to native messaging host '" + HOST_PATH + host + "'", tabid);
		if (isFirefox()) {
			nPort = chrome.runtime.connectNative(HOST_PATH + host);
		}
		else {
			nPort = chrome.extension.connectNative(HOST_PATH + host);
		}
		if (debug) LOG("connected to native messaging host '" + HOST_PATH + host + "'", tabid);
		nativePortMap.connect(tabid, nPort);
		nPort.onMessage.addListener(onNativeMessage);
		nPort.onDisconnect.addListener(onNativeDisconnected);
		
		return nPort;
	}
	catch(ex) {
		LOG(ex, tabid);
	}
}

function onNativeMessage(msg) {
	try {
		if (msg.response == "packet") {
			packetMsg += msg.result;
			if (debug) LOG("native packet received: " + JSON.stringify(msg), msg.tabid);
		}
		else {
			// výběr portu (podle toho, jestli aplikace vrátí zpátky tabid)
			fPort = forePortMap.getActivePort(msg.tabid);
			if (packetMsg != "") {
				packetMsg += msg.result;
				if (debug) LOG("native packet received: " + JSON.stringify(msg), msg.tabid);
				if (fPort != null)
					fPort.postMessage({sender: msg.sender, taskid: msg.taskid, response: msg.response, result: packetMsg, tabid: msg.tabid});
				packetMsg = "";
			}
			else {
				if (debug) LOG("native response received: " + JSON.stringify(msg), msg.tabid);
				lastRequest = null;
				if (fPort != null)
					fPort.postMessage(msg);
			}
			// výběr native portu
			var nPort = nativePortMap.getActivePort(msg.tabid);
			if (debug) LOG("nPort disconnect: (" + nativePortMap.getActivePortKey(msg.tabid) + ")", msg.tabid);
			nPort.disconnect();	// nezavolá se onDisconnect!
			onNativeDisconnected(nPort);
			nativePortMap.disconnect(msg.tabid);
		}
	}
	catch(ex) {
		LOG(ex, msg.tabid);
	}
}

function nativeResponse(msg) {
	LOG("direct native response received: " + JSON.stringify(msg), msg.tabid);
	lastRequest = null;
	//forePort.postMessage(msg);
	//sendResponse(msg);
}

function sendNativeMessage(host, msg) {
	try {
		/*
		message = {"request": msg};
		nativePort.postMessage(message);
		if (debug) LOG("sending message to native: '" + JSON.stringify(msg) + "'");
		*/
		if (debug) LOG("sending message to native: 'host=" + host + ", " + JSON.stringify(msg) + "'", msg.tabid);
		chrome.runtime.sendNativeMessage(HOST_PATH + host, msg, nativeResponse);
	}
	catch(ex) {
		LOG(ex, msg.tabid);
	}
}

function onNativeDisconnected(port) {
	if (debug) LOG("nPort disconnected: " + (chrome.runtime.lastError ? chrome.runtime.lastError.message : ""));
	if (chrome.runtime.lastError && chrome.runtime.lastError.message) {
		lastError = chrome.runtime.lastError;
		//alert(lastError.message);
	}
	// send "stop"
	//forePort.postMessage({sender: "chrome_native_extension", response: "stop", result: lastError.message, lasterror: lastError.message});
	// send error response
	var fPort = forePortMap.getActivePort();
	if (lastRequest != null && lastError != null && fPort != null)
		fPort.postMessage(errorMsg(lastRequest, lastError));
}


function PortMap() {
	this.forePort = null;
	this.forePortKey = null;
	this.map = {};
	this.portDisconnectListeners = {};
	
	this.connect = function(key, value) {
		this.forePort = value;
		if (usePortMap) {
			this.forePortKey = key;
			this.map[key] = value;
		}
		this.portDisconnectListeners[key] = true;
	}

	this.getPort = function(key) {
		if (key == undefined || key.length == 0) return null;
		if (this.map[key] == undefined) return null;
		return this.map[key];
	}
	
	this.getActivePort = function(key) {
		if (!usePortMap) return this.forePort;
		if (key == undefined || key.length == 0) return this.forePort;
		if (this.map[key] == undefined) return this.forePort;
		return this.map[key];
	}
	
	this.getActivePortKey = function(key) {
		if (!usePortMap) return " ";
		if (key == undefined || key.length == 0) return " ";
		if (this.map[key] == undefined) return " ";
		return key;
	}
	
	this.disconnect = function(key) {
		if (!usePortMap || key === this.forePortKey) {
			this.forePort = null;
			this.forePortKey = null;
		}
		if (usePortMap) {
			this.remove(key);
		}
		delete this.portDisconnectListeners[key];
	}
	
	this.remove = function(key) {
		delete this.map[key];
	}
}

chrome.runtime.onInstalled.addListener((details) => {
	const currentVersion = chrome.runtime.getManifest().version
	const previousVersion = details.previousVersion
	const reason = details.reason
   
	console.log(`Previous Version: ${previousVersion }`)
	console.log(`Current Version: ${currentVersion }`)

	switch (reason) {
		case 'install':
			console.log('New user installed the extension.')
			break;
		case 'update':
			console.log('User has updated their extension.')
			break;
		case 'chrome_update':
		case 'shared_module_update':
		default:
			console.log('Other install events within the browser')
			break;
	}
	
	chrome.tabs.query({} ,function (tabs) {
		for (var i = 0; i < tabs.length; i++) {
			var tab = tabs[i];
			chrome.tabs.executeScript(tab.id, { allFrames: true, file: "formapps.js" });
		}
	});
});
