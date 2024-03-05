const express = require('express');
const app = express();

app.get('/',(req,res)=>{
        res.send("hello there");
});

// PORT = 8000;
// app.listen(PORT,'127.0.0.1',(req,res)=>{
//         console.log("server is listening");
// });
module.exports = app;