const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Resize = require('./Resize');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
var fs = require('fs');
require('dotenv').config();

const port = process.env.PORT || 5000;

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: 'Too many requests from this IP, please try again in a minute'
})

const dir = path.join(process.cwd(), 'public/images');

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

const upload = multer({
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
  limits:{
      fileSize: 16 * 1024 * 1024
  },
  storage: multer.memoryStorage()
});

app.post('/', upload.single('file'), async function (req, res) {
  const imagePath = path.join(process.cwd(), '/public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
      res.status(401).json({error: 'Please provide an image'});
  }
  const filename = await fileUpload.save(req.file.buffer);
  
  return res.status(200).json({ name: filename });
});

app.use(express.static(dir));

app.use(function(req, res, next) {
  res.status(404).json({
    status: 404,
    message: 'Not found'
  });
})

app.use(function(err, req, res, next) {
  res.status(500).json({
    status: 500,
    message: err.message
  });
})

app.listen(port, () => {
  console.log('Server is running on port ' + port);
})
