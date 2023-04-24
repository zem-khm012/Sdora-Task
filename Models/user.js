const { default: mongoose } = require('mongoose')
var db=require('../db/connection')

var userSchema=new mongoose.Schema({

    mood_details:[
        {
            createdAt:{type:Date},
            emotion:[{name:{type:String},image:{type:String}}],
            feeling:[String],
            reason:[String],
            description:{type:String}
        }
    ]
})


var User=mongoose.model("user",userSchema)


module.exports=User