const express = require('express');
const router = express.Router();
const multer = require('multer');

const userController = require('../controllers/user.controller');
const examController = require('../controllers/exam.controller');
const emailController = require('../controllers/email.controller');
const imageVerificationController = require('../controllers/imageVerification.controller')
const jwtHelper = require('../config/jwtHelper');

const DIR = './public/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, fileName)
  },
})
  
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype == 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

const upload = multer({
    storage: storage,
});

router.use(express.static(__dirname + "./public/"));

router.post('/register', userController.register);
router.post('/authenticate', userController.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken ,userController.userProfile);
router.post('/createExam', jwtHelper.verifyJwtToken, upload.single('question'), examController.create);
router.get('/exams/:id', jwtHelper.verifyJwtToken,  examController.retrieve);
router.get('/exam/:id', jwtHelper.verifyJwtToken, examController.singleExamInfo);
router.put('/exam/:id', jwtHelper.verifyJwtToken, upload.single('question'), examController.updateInfo);
router.delete('/exams/:id', jwtHelper.verifyJwtToken, examController.deleteExam);
router.put('/joinExam/:id', jwtHelper.verifyJwtToken, examController.joinExam);
router.get('/student/exams/:id', jwtHelper.verifyJwtToken, examController.getStudentExams);
router.put('/student/exams/:id', jwtHelper.verifyJwtToken, examController.removeParcipant);
router.post('/invite', jwtHelper.verifyJwtToken, emailController.sendMail);
router.get('/participantinfo/:id', jwtHelper.verifyJwtToken, userController.participantInfo);
router.put('/addEvidence/:id', jwtHelper.verifyJwtToken, upload.single('record') ,examController.addEvidence);
router.get('/exam/notifications/:id', jwtHelper.verifyJwtToken, examController.getNotification)
router.post('/verifyOTP', jwtHelper.verifyJwtToken, userController.verifyOTP)
router.post('/resendOTP', jwtHelper.verifyJwtToken, userController.resendOTP)
router.post('/verifyImage', jwtHelper.verifyJwtToken, upload.single('image'), imageVerificationController.verifyImage)

module.exports = router;

// {
//     "examName": "exam1",
//     "startTime": "09.30",
//     "duration": 120,
//     "teacherID": "1234",
//     "examDate": "1 May 2020",
//     "message": ""
// }