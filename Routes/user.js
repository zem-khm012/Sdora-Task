const express=require('express')
const router=express.Router()
const upload=require('../MiddleWare/upload')


const userController=require('../Controller/UserController')

router.post('/add-user',userController.AddUserDetailsController)

router.get('/user-details/:user_id',userController.ViewUserDetails)

router.post('/add-user-mood/:user_id',userController.addUserMoodDetails)

router.get('/user-mood-details/:user_id',userController.viewUserMoodDetails)




const moodController=require('../Controller/MoodController')

//This API is used to add moods details in database
router.post('/add-moods',upload.any(),moodController.CreateMoodController)

router.get('/moods-details',moodController.viewMoodDetailsController)




module.exports=router