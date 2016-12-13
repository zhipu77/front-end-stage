const ERR_CASEID_NULL = {
  msg: 'please input your caseId'
}

const ERR_CASEID_ERROR = {
  msg: 'this caseId does not match any response data'
}

const ERR_URL_GET = {
  msg: 'this GET url does not match any response'
}

const ERR_URL_POST = {
  msg: 'this POST url does not match any response'
}

module.exports  = {
	ERR_CASEID_NULL,
	ERR_CASEID_ERROR,
	ERR_URL_GET,
	ERR_URL_POST
}

