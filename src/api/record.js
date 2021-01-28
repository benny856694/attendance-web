//抓拍列表
export function getRecordList(data, page) {
  let count = myExtension.getCapture_Datacuont(
    data.startTime,
    data.endTime,
    data.name,
    data.devname,
    data.stranger
  )
  let res = myExtension.getCapture_Data(
    data.startTime,
    data.endTime,
    data.name,
    data.devname,
    data.stranger,
    page.pageNo.toString(),
    page.pageSize.toString()
  )
  let counts = JSON.parse(count)[0].count
  let list = JSON.parse(res)

  return { counts, list }
}
//删除
export function delRecord(id) {
  let res = myExtension.delCapture_DataForid(id)
  return res
}
// 批量导出
export function BatchXport(data) {
  myExtension.BatchXportforCapture(data.startTime, data.endTime, '', '', '')
}