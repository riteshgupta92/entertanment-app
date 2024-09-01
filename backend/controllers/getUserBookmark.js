const User = require("../models/user"); // Adjust the path as needed

// Controller function to get user bookmarks by email
exports.getUserBookmarksByEmail = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.user.data.email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the bookmarks
    return res.json({ bookmarks: user.bookmarks });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return res.status(500).json({ error: "Error fetching bookmarks" });
  }
};
