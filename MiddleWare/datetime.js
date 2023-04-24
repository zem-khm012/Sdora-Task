var datetime=require('node-datetime')


module.exports.getCurrentDateTime=()=>{
    var dt=datetime.create()
    var result=dt.format("Y-m-d H:M:S")
    return result
}