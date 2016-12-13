import * as AppConst from '../constants/AppConst'
import {
	getQueryStringByName, paramObj2paramStr, fetchPost, fetchGet
}
from '../modules/fetch'
import clearSpace from '../lib/vera/util/clearSpace'
import Validate from '../lib/vera/util/validate'
import {
	filterNotChinese
}
from '../modules/validWithdraw'
import {getNextAuthType} from  '../modules/cashier'

var paramError = {
	content: "网络错误，请重新尝试",
	buttonType: "BUTTON_TYPE_CENTER", //BUTTON_TYPE_CENTER BUTTON_TYPE_LEFTRIGHT
	buttonCenterText: "确定",
	buttonCenterEventMethod: function() {
		// location.reload()
	}
}

export function dispatchFetchPost(url, data = {}) {
	return dispatch => {
		return fetchPost(urlVersion(url), data)
			.catch(e => {
				//VHPF.ui.hideLoading();
				//VHPF.ui.showDialog(paramError)
			})
	}
}

export function dispatchFetchGet(url, data = {}) {
	return dispatch => {
		return fetchGet(urlVersion(url), data)
			.catch(e => {
				VHPF.ui.hideLoading();
				VHPF.ui.showDialog(paramError)
			})
	}
}


function urlVersion(url) {
	var version = 'v=' + new Date().getTime()
	if (url.indexOf('?') > -1) {
		return url + '&' + version
	} else {
		return url + '?' + version
	}
}
/**
	app	pub
		namespace
			PUB_
*/
export function PUB_failureShow() {
	return {
		type: AppConst.PUB_FAILURE_SHOW
	}
}
export function PUB_failureHide() {
	return {
		type: AppConst.PUB_FAILURE_HIDE
	}
}

export function PUB_dialogShow() {
	return {
		type: AppConst.PUB_DIALOG_SHOW
	}
}
export function PUB_dialogHide() {
	return {
		type: AppConst.PUB_DIALOG_HIDE
	}
}

export function PUB_loadingShow() {
	return {
		type: AppConst.PUB_LOADING_SHOW
	}
}
export function PUB_loadingHide() {
	return {
		type: AppConst.PUB_LOADING_HIDE
	}
}

export function PUB_traceShow(val) {
	return {
		type: AppConst.PUB_TRACE_SHOW,
		data: val
	}
}
export function PUB_traceHide() {
	return {
		type: AppConst.PUB_TRACE_HIDE
	}
}

export function PUB_toastShow(val) {
	return {
		type: AppConst.PUB_TOAST_SHOW,
		data: val
	}
}
export function PUB_toastHide() {
	return {
		type: AppConst.PUB_TOAST_HIDE
	}
}

export function PUB_userInfo(userInfo) {
	return {
		type: AppConst.PUB_USER_INFO,
		data: userInfo
	}
}

export function PUB_fetchUserInfo(fn) {
	return dispatch => {
		return dispatch(dispatchFetchGet('/getUserInfo?caseId=0'))
			.then(json => {
				//VHPF.ui.hideLoading()
				if (json.code == 0) {
					dispatch(PUB_userInfo(json.data))
				} else {

				}

			})
	}
}



export function DEMO_USERNAME_IPT_WRITE_VALUE(val) {
	return {
		type: AppConst.DEMO_USERNAME_IPT_WRITE_VALUE,
		data: val
	}
}

export function VERA_INPUTS_A_IPT_WRITE_VALUE(val) {
	return {
		type: AppConst.VERA_INPUTS_A_IPT_WRITE_VALUE,
		data: val
	}
}

export function VERA_INPUTS_B_IPT_WRITE_VALUE(val) {
	return {
		type: AppConst.VERA_INPUTS_B_IPT_WRITE_VALUE,
		data: val
	}
}

export function VERA_INPUTS_C_IPT_WRITE_VALUE(val) {
	return {
		type: AppConst.VERA_INPUTS_C_IPT_WRITE_VALUE,
		data: val
	}
}



// LOGIN
export function LOGIN_0_setUsername(val) {
	return {
		type: AppConst.LOGIN_USERNAME_IPT,
		data: val
	}
}
export function LOGIN_0_setPassword(val) {
	return {
		type: AppConst.LOGIN_PASSWORD_IPT,
		data: val
	}
}
export function LOGIN_0_loginBtn_Able(val) {
	return {
		type: AppConst.LOGIN_0_LOGINBUTTON_ABLE,
		data: val
	}
}
export function LOGIN_0_SUBMITLOGIN(data, callback) {
	return dispatch => {
		dispatch(LOGIN_0_loginBtn_Able(false));
		return dispatch(dispatchFetchPost('/login?caseId=0', data, true))
			.then(json => {
				dispatch(LOGIN_0_loginBtn_Able(true));

			})
	}
}


export function CASHIER_modalShowPayType(isShow) {
	return {
		type: AppConst.CASHIER_MODAL_SHOW_PAY_TYPE,
		data: isShow,
	}
}

export function CASHIER_dialogShowMessage(isShow) {
	return {
		type: AppConst.CASHIER_DIALOG_SHOW_MESSAGE,
		data: isShow,
	}
}

export function CASHIER_dialogShowPassword(isShow) {
	return {
		type: AppConst.CASHIER_DIALOG_SHOW_PASSWORD,
		data: isShow,
	}
}


export function CASHIER_MODAL_SHOW_MARKETING(isShow) {
	return {
		type: AppConst.CASHIER_MODAL_SHOW_MARKETING,
		data: isShow
	}
}

export function CASHIER_selectPayType(id) {
	return {
		type: AppConst.CASHIER_SELECT_PAY_TYPE,
		data: id
	}
}

