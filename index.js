const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const router = require('./router/router.js');
const connectDB = require('./config/mongodbConfig.js');
const connectRedis = require("./config/redisConfig.js");


app.use(cors({origin:"http://localhost"}));
app.use(express.json()); 
app.use('/api',router);
connectDB();
let redis;
connectRedis().then(client => {
  redis = client;
});

app.get('/',(req,res)=>{
	
	res.send("hello world");

})

app.listen(port,()=>{
	console.log(`Server started at port ${port}`);
})
