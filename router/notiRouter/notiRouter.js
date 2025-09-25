const express = require("express");
const router = express.Router();
const { postNotify, GetSpecificuserNotify, MarknotifyRead } = require("../../controller/notify.js");


// 1️⃣ Create a new notificationdd
router.post("/", postNotify);

// 2️⃣ Get notifications for a specific user
router.get("/:appId/:userId",GetSpecificuserNotify);

// 3️⃣ Mark a notification as read
router.delete("/:id/read", MarknotifyRead);

module.exports = router;