export function CASHIER_selectMarketing(id) {
	return {
		type: AppConst.CASHIER_SELECT_MARKETING,
		data: id
	}
}

export function CASHIER_PAY_BTN_ABLE(isShow) {
	return {
		type: AppConst.CASHIER_PAY_BTN_ABLE,
		data: isShow
	}
}

export function CASHIER_SET_CASHIER_INFO(val) {
	return {
		type: AppConst.CASHIER_SET_CASHIER_INFO,
		data: val
	}
}

export function CASHIER_GET_CASHIER_INFO(selectedPayType) {
	return dispatch => {
		var caseId = 0
		if (selectedPayType.selectedPayTypeId != undefined) {
			caseId = 3
			dispatch(CASHIER_selectPayType(selectedPayType.selectedPayTypeId))
		}
		dispatch(CASHIER_PAY_BTN_ABLE(false))
		return fetchGet(`/getCashierInfo?caseId=${caseId}`, selectedPayType)
			.then(json => {
				dispatch(CASHIER_PAY_BTN_ABLE(true))
				dispatch(CASHIER_SET_CASHIER_INFO(json.data))
				console.log(json)
			})
	}
}



// 验证码
export function PUB_writeIdentifyCode(val) {
	return {
		type: AppConst.PUB_IDENTIFY_CODE_VAL,
		data: val
	}
}

export function PUB_startIdentifyCodeCountdown() {
	return {
		type: AppConst.PUB_COUNDTDOWN_START
	}
}
export function PUB_stopIdentifyCodeCountdown() {
	return {
		type: AppConst.PUB_COUNDTDOWN_STOP
	}
}
export function PUB_identifyCodeBtnAbled() {
	return {
		type: AppConst.PUB_IDENTIFY_CODE_BTN_ABLED
	}
}

export function PUB_identifyCodeBtnDisabled() {
	return {
		type: AppConst.PUB_IDENTIFY_CODE_BTN_DISABLED
	}
}

export function PUB_identifyCodeToken(smsToken) {
	return {
		type: AppConst.PUB_IDENTIFY_CODE_TOKEN,
		data: smsToken
	}
}
export function PUB_identifyCodeCheckedToken(smsToken) {
	return {
		type: AppConst.PUB_IDENTIFY_CODE_CHECKED_TOKEN,
		data: smsToken
	}
}

//发送短信验证码
export function PUB_fetchIdentifyCode(data) {
	return dispatch => {
		dispatch(PUB_identifyCodeBtnDisabled());
		return fetchPost(`/sendSMS4Cashier?caseId=0`, data)
			.then(json => {
				if (json.code == 0) {
					dispatch(PUB_startIdentifyCodeCountdown());

					// 获取验证码token
					dispatch(PUB_identifyCodeToken(json.data.smsToken));
				} else {
					dispatch(PUB_identifyCodeBtnAbled());
				}
			})
	}
}

//  校验支付短信验证码 checkSMS4Cashier
export function PUB_checkSMS4Cashier(data) {
	return (dispatch, getState) => {
		//VHPF.ui.showLoading()
		return fetchPost(`/checkSMS4Cashier?caseId=0`, data)
			.then(json => {
				//json = {code:0,data:{aa:123}}
				if (json.code == 0) {
					dispatch(PUB_identifyCodeCheckedToken(json.data.checkedSmsToken))
					dispatch(PUB_postPayRequset(1))
				} else {
					dispatch(PUB_identifyCodeBtnAbled());
					//VHPF.ui.showToast({content:json.msg});
				}
			})
	}
}

/// password 

export function PUB_setPasswordValue(password) {
	return {
		type: AppConst.PUB_PASSWORD_VAL,
		data: password
	}
}

export function PUB_setPasswordToken(token) {
	return {
		type: AppConst.PUB_PASSWORD_TOKEN,
		data: token
	}
}

//校验支付密码 checkPaypass4Cashier
export function PUB_checkPaypass4Cashier(data) {
	return (dispatch, getState) => {
		//VHPF.ui.showLoading()
		return fetchPost(`/checkPaypass4Cashier?caseId=0`, data)
			.then(json => {
				if (json.code == 0) {
					dispatch(PUB_setPasswordToken(json.data.passToken))
					dispatch(PUB_postPayRequset(2))
				} else {
					//VHPF.ui.showToast({content:json.msg});
				}
			})
	}
}

//提交支付申请 postPayRequset
export function PUB_postPayRequset(currentAuthType) {
	return (dispatch, getState) => {
		var {cashierReducers , appReducers} = getState()  
		var nextAuthType = getNextAuthType(currentAuthType,cashierReducers.authType) 
		if(nextAuthType == 2){
			dispatch(CASHIER_dialogShowPassword(true))
			return
		}else if(nextAuthType == 1){
			dispatch(CASHIER_dialogShowPassword(true))
			return
		}
		var json = {
			selectedMarketingId:cashierReducers.selectedMarketing.id,
			selectedPayTypeId:cashierReducers.selectedPayType.id,
			channelId:cashierReducers.selectedPayType.channelId,
			agreementCode:cashierReducers.selectedPayType.agreementCode,
			smsToken: appReducers.identifycode.checkedSmsToken,
			passToken:appReducers.password.passToken
		}
		//VHPF.ui.showLoading()
		return fetchPost(`/postPayRequset?caseId=0`, json)
			.then(json => {
				if (json.code == 0) {
					
				} else {
					
					//VHPF.ui.showToast({content:json.msg});
				}
			})
	}
}


// pay 
export function CASHIER_getAuthType() {
	return {
		type: AppConst.CASHIER_GET_AUTH_TYPE,
	}
}
export function CASHIER_setAuthType() {
	return {
		type: AppConst.CASHIER_SET_AUTH_TYPE,
	}
}