const multer=require('multer')
const path=require('path')

var Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./view/uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-"+Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({storage:Storage})

module.exports=upload