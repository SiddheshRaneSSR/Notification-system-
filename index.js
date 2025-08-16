const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const router = require('./router/router.js');


app.use(cors());
app.use('/api',router);


app.get('/',(req,res)=>{
	
	res.send("hello world");

})

app.listen(port,()=>{
	console.log(`Server started at port ${port}`);
})
