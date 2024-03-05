const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const replacehtml = require('./replacehtml');
const { error } = require('console');


const html = fs.readFileSync('./index.html','utf-8');
const productsFilePath = path.join(__dirname,'Data', 'products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
let productlisthtml = fs.readFileSync('./products.html','utf-8');
let productdetailhtml = fs.readFileSync('./productdetails.html','utf-8');
  
const server = http.createServer((req, res) => {
    let {query,pathname : path} = url.parse(req.url,true);
   
    
    if(path === '/' || path.toLowerCase() === "/home"){
        res.writeHead(200, {
            'content-type' : 'html document'
        });
        res.end(html.replace('{{%CONTENT%}}','This is the Home section of Your Website.'));
    }
    else if(path === '/Contact' || path.toLowerCase() === "/contact"){
        res.end(html.replace('{{%CONTENT%}}','This is the Contact section of Your Website.'));
    }
    else if(path === '/About' || path.toLowerCase() === "/about"){
        res.end(html.replace('{{%CONTENT%}}','This is the About section of Your Website.'));
    }
    else if(path === '/Products' || path.toLowerCase() === "/products"){
       if(!query.id){
        res.writeHead(200, {
            'content-type': 'json file'
        });
        let productHtmlArray = products.map( (prod) =>{
            return replacehtml(productlisthtml,prod);
        });

        let productresponse = html.replace('{{%CONTENT%}}',productHtmlArray.join(','));
        res.end(productresponse);
       }
       else{
        let prod = products[query.id]
        let productresponsedetailhtml = replacehtml(productdetailhtml,prod)
        res.end(html.replace('{{%CONTENT%}}',productresponsedetailhtml))
       }
        
                
    }
   else
   {
    res.writeHead(404);
    res.end("page not found : -from Anish");
   }
});

server.listen(8000, '127.0.0.1', () => {
    console.log("Server has started");
});
