/**
 *By Jie. 2018/04/08
 *核心js库
 **/
const localpath = "http://192.168.1.88:8080/";
//const localpath = "http://120.27.26.19:9527/";
//const rootPath = "http://192.168.1.88:8089/bsys";
const rootPath = "http://gj.i2f2f.com/index.php/";
const docPath = "https://owa-box.vips100.com";
const otherRootPath = "http://oa.yunagile.com:8068/bsys";
var basePath = rootPath;
var pref = weex.requireModule("storage");
var stream = weex.requireModule("stream");
var modal = weex.requireModule("modal");
const navigator = weex.requireModule("navigator");
var bsessionid = pref.getItem('bsessionid');
var asCore = {
	localpath: localpath,
	rootPath: basePath,
	docPath: docPath,
	otherRootPath: otherRootPath,
	bsessionid: bsessionid,

	/* 自动登录代码 */
	autoLogin: function(callback) {
		const progress = weex.requireModule('progress');
		var s = this;
		/* 判断当前是否记住了密码，没有记住密码那只能跳出登录界面自行登录 */
		pref.getItem("as_username", event => {

			var username = event.data;
			if (event.result != "success") {
				navigator.push("root:app/login/login.js");
				return false
			}
			pref.getItem("as_password", res => {
				if (res.result != "success") {
					navigator.push("root:app/login/login.js");
					return false
				}
				var ps = res.data;
				//progress.showFull("自动登录中...");
				/* 自动登录 */


				stream.fetch({
						method: "POST",
						url: basePath + "web/login/index",
						type: "json",
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
						},
						body: s.toParams({
							account: username,
							password: ps
						})
					},
					ret => {
						if (!ret.ok) {
							s.toast("自动登录失败,请手动登录");
							//progress.dismiss();
							navigator.push("root:app/login/login.js");
						} else {
							weex.requireModule('log').log({
								msg: ret.data,
								level: "warn"
							})
							var re = ret.data;
							if (re.code == "200") {
								//progress.dismiss();
								s.setBsessionid(re.data.users_uuid);
								if (callback) callback();
							} else {
								s.toast("自动登录失败,请重新登录");
								//progress.dismiss();
								navigator.push("root:app/login/login.js");
							}
						}
					});

			});
		});
	},
	/* 获取用户信息 */
	getContext: function(callback) {
		pref.getItem('context', event => {
			var value = event.data;
			try {
				value = JSON.parse(value);
			} catch (error) {
				value = {};
			}
			if (callback) callback(value);
		});
	},
	/* 设置用户信息 */
	setContext: function(value) {
		value = value ? JSON.stringify(value) : '';
		pref.setItem('context', value);
	},
	setBsessionid: function(value) {
		pref.setItem('users_id', value);
	},
	getBsessionid: function(callback) {
		pref.getItem('users_id', event => {
			var value = event.data;
			if (event.result != "success") {
				value = "";
			}
			if (callback) callback(value);
		});
	},
	getTime: function(callback) {
		pref.getItem('imgtime', event => {
			if (event.result == "success") {
				var value = event.data;
				if (callback) callback(value);
			} else {
				if (callback) callback("10000");
			}
		});
	},
	setTime: function(time) {
		pref.setItem('imgtime', time);
	},
	/* 与web端的ajax用法一致 */
	post: function(action, param, callBack) {
		let that = this;
		stream.fetch({
				method: "POST",
				url: basePath + action,
				type: "json",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
				},
				body: that.toParams(param)
			},
			function(ret) {
				// that.toast(ret);
				if (!ret.ok) {
					if (ret.status == 500) {
						that.toast(ret.statusText);
						// if (callBack) callBack(ret.statusText, false);
					} else if (ret.status == 550) {
						// if (callBack) callBack("timeout", false);
						that.toast("request timeout");
					} else {
						// if (ret.status == -1) {
						// 	that.toast('网络连接失败,请检查网络设置');
						// } 
					}
					if (callBack) callBack(ret.statusText, ret.ok);
				} else {
					var data = ret.data;
					try {
						if (callBack) callBack(data, ret.ok);
					} catch (e) {

					}
				}
			});
	},

	/* 解析URL */
	rendUrl: function(url, callback) {
		var s = this;
		s.getBsessionid(bs => {
			if (url.indexOf("bsessionid=") == -1) {
				if (url.indexOf("?") > -1) {
					url += "&as_call_type=ajax&bsessionid=" + bs;
				} else {
					url += "?as_call_type=ajax&bsessionid=" + bs;
				}
			}
			if (callback) callback(basePath + url);
		});
	},
	logout: function(callback) {
		this.post("/as/logout", {}, function(data) {
			pref.removeItem("bsessionid");
			if (callback) callback(data);
		});
	},
	toParams: function(obj) {
		var param = ""
		for (const name in obj) {
			if (typeof obj[name] != 'function') {
				param += "&" + name + "=" + encodeURI(obj[name])
			}
		}
		return param.substring(1)
	},
	toast: function(msg) {
		modal.toast({
			message: msg
		});
	},
	alert: function(msg) {
		modal.alert({
			message: msg
		});
	}

};
export default asCore;
