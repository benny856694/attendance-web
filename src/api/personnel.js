// 人员列表
export function getDataList(page) {
  let list = window.top.myExtension.getStaffData(
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  let re_json1 = JSON.parse(list)
  let count = window.top.myExtension.getStaffDatacount()
  let re_json2 = JSON.parse(count)

  return [re_json1, re_json2[0].count]
}
// 查询人员列表
export function queryList(page, data) {
  let list = window.top.myExtension.getStaffDataQuey(
    data.name,
    data.no.toString(),
    data.qu_phone.toString(),
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  let re_json1 = JSON.parse(list)
  let count = window.top.myExtension.getStaffDataQueyforcount(
    data.name,
    data.no.toString(),
    data.qu_phone.toString()
  )
  let re_json2 = JSON.parse(count)

  return [re_json1, re_json2[0].count]
}
//获取部门列表、工作分类
export function getTypeList() {
  var data = window.top.myExtension.getDepartmentData()
  data = JSON.parse(data)
  let type = window.top.myExtension.getlEmployetypedata()
  type = JSON.parse(type)

  return [data, type]
}
//获取设备列表
export function getDeviceList() {
  let res = window.top.myExtension.getDeviceDiscover()
  let data_json = JSON.parse(res)

  return data_json
}
// 添加人员
export function setData(data) {
  var re = window.top.myExtension.setStaff(
    data.name,
    data.Employee_code.toString(),
    data.phone.toString(),
    data.Email,
    data.departmentname.toString(),
    data.Employetypename.toString(),
    data.picture.toString(),
    data.line_type ? data.line_type.toString() : '1',
    data.line_userid ? data.line_userid.toString() : '',
    data.face_idcard.toString(),
    data.idcardtype.toString()
  )
  var re_json = JSON.parse(re)

  return re_json
}
// 编辑人员
export function editData(data) {
  var re = window.top.myExtension.EditStaff(
    data.name,
    data.Employee_code,
    data.phone,
    data.Email,
    data.departmentname.toString(),
    data.Employetypename.toString(),
    data.picture.toString(),
    data.line_userid ? data.line_userid.toString() : '',
    data.line_type ? data.line_type.toString() : '1',
    data.id.toString(),
    data.face_idcard.toString(),
    data.idcardtype.toString()
  )
  var re_json = JSON.parse(re)

  return re_json
}
//获取电脑图片
export function openImg() {
  return window.top.myExtension.openImgeUrl()
}
//拍照
export function photograph() {
  return window.top.myExtension.OpenCamera()
}
//删除人员
export function delData(data) {
  let type = false
  data.forEach((item, index) => {
    type = window.top.myExtension.DeleteUser(item.toString())
  })

  return type
}
//查询下发人员是否正确
export function queryPerson(id) {
  let res = window.top.myExtension.queryPerson(id.toString())
  let data_json = JSON.parse(res)

  return data_json
}
//人员下发
export function toIssue(data) {
  let res = window.top.myExtension.AddPersonToEquipment_distribution(
    JSON.stringify(data)
  )

  return true
}
//一键下发
export function oneClickIssue() {
  return new Promise(function (resolve, reject) {
    myExtension.One_click_distribution((res) => {
      resolve(res)
    })
  })
}
//下载模板
export function download() {
  window.top.myExtension.Download()
}
//批量导入
export function importExcel() {
  return new Promise(function (resolve, reject) {
    myExtension.BatchIimport((res) => {
      var re_json = JSON.parse(res)
      resolve(re_json)
    })
  })
}
//导出
export function downList() {
  myExtension.export()
}

//访客管理
//访客列表
export function getVisitorList(data, page) {
  var res = myExtension.getVisitor(
    data.startdate.toString(),
    data.startTime.toString(),
    data.endDate.toString(),
    data.endTime.toString(),
    data.name.toString(),
    data.phone.toString(),
    data.isDown.toString(),
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  var res_json = JSON.parse(res)

  return res_json
}
//访客总数
export function getVisitorCount(data) {
  let res = myExtension.getVisitorcuont(
    data.startdate.toString(),
    data.startTime.toString(),
    data.endDate.toString(),
    data.endTime.toString(),
    data.name.toString(),
    data.phone.toString(),
    data.isDown.toString()
  )
  let res_json = JSON.parse(res)[0].count

  return res_json
}
//添加访客
export function addVisitor(data) {
  var res = window.top.myExtension.setVisitor(
    data.name.toString(),
    data.phone.toString(),
    data.img.toString(),
    data.startTime.toString(),
    data.endTime.toString()
  )
  var res_json = JSON.parse(res)

  return res_json
}
//修改访客
export function editVisitor(data) {
  var res = window.top.myExtension.EditVisitor(
    data.name.toString(),
    data.phone.toString(),
    data.img.toString(),
    data.startTime.toString(),
    data.endTime.toString(),
    data.id.toString()
  )
  var res_json = JSON.parse(res)

  return res_json
}
//删除访客
export function delVisitor(id) {
  let res = myExtension.delVisitorForid(id)

  return res
}
// 下发访客
export function issueVisitor(data) {
  let res = myExtension.downVisitorForid(
    data.name.toString(),
    data.imge.toString(),
    data.staTime.toString(),
    data.endTime.toString(),
    data.id.toString()
  )

  return res
}

// 下发记录
export function getIssueList(page, data) {
  var res = window.top.myExtension.getcountforEquipment_distribution(
    data.name,
    data.ip,
    data.status
  )
  var re_json = JSON.parse(res)
  var DevicedataStr = window.top.myExtension.getforEquipment_distribution(
    page.pageNo.toString(),
    page.pageSize.toString(),
    data.name,
    data.ip,
    data.status
  )
  var re_json_2 = JSON.parse(DevicedataStr)

  return [re_json_2, re_json]
}
