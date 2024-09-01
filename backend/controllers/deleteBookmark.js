const User = require("../models/user"); // Adjust the path as needed

// Controller function to remove a bookmark by its ID
exports.removeBookmarkById = async (req, res) => {
  try {
    const { bookmark_id } = req.body;
    // Find the user by email and remove the bookmark with the specified ID
    const user = await User.findOneAndUpdate(
      { email: req.user.data.email }, // Query to find user by email
      { $pull: { bookmarks: { id: bookmark_id } } }, // Remove the bookmark with the specified ID
      { new: true, useFindAndModify: false } // Return the updated user and use native findOneAndUpdate
    );

    // Check if the bookmark was removed
    const bookmarkRemoved = user.bookmarks.some(
      (bookmark) => bookmark.id.toString() === bookmark_id
    );

    if (bookmarkRemoved) {
      return res.status(404).json({ message: "Bookmark not found" });
    }
    return res.json({
      message: "Bookmark removed successfully",
      bookmarks: user.bookmarks,
    });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return res.status(500).json({ error: "Error removing bookmark" });
  }
};
