import Message from "../models/Message.js";

export const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const newMessage = await Message.create({ name, email, message });
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ msg: "Message deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { status: "read" }, { new: true });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
