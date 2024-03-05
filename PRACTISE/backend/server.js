import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api/jokes' , (req,res) =>{
const jokes = [
    {
        id:1,
        title:"A joke",
        content: "This is a Joke"
    },
    {
        id:2,
        title:"Another joke",
        content: "This is a second Joke"
    },
    {
        id:3,
        title:"A third joke",
        content: "This is a third Joke"
    },
    {
        id:4,
        title:"A fourth joke",
        content: "This is a fourth Joke"
    },
    {
        id:5,
        title:"A fifth joke",
        content: "This is a  fifth Joke"
    }
]
res.send(jokes);
});
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Serving at http://localhost:${port}`);
});