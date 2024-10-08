const express=require('express');
const router=express.Router();
router.post('/foodData',(req,resp)=>{
    try {
        // console.log(global.food_items,global.food_catagory);
        resp.send([global.food_items,global.food_catagory])
    } catch (error) {
        console.error(error.message);
    }
})
module.exports=router;


