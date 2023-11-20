import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'passportImgFile') {
      cb(null, 'uploads/images/');
    } else if (file.fieldname === 'userDocsPDFFile') {
      cb(null, 'uploads/docs/');
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const DocsUploadMiddleware = upload.any();

export default DocsUploadMiddleware;
