const express = require("express");
const router = express.Router();
const Notification = require("../../models/NotficationsModel");

// 1️⃣ Create a new notificationdd
router.post("/", async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 2️⃣ Get notifications for a specific user
router.get("/:appId/:userId", async (req, res) => {
  try {
    const { appId, userId } = req.params;

    const now = new Date();

    const notifications = await Notification.find({
      appId,
      $or: [
        { "target.type": "USER", "target.value": userId },
        { "target.type": "ALL" },
        { "target.type": "USER_GROUP", "target.value": { $in: [userId] } },
      ],
      $or: [{ expiresAt: null }, { expiresAt: { $gt: now } }], // filter out expired
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3️⃣ Mark a notification as read
router.post("/:id/read", async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;

    const updated = await Notification.findByIdAndUpdate(
      id,
      { $addToSet: { readBy: userId } }, // add userId if not already present
      { new: true }
    );

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;
