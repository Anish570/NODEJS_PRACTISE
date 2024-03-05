const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app.js');

// console.log(process.env);

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn)=>{
        // console.log(conn);
        console.log("DB connection Successful");
}).catch((error) => {
        console.log("some error has occured");
})

const movieSchema = mongoose.Schema({
        name:String,
        description:String,
        duration:Number,
        ratings:Number
});
const Movie = mongoose.model('Movie', movieSchema);
const testmovie = new Movie({
        name: "Anish",
        description: "A new movie",
        duration: 90,
        ratings: 4

});
testmovie.save()
.then(doc =>{
        console.log(doc);
}).catch(err=>{
        console.log("Error has Occured" + err);
})
const port = process.env.PORT || 8000;

app.listen(port, ()=>{
        console.log("server has started....");
});