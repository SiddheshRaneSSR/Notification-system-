const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.json({message:"all users fetched successfully"});
});


module.exports = router;