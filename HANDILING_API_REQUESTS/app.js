const exp = require('constants');
const express = require('express');
const fs = require('fs');

const app = express();
let movies = JSON.parse(fs.readFileSync('./movies.json'));

const logger = function(req,res,next){
        console.log("Custom Middleware called");
        next();
}

app.use(express.json());
// app.use(logger);
app.use((req,res,next)=>{
    req.requestedat = new Date().toISOString();
    next();
})

const readMovies = (req,res) => {
    res.status(200).json({
        status:"success",
        requestedat: req.requestedat,
        count: movies.length,
        data: {
            movies: movies
        }
    })
}
const createMovie = (req,res)=>{
    const newId = movies[movies.length-1].id + 1;
    const newMovie = Object.assign({id: newId}, req.body) ;
    movies.push(newMovie);
    fs.writeFile('./movies.json', JSON.stringify(movies));
}

const getMovie = (req,res) =>{
    const id = +req.params.id;
    let movie = movies.find(el => el.id === id)
    if(!movie){
      res.status(404).json({
          status: "failed",
          message: 'Movie with Id '+id+' not found !'
      })

    }else{
      res.status(200).json({
          status: "success",
          data: {
              movie: movie
          }
        });
    }
}
const updateMovie = (req,res) =>{
    const id = +req.params.id;
    const movieToUpdate = movies.find(el => el.id === id);
    if(!movieToUpdate){
        res.status(404).json({
            status: "failed",
            message: 'MOive not found with Id '+id
        })
}
    const movieIndex = movies.indexOf(movieToUpdate);
    const UpdatedMovie = Object.assign(movieToUpdate, req.body);
    movies[movieIndex] = UpdatedMovie;
    fs.writeFile('./movies.json',JSON.stringify(movies),(err)=>{
        if(err){
                res.status(500).json({
                    status: "failed",
                    message: 'Failed to update MOive with Id '+id
                })
        }
        else{
            res.status(200).json({
                status: "success",
                data: {
                    movie: UpdatedMovie
                }
            })
        }
    });

}
const deleteMovie = (req,res)=>{
    const id = +req.params.id;
    const movietodelete = movies.find(el => el.id === id);
    if(!movietodelete){
        res.status(404).json({
            status: "Failed",
            message: 'Movie with id '+id+' not Found'
        })
    }
    const movieindex = movies.indexOf(movietodelete);
    movies.splice(movieindex,1);
    fs.writeFile('./movies.json',JSON.stringify(movies),(err)=>{
        if(err){
            res.status(500).json({
                status: "failed",
                message: 'Failed to delete MOive with Id '+id
            })
    }
    else{
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    }
    });
}


app.get('/',(req,res)=>{
    // res.end("hello how are you");
    res.end("hi there!");
});
// get - /api/v1/movies
// app.get('/api/v1/movies',readMovies);
// app.post('/api/v1/movies', createMovie);
// app.get('/api/v1/movies/:id', getMovie);
// app.patch('/api/v1/movies/:id',updateMovie);
// app.delete('/api/v1/movies/:id',deleteMovie);

app.route('/api/v1/movies')
    .get(readMovies)
    .post(createMovie)

app.route('/api/v1/movies/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie)



const port = 8000;
app.listen(port,'127.0.0.1',()=>{
    console.log("server is listening: ");
});