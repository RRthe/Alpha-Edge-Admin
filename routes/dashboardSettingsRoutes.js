// In routes/settingsRoutes.js
router.post('/updateBasicSettings', settingsController.updateBasicSettings);

// In controllers/settingsController.js
exports.updateBasicSettings = async (req, res) => {
  try {
    // Perform the update logic using the model
    // For example, update site name, site title, etc.
    res.redirect('/settingsPage?update=success'); // Redirect back to the settings page with a query parameter indicating success
  } catch (error) {
    res.redirect('/settingsPage?update=fail'); // Redirect with an error indication
  }
};
