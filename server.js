const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    let dataFile = '';
    let html = '';
    fs.readFile('./data.txt','utf-8',(err,data)=>{
        if(err){
            throw new Error(err.message);
        }
        dataFile=data.split(',');
        dataFile.forEach((value,index)=>{
            html += '<tr>'
            html += `<td>${index +1}</td>`
            html += `<td>${value}</td>`
            html += `<td><button class="btn btn-danger">Delete</button></td>`
            html += `<td><button class="btn btn-primary">Update</button></td>`
            html += '</tr>'
        })
    });
    fs.readFile('./view/index.html', 'utf-8', (err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        data = data.replace('{list-user}',html);
        res.write(data);
        res.end();
    })

})

server.listen(8080,()=>{
    console.log(`Server in running at http://localhost:8080`);
})