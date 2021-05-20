const express = require('express');
const fs= require('fs');

const app= express();

let rawdata=fs.readFileSync('student.json'); //read file from student.json
let data= JSON.parse(rawdata); //converts it into object

app.get('/',(request,response)=>{
    response.send('Hello from Homepage'); //homepage 
})

app.get('/getData',(request,response)=>{
    response.send(data); //data object is accessed
})

app.get('/getData/:id',(request,response)=>{
    var id=request.params.id; //used to store id paramter from url
    response.send(data[id]); //sends selected id 
    console.log(id);
   
})

app.post('/postData',(request,response)=>{
    
})

app.delete('/delete/:id',(request,response)=>{
    var id=request.params.id;
    delete data[id];
    response.send("Record with id "+id+"is deleted <br/>"+JSON.stringify(data));
    
})


app.listen(8000);