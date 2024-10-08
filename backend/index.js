const express = require('express')
const mongoDB=require('./configdb')
const app = express();
const port = 5000;
// console.log(mongoDB);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

});

app.use(express.json());

app.use('/api',require('./Routes/CreateUser'))
app.use('/api',require('./Routes/DisplayData'))
app.use('/api',require('./Routes/OrderData'))
app.use('/api',require('./Routes/OrderData'))
// app.use('/api',require('./Routes/myOrderData'))
app.get('/', async (req, res) => {
      // let data= mongoDB.db.collection("fooData2");
      // console.log(data);
})

app.listen(port, () => {
  
  console.log(`Example app listening on port ${port}`)

})