const upload = require("../MiddleWare/upload");
const Mood = require("../Models/mood");



//===========================================================================
//function  to create moods 
//===========================================================================

module.exports.CreateMoodController=async(req,res,next)=>{
try {
    let baseurl = req.protocol + "://" + req.headers.host + "/";
    let emotions=JSON.parse(req.body.emotions)
    let feeling=JSON.parse(req.body.feeling)
    let reason=JSON.parse(req.body.reason)

    var amazing=req.files?.filter((data)=>data.fieldname == 'amazing')
    amazing=(amazing != []) ? baseurl + amazing[0].path.replaceAll("\\","/") : null

    var good=req.files?.filter((data)=>data.fieldname == 'good')
    good=(good != []) ? baseurl + good[0].path.replaceAll("\\","/") : null

    var okay=req.files?.filter((data)=>data.fieldname == 'okay')
    okay=(okay != []) ? baseurl + okay[0].path.replaceAll("\\","/") : null

    var low=req.files?.filter((data)=>data.fieldname == 'low')
    low=(low != []) ? baseurl + low[0].path.replaceAll("\\","/") : null

    var terrible=req.files?.filter((data)=>data.fieldname == 'terrible')
    terrible=(terrible != []) ? baseurl + terrible[0].path.replaceAll("\\","/") : null

 emotions.forEach((data)=>{
            switch (data.name){
                case "Amazing":
                    data.image=amazing
                break;
                case "Good":
                    data.image=good
                break;
                case "Okay":
                    data.image=okay
                break;
                case "Low":
                    data.image=low
                break;
                case "Terrible":
                    data.image=terrible
                break;
            }
            return data;
    })


    var addMoods=await Mood.create({
        emotions:emotions,
        feeling:feeling,
        reason:reason
    })
    addMoods.save()

    res.status(200).send({
        result:true,
        message:"Moods inserted successfully"
    })
    
} catch (error) {
    next(error.message)
}
}





//===========================================================================
//function  to view moods  details
//===========================================================================

module.exports.viewMoodDetailsController=async(req,res,next)=>{
    try {
       var MoodDetails=await Mood.find()

        res.status(200).send({
            result:true,
            message:"all types of moods details",
            moods:MoodDetails
        })
        
    } catch (error) {
        next(error.message)
    }
    }