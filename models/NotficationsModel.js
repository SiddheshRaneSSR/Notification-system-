const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  appId: {
    type: String,
    required: true, // To separate apps if multiple clients use your API
  },

  target: {
    type: {
      type: String,
      enum: ["USER", "USER_GROUP", "ALL"], // Who should receive it
      required: true,
    },
    value: {
      type: [String], // array of userIds or groupIds
      default: [],
    },
  },

  title: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: ["INFO", "ALERT", "REMINDER", "SYSTEM"],
    default: "INFO",
  },

  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "MEDIUM",
  },

  actionUrl: {
    type: String, // Optional link/button in app
    default: null,
  },

  readBy: {
    type: [String], // track which users read it
    default: [],
  },

  scheduledAt: {
    type: Date, // If you want delayed notifications
    default: null,
  },

  expiresAt: {
    type: Date, // Optional TTL for auto-expiration
    default: null,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexing for faster lookups
NotificationSchema.index({ "target.value": 1, appId: 1, createdAt: -1 });

module.exports = mongoose.model("Notification", NotificationSchema);
