require('dotenv').config()
const express = require('express');
const app = express()
const port = 4000

app.get('/',(req,res)=>{
   res.send("hello world and how are you, i am Anish");
})

app.listen(process.env.PORT,() => {
    console.log(`Example app listening onn port ${port}`);
})