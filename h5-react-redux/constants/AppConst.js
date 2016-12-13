export const ENV='DEV' //DEV PROD TEST
export const SERVER_URL='/api'
export const BASE = ''
const VERSION = 'daf82050'
const ASSETS_ROOT_MAP = {
	'DEV': '//project-name.static.static.com:9000/assets',
	'PROD': '//project-name.static.static.com/portal-h5/'+VERSION+'/assets',
	'TEST': '//project-name.static.static.com/portal-h5/'+VERSION+'/assets'
}
export const ASSETS_ROOT = ASSETS_ROOT_MAP[ENV]

const IMG_ROOT = {
	'DEV': '//project-name.static.static.com:9000/img',
	'PROD': '//project-name.static.static.com/portal-h5/'+VERSION+'/img',
	'TEST': '//project-name.static.static.com/portal-h5/'+VERSION+'/img'
}

export const IMGSRC = {
	'LOADINHG': IMG_ROOT[ENV]+'/svg/loading.svg',
	'DONE': IMG_ROOT[ENV]+'/svg/done.svg',
}


// user info 
export const PUB_USER_INFO = 'PUB_USER_INFO'

