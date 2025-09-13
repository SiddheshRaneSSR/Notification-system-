const express = require("express");
const router = express.Router();
//const { PrismaClient } = require('@prisma/client');

//const prisma = new PrismaClient();


router.get("/",async (req,res)=>{

    //const allUsers = await prisma.user.findMany()

    res.json({message:"all users fetched successfully"/*,users:allUsers*/});
});


module.exports = router