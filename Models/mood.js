const { default: mongoose } = require('mongoose')
var db=require('../db/connection')

const moodSchema=new mongoose.Schema({
  emotions:[{
    name:{type:String},
    image:{type:String},
  }],
  feeling:[{
    name:{type:String}
  }],
  reason:[{
    name:{type:String}
  }]
})

var Mood=mongoose.model("mood",moodSchema)

module.exports=Mood