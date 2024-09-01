const User = require("../models/user");

// Controller to add a bookmark to a user
const addBookmark = async (req, res) => {
  try {
    // const { userId } = req.user.data.email;

    const newBookmark = req.body; // The new bookmark data is passed in the request body

    // Find the user by ID and update their bookmarks list
    const user = await User.findOneAndUpdate(
      { email: req.user.data.email },
      { $push: { bookmarks: newBookmark } }, // Push the new bookmark into the bookmarks array
      { useFindAndModify: false }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Bookmark added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addBookmark,
};
