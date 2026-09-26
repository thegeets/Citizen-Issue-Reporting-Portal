import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads', 'issues');

// Ensure server/uploads/issues directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    cb(null, `issue-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeType = (file.mimetype || '').toLowerCase();

  const isAllowedExt = allowedExtensions.includes(ext);
  const isAllowedMime =
    mimeType.startsWith('image/') &&
    (mimeType.includes('jpeg') ||
      mimeType.includes('jpg') ||
      mimeType.includes('png') ||
      mimeType.includes('webp') ||
      mimeType.includes('gif'));

  if (isAllowedExt || isAllowedMime) {
    return cb(null, true);
  } else {
    return cb(
      new Error(
        'Invalid file format. Only JPG, JPEG, PNG, WEBP, and GIF images are allowed.'
      )
    );
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max limit
  fileFilter: fileFilter,
});

// Middleware wrapper that accepts image, photo, or file and formats error responses as JSON
export const uploadIssuePhoto = (req, res, next) => {
  const uploadMiddleware = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]);

  uploadMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'Image file exceeds the 10MB maximum limit. Please choose a smaller photo.',
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || 'Invalid image file upload.',
      });
    }

    // Normalize req.file from req.files if present
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        req.file = req.files.image[0];
      } else if (req.files.photo && req.files.photo[0]) {
        req.file = req.files.photo[0];
      } else if (req.files.file && req.files.file[0]) {
        req.file = req.files.file[0];
      }
    }

    next();
  });
};
