const { getCurrentDateTime } = require("../MiddleWare/datetime");
const Mood = require("../Models/mood");
const User = require("../Models/user");
const { ObjectId } = require("mongodb");


//===========================================================================
//function  to add new user
//===========================================================================

module.exports.AddUserDetailsController=async(req,res,next)=>{
    try {
        if (req.body.name || req.body.mobile || req.body.email || req.body.birthdate ||  req.body.gender) {
            var saveUser=await User.create({
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email,
                birthdate: req.body.birthdate,
                gender: req.body.gender,
                address: req.body.address,
                city: req.body.city,
                mood_details:[]
              });
              saveUser.save()
              res.status(200).send({
                result:true,
                message:"User Added sucessfully"
            })
        } else {
            res.status(200).send({
                result:false,
                message:"Insufficient Parameters"
            })
        }
    } catch (error) {
        next(error.message)
    }
}




//===========================================================================
//function  to add  user mood details
//===========================================================================

module.exports.addUserMoodDetails=async(req,res,next)=>{
    try {

        var user_id=req.params.user_id
        var today=getCurrentDateTime()
        var emotion=req.body.emotion 
        emotion=emotion[0].toUpperCase() + emotion.substring(1)
        var feeling=req.body.feeling
        var reason=req.body.reason
        var description=req.body.description


        if (user_id || user_id != "" || user_id != undefined) {

           let findEmotionDetails=await Mood.find({_id:"64408477a55ebfaf963d5864"},{emotions:{$elemMatch:{name:emotion}}});
            
            let findUserAndUpdateMoodDetails=await User.findOneAndUpdate({_id:user_id},
                {
                    $push:{
                        mood_details:{
                            createdAt:today,
                            emotion:findEmotionDetails[0].emotions,
                            feeling:feeling,
                            reason:reason,
                            description:description
                        }
                    }
                },
                {
                    new:true,
                })
                if (findUserAndUpdateMoodDetails) {

                    let findUserMoodDetails=await User.findOne({_id:req.params.user_id},{
                        mood_details:{$slice:-1}
                    })

                    res.status(200).send({
                        result:true,
                        message:"Mood details added successfully",
                        mood_details:findUserMoodDetails
                    })
                } else {
                    res.status(200).send({
                        result:true,
                        message:"unable to add mood details"
                    })
                }

        } else {
            res.status(200).send({
                result:false,
                message:"User Id cannot be empty and contain numeric character only"
            })
        }
        
    } catch (error) {
        next(error.message)  
    }
}



//===========================================================================
//function  to view  user  details
//===========================================================================

module.exports.ViewUserDetails=async(req,res,next)=>{
    try {
        if (req.params.user_id && req.params.user_id != "" && req.params.user_id != "") {
            let findUserDetails=await User.find({_id:req.params.user_id})
            if (findUserDetails != [] && findUserDetails.length > 0) {
                res.status(200).send({
                    result:true,
                    message:"User details",
                    user_details:findUserDetails[0]
                }) 
            } else {
                res.status(200).send({
                    result:false,
                    message:"User details not found"
                })  
            }
        } else {
            res.status(200).send({
                result:false,
                message:"User Id cannot be empty and contain numeric character only"
            })
        }
    } catch (error) {
        next(error.message)  
    }
}




//===========================================================================
//function  to view  user mood details
//===========================================================================

module.exports.viewUserMoodDetails=async(req,res,next)=>{
    try {
        if (req.params.user_id && req.params.user_id != "" && req.params.user_id != "") {
            let findUserDetails=await User.find({_id:req.params.user_id}) .slice('mood_details', -1)
            .sort({'mood_details.createdAt':-1})
            .select("mood_details")
            if (findUserDetails != [] && findUserDetails.length > 0) {
                res.status(200).send({
                    result:true,
                    message:"User mood details",
                    user_details:findUserDetails[0]
                }) 
            } else {
                res.status(200).send({
                    result:false,
                    message:"User details not found"
                })  
            }
        } else {
            res.status(200).send({
                result:false,
                message:"User Id cannot be empty and contain numeric character only"
            })
        }
    } catch (error) {
        next(error.message)  
    }
}



