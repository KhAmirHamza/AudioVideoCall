var http = require("http");
const express = require('express')

const app = express()

//Middleware...
app.use(express.json())
app.get('/',function (req,res){
    res.end('<h1>This is Home page</h1>')

});

 const PORT = process.env.PORT || 1010
app.listen(PORT, function (err) {
    if (err){
        console.log(err)
    }else {
    console.log('Server is running on port: ' + PORT)
    }
})