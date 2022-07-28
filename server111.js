const express = require("express"),
app = express(),
PORT = 3600,
router = express.Router()

app.use(express.json())
app.use(require('cors')())
app.use('/root', require('./routes/fileRouter111'))

//app.listen(PORT)
app.listen(process.env.PORT || PORT, ()=>{
    console.log("Connenction secceed | PORT: ", PORT)

})

