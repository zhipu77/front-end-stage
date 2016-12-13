function filterQueryParams(query) {
    query = query || {}

    //用户类型，1为普通用户（默认），2为免注册用户，3为第三方联登用户
    query.userType = query.userType || 1

    //是否显示头部信息，0为不显示，1为显示（默认）
    query.showHeader = query.showHeader || 1

    //来源【公共参数】，app 为移动app，wap：移动wap
    query.source = query.source || 'wap'
    
    return query
}
export default filterQueryParams