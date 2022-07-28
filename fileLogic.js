//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const { exit } = require('process');


// fs.appendFileSync('./myFile.txxt', "\nthen to Evyatar")
// console.log("End write to file")

function isExist(){
    return fs.existsSync('./files/' + fileName)
}

function isValidName(filename = "") {
    return ["/", "\\", "*", ":", "|", "?", "<", ">", '"'].find(char => filename.includes(char)) ? false : true;
}

function isValidExtantions(filename = "") {
    let ext = filename.slice(filename.lastIndexOf(".")+1)
    return ["pdf", "txt", "png", "jpg", "js", "html", "css", "jsx", "ts"].find(char => ext == char) ? true : false;
}

function isValid(req,res,next){
    const {fileName} = req.body
    if(isValidName(fileName) && isValidExtantions(fileName)) {
        next()
    }
    else{ return "Error"}
}

function moveFile(fileName, path){
    console.log(`GOT INTO MOVE-FILE`)
    try{  
        const isExist = fs.existsSync(fileName)

        if(!isExist){
            //const result = fs.move('../tempDir/'+fileName, path+fileName)
            console.log(`moved ${fileName} to path ${path} `) 
            return true  
            }
        else {  
            console.log("file alredy exists")   
            return false
        }
        
    }
        catch(err){ console.log(err)
    }
}

function createFile(path, fileName, fileCont, encoding = 'utf8'){
        console.log(`GOT INTO CREATE-FILE`)
    try{  
        const isExist = fs.existsSync(fileName)

        if(!isExist){
            const result = fs.writeFileSync(path+fileName, fileCont, {encoding})
            console.log(`createdFile ${fileName} with content ${fileCont} `) 
            return result  
            }
        else {  
            console.log("file alredy exists")   
            return false
        }
        
    }
        catch{ console.log("file hadn't been created")
    }
}

function readFile(fileName){
    let content = ""
    try{
        const isExist = fs.existsSync(fileName)
        
        if(isExist){
            content =fs.readFileSync(fileName, "utf-8")
        }
        else   
            console.log("file does not exists")   
    }
        catch{ 
            console.log("file hadn't been found")
            return false
    }
    return content
}

function updateFile(filePath, fileCont){
    try{
        const isExist = fs.existsSync(filePath)
        if(isExist)
            fs.appendFileSync(filePath, fileCont)
    }
        catch{ 
            console.log("file hadn't been found")
            return flase
    }
    return true
}

function deleteFile(filePath){
    try{
        const isExist = fs.existsSync(filePath)
        if(isExist){
            fs.unlink(filePath,()=>{
                console.log("file deleted!")
            })
        }
    }
    catch{ 
        console.log("file hadn't been deleted")
        return false
    }
    return true
}

function getAllDirFiles(_dirname){
    console.log(`GOT INTO getAllDirFiles`)
    //console.log(`path: `,path)
    const directoryPath = path.join(_dirname)
    console.log(directoryPath)
    const files = fs.readdirSync(directoryPath)
    return files

    // fs.readdirSync(directoryPath, { withFileTypes: true }, function (err, files) {
    //     if (err) {
    //         return console.log('Unable to scan directory: ' + err);
    //     }
    //     let res={fileName:''}
    //     //console.log( "files[0]",files[0].includes('.'))
    //     //files.map(file=>{
    //     //    return file.toString() +"ss"
    //         //console.log(file.toString())
    //     //})JSON.stringify(res)
    //     let result= {"Files": []}
    //     for (let file of files) {
    //         result.Files.push({fileName:file.name})
    //     }
    //     console.log("result:",result)
    //     //console.log("files:",files)
    //     return (result)

    // });
}



function createDirectory(currPath, dirName){
    console.log('GOT INTO CREATEDIRECTORY')
    //const url = req.protocol + '://' + req.get('host')+ currPath
    fs.mkdir(path.join(currPath , dirName), function(err){
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        console.log('Directory created successfully!')
    })
    return true
}


//const result = createFile("./text.txt","TEST TEST TEST")
//const result = readFile("./text.txt")
//const result = updateFile("./text.txt","\nTEST TEST TEST")
//const result = deleteFile("./text.txt")
//console.log(result)

module.exports = {createFile, readFile, updateFile, deleteFile, isValid, getAllDirFiles, createDirectory, moveFile}