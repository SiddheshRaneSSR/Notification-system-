const express = require("express");
const router = express.Router();
const { postNotify, GetSpecificuserNotify, MarknotifyRead, GetNotification } = require("../../controller/notify.js");
const redis = require("../../config/redisConfig.js"); // Use the singleton instance


// 1️⃣ Create a new notificationdd
router.post("/", postNotify);

// 2️⃣ Get notifications for a specific user
router.get("/:appId/:userId",GetSpecificuserNotify);

// 3️⃣ Mark a notification as read
router.delete("/:id/read", MarknotifyRead);

//4 Getting notification 
router.get("/:id",GetNotification);


module.exports = router;
