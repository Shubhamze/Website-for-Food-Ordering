const mongoose=require('mongoose');
require('dotenv').config();
 const dburl=process.env.dburl;
mongoose.connect(dburl,{useNewUrlParser: true});
const conn=mongoose.connection;
conn.on('connected', async function() {
    console.log('database is connected successfully');
    let data= await conn.db.collection("food_items").find({}).toArray();
    let catagory= await conn.db.collection("category_items").find({}).toArray();
    global.food_items=data;
    global.food_catagory=catagory;
    
    
    
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));
module.exports = conn;