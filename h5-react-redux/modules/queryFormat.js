export default function(query){
	//src=vipapp&showHeader=0&callbackUrl=
	// 参数说明：
// src：来源，移动app为vipapp，移动wap为vipwap
// hide_header：是否显示头部信息，0为不显示，1为显示（默认）
//go_back  采用escape编码方式
	var src = query.src || 'vipwap',
		go_back = query.go_back || 1, 
		hide_header = query.hide_header || ''
	return {
		src: src,
		go_back: go_back,
		hide_header: hide_header
	}
}