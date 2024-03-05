const http = require('http');
const events = require('events');

const myEmitter = new events.EventEmitter();
myEmitter.on('usercreated',(id,name) =>{
        console.log(`A new user ${name} with ID ${id} has been created`);
});
myEmitter.emit('usercreated' , 1,'Anish');



const server = http.createServer();

server.on('request',(req,res) =>{
    res.end("hello from the server");
});

server.listen(8000,'127.0.0.1',()=>{
        console.log("server is listening on 127.0.0.1:8000");
       
});

