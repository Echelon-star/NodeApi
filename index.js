var http = require('http');
const {getStudent,getStudentbyId,addStudent,updateStudent,removeStudent} =require('./controllers/studentController');

http.createServer(function(request,response){

    if(request.url === '/getinfo' && request.method === 'GET'){                             //GET request for all students

        getStudent(request,response);
        console.log('GET METHOD called');
    }
    else if(request.url.match(/\/getinfo\/([0-9]+)/) && request.method === 'GET'){          //GET request for particular student        
    
        let id=request.url.split('/')[2]
        getStudentbyId(request,response,id);
        console.log('GET METHOD for particular id called');

    }
    else if(request.url==='/postinfo' && request.method ==='POST')                          //POST request to add data from body 
    {
        addStudent(request,response);
        console.log('POST METHOD called');

    }
    else if(request.url.match(/\/putinfo\/([0-9]+)/) && request.method === 'PUT'){          //PUT request for particular student    

        let id=request.url.split('/')[2]
        updateStudent(request,response,id);
        console.log('PUT METHOD called');

    }
    else if(request.url.match(/\/deleteinfo\/([0-9]+)/) && request.method === 'DELETE'){    //DELETE request for particular student 

        let id=request.url.split('/')[2]
        removeStudent(request,response,id);
        console.log('DELETE METHOD called');

    }
    else{

        response.writeHead(404,{'Content-Type':'application/json'});                        // Else indicate a 404 error page
        response.end(JSON.stringify({message:'Route not found'}));
        console.log('No route found');

    }


}).listen(8000)
