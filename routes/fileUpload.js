const express = require('express');
// app = express() wont work if in different file
const router = express.Router();
// upload management
const multer = require('multer');
// const storage = multer.diskStorage({});
const fs = require('fs');
// file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploaded/')
  },
  filename: function (req, file, cb) {
    // originalname:undefined名字传不过来
    cb(null, file.originalname)
  }
})

const uploads = multer({ storage});

const fileFilter = (req, file, cb) => {
  // if (file.mimetype.startsWith('image')) {
  //   cb(null, true);
  // } else {
  //   cb('invalid image file!', false);
  // }
};

const uploadProfile = async (req, res) => {
    // http://expressjs.com/en/resources/middleware/multer.html
    try {
      res.status(200).
      json({ success: true, message: 'Your upload has done:' + req.file.originalname });;
    } catch (error) {
     console.log("copyFile or delete temp error " + error.message);
    }
  };

  const testCall = async (req, res) => {
    console.log('testCall');
    console.log(req);
    return res.status(200)
    .json({ success: true, message: 'Your testCall!' });;
  };
// 1.使用postman时设置form-data的key为single的参数uploaded-file
// 2.app.use('/api/file', userRouter)之后里面的路径都要写成相对路径，前面要带一个斜杠
router.post(
  '/upload',
  uploads.single('uploaded-file'),
  uploadProfile
);

router.post('/', testCall);

module.exports = router;