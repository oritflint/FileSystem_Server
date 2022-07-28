
let express = require('express'),
    multer = require('multer'),
    uuidv4 = require('uuid/v4'),
    router = express.Router();

const fileLogic = require('./fileLogic')
//const DIR = './';
const URL = "C:/Users/orit/אורית/fullstack/React/cloudDriver/backend/"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./root/temp/` );
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({storage: storage})
    //storage: storage//,
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //     }
    // }
    //});


//API GET: Get all files from specific Dir
router.get('/', async(req, res) => {
    try{
        console.log("req.query.key",req.query.path)  
        const result = await fileLogic.getAllDirFiles(req.query.path)
        res.status(200).send(result)
    }
    catch(err){
        res.status(400).json(err)
    }
})

//API GET: Get all files from specific Dir
router.get('/download', function(req, res){
    const file = `${req.query.filePath}`;
    res.download(file); // Set disposition and send it.
  });

//API POST: CREATE NEW DIRECTORY
router.post('/newDir', async (req,res)=>{
    try{
        fileLogic.createDirectory(req.body.currentPath, req.body.newDir)
        res.sendStatus(200)
    }
        catch(err){
            res.status(400).json(err || "error")
        }
});

//API POST: DELETE File
router.post('/delFile', async (req,res)=>{
    try{
        console.log("req.body.currentFile:",URL + req.body.currentFile)
        fileLogic.deleteFile(URL + req.body.currentFile)
        res.sendStatus(200)
    }
        catch(err){
            res.status(400).json(err || "error")
        }
});

//API POST: UPLOAD_FILE
router.post('/upload', 
    //middleware:
    multer({storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, req.query.path );//use query parameter for current path destination
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, uuidv4() + '-' + fileName)
        }
    })
    }).single('userFile'), 

async (req,res, next)=>{
    try{
        const path = req.file.destination
        var filename = req.file.filename;

        //fs.move('../tempDir/'+fileName, '../tempDir/'+dir+'/'+fileName, function (err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     res.json({});
        // })

        //const {file} = req.userFile
        //if(file.detectedFileExtantion != "") next(new Error ("Invalid file type"))
        //console.log("file.originalname",req.filePath+ file.originalname, "file.buffer",file.buffer)
        //const result = await fileLogic.moveFile(filename, path)
        res.send("File Upladed seccessfuly!")
    }
        catch(err){
            res.status(400).json(err || "error")
        }
});

{
// router.post('/root', upload.single('userFile'), (req, res, next) => {
//     const url = req.protocol + '://' + req.get('host')
//     const fileDet = new nFile({
//         _id: new mongoose.Types.ObjectId(),
//         fileType: req.file.filename.split('.')[0],
//         fileName: req.body.name,
//         fileFolder: url + '/root/',
//         fileSize: req.file.size
//         //profileImg: url + '/root/' + req.file.filename
//     })
//     .then(result => {
//         res.status(201).json({
//             message: "User registered successfully!",
//             fileCreated: {
//                 _id: result._id,
//                 profileImg: result.profileImg
//             }
//         })
//     }).catch(err => {
//         console.log(err),
//             res.status(500).json({
//                 error: err
//             });
//     })
// })



    // const [error, setError]=useState('')
    // hancleError= (error)=> {
    //     setError(error?.response?.data || error?.message || error || "sorry somthing went wrong")
    // }

    
//set of actions (array of actions) to handle the res & the body.
//router.post('/', async (req, res)=>{}, async (req, res)=>{}, async (req, res)=>{}, async (req, res)=>{}, )        

}


module.exports = router;