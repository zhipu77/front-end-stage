import validate from '../lib/vera/util/validate'

export default function validSetModPaypass(validCode,pass,confirmPass){
	var validCodeRst = validate.authCode(validCode)
	var passRst = validate.paypass(pass)
	var confirmPassRst = pass===confirmPass
	if(validCodeRst.result){
		if(passRst.result){
			if(confirmPassRst){
				return {
					result:true,
                	msg:''
				}
			}
			else{
				return {
					result:false,
                	msg:'两次输入密码不一样'
				}
			}
		}
		else{
			return passRst
		}
	}
	else{
		return validCodeRst
	}
}