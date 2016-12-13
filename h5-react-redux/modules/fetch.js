import fetch from 'isomorphic-fetch'
import * as AppConst from '../constants/AppConst'
export function fetchPost(url, data = {}) {
	return fetch(AppConst.SERVER_URL + url, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: toQueryString(data)
		})
		.then(response => response.json())
}

function toQueryString(obj) {
	return obj ? Object.keys(obj).sort().map(function(key) {
		var val = obj[key];
		if (Array.isArray(val)) {
			return val.sort().map(function(val2) {
				return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
			}).join('&');
		}
		return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	}).join('&') : '';
}
export function fetchGet(url, data = {}) {
	var _url = paramObj2paramStr(url, data)
	return fetch(AppConst.SERVER_URL + _url, {
			credentials: 'include'
		})
		.then(response => response.json())
}

export function checkNetwork(success, failed) {
	var img = new Image();
	if (!!success) {
		img.onload = success;
	}
	if (!!failed) {
		img.onerror = failed;
	}
	img.src = AppConst.IMGSRC['logo'] + '?timestamp=' + (+new Date());
}

export function getQueryStringByName(name) {
	var result = decodeURIComponent(location.search).match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return result[1];
}

//
//{name:'jack',age:18} => name=jack&age=18
export function paramObj2paramStr(url, obj = {}) {
	var newUrl = ''
	var paramStr = ''
	for (var i in obj) {
		paramStr += '&' + i + '=' + obj[i]
	}
	if (url.indexOf('&') > -1) {
		newUrl = url + paramStr
	} else if (url.indexOf('?') > -1) {
		if (url.indexOf('=') > -1) {
			newUrl = url + paramStr
		} else {
			newUrl = url + paramStr.substring(1)
		}

	} else {
		newUrl = url + '?' + paramStr.substring(1)
	}
	return newUrl
}
// name=jack&age=18 => {name:'jack',age:18}
export function paramStr2paramObj(url) {
	var search = decodeURIComponent(url).replace(/^\s+/, '').replace(/\s+$/, '').match(/([^?#]*)(#.*)?$/); //提取location.search中'?'后面的部分 
	if (!search) {
		return {};
	}
	var searchStr = search[1];
	var searchHash = searchStr.split('&');

	var ret = {};
	for (var i = 0, len = searchHash.length; i < len; i++) { //这里可以调用each方法 
		var pair = searchHash[i];
		if ((pair = pair.split('='))[0]) {
			var key = pair.shift();
			var value = pair.length > 1 ? pair.join('=') : pair[0];
			console.log()
			if (value != undefined) {
				value = value;
			}
			if (key in ret) {
				if (ret[key].constructor != Array) {
					ret[key] = [ret[key]];
				}
				ret[key].push(value);
			} else {
				ret[key] = value;
			}
		}
	}
	return ret;
}