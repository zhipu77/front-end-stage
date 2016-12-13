export default function validPaypassInput(validCode,pass,confirmPass){
	return validCode.length>0&&pass.length>0&&confirmPass.length>0
}