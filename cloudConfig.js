const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDE_NAME,
  api_key: process.env.CLOUDE_API_KEY,
  api_secret: process.env.CLOUDE_API_SECRET,
});

// Set up Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Wanderlust_DEV',
    allowed_formats: ['png', 'jpg', 'jpeg'] // Corrected the typo here
  },
});

// Export the configured storage and cloudinary instance
module.exports = {
  cloudinary,
  storage, // Changed from Storage to storage
};
