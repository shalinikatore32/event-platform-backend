const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinaryConfig");
const Event = require("../models/Event");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const AuthMiddleware = require("../middleware/AuthMiddleware"); // Middleware for authentication

const eventRouter = express.Router();

// Configure Multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events", // Folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

eventRouter.post(
  "/create-event",
  AuthMiddleware, // Ensure this middleware is used
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Request body:", req.body);
      console.log("Uploaded file:", req.file);
      console.log("Authenticated user ID:", req.userId); // Log user ID

      const { name, description, date, startTime, endTime, category } =
        req.body;
      const image = req.file ? req.file.path : null; // Cloudinary URL

      if (
        !name ||
        !description ||
        !date ||
        !startTime ||
        !endTime ||
        !category
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const event = new Event({
        name,
        description,
        date: new Date(date), // Ensure date is a Date object
        startTime,
        endTime,
        category,
        image,
        organizer: req.userId, // Use the authenticated user's ID
      });

      await event.save();
      res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
      console.error("Error creating event:", error);
      res
        .status(500)
        .json({ message: "Event creation failed", error: error.message });
    }
  }
);

//fetching all the events

eventRouter.get("/events", async (req, res) => {
  try {
    const events = await Event.find().limit(3);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

eventRouter.get("/events/all", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

eventRouter.get("/my-events", AuthMiddleware, async (req, res) => {
  try {
    // Fetch events created by the authenticated organizer
    const events = await Event.find({ organizer: req.userId });

    // Categorize events
    const categorizedEvents = {
      live: [],
      upcoming: [],
      past: [],
    };

    const currentDate = new Date();
    events.forEach((event) => {
      if (event.date.toDateString() === currentDate.toDateString()) {
        categorizedEvents.live.push(event);
      } else if (event.date > currentDate) {
        categorizedEvents.upcoming.push(event);
      } else {
        categorizedEvents.past.push(event);
      }
    });

    res.status(200).json(categorizedEvents);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch events", error: error.message });
  }
});

// Endpoint to fetch a single event by ID
eventRouter.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch event", error: error.message });
  }
});

// Endpoint to update an event by ID
eventRouter.put("/events/:id", AuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update event", error: error.message });
  }
});

module.exports = eventRouter;
