const Student = require('../Models/studentModel');

/* used to get the complete contents of students database */
async function getStudent(request,response){
    try{
        const data = await Student.findAll(); //method findall from student model 
        response.writeHead(200,{'Content-Type':'application/json'}); // header write
        response.end(JSON.stringify(data));  // json data from student.json
        
    }
    catch(error){
        console.log(error);
    }
}

/*  used to find a student data by specific id 
    Pass id to search student   */ 
async function getStudentbyId(request,response,id){
    try{
        const data= await Student.findById(id);
        var dataEmpty = !data.length;
        if(dataEmpty){
            response.writeHead(404,{'Content-Type':'application/json'}); //404 not found
            response.end(JSON.stringify({message:'data is not found'})); 
        }
        else{
            response.writeHead(200,{'Content-Type':'application/json'}); // 200 is acceptable page
            response.end(JSON.stringify(data));

        }
}
    catch(error){
        console.log(error);
    }
}

/*  used to add student data 
    Pass data from body in postman to student DB    
    POST method */ 
async function addStudent(request,response){                                                          
    try{    
        let body='';

        request.on('data',(chunk)=>{
            body += chunk.toString(); 
        })

        request.on('end',async()=>{
            const studentData=JSON.parse(body);
            const newData = await Student.create(studentData); //studentData
            response.writeHead(201,{'Content-Type':'application/json'}); //201 for creation
            response.end(JSON.stringify(newData.affectedRows+' row was added '));

        }) 
      
    }
    catch(error){
        console.log(error);
    }
}

/*  used to update student data 
    Check if selected id is present
    Pass data from body in postman to specific student id   
    PUT method */ 
async function updateStudent(request,response,id){

    try{
        const data = await Student.findById(id);
        var dataEmpty=!data.length;

        if(!dataEmpty){ 
            let body='';

            request.on('data',(chunks)=>{
                body+=chunks.toString();
            })

            request.on('end',async()=>{
                const studentData=JSON.parse(body);

                const updatedData=await Student.update(id,studentData);
                response.writeHead(200,{'Content-Type':'application/json'});
                response.end(JSON.stringify(updatedData.affectedRows + ' row was affected'));
            })
        }
        else{
            response.writeHead(404,{'Content-Type':'application/json'});
            response.end(JSON.stringify({message:`ID ${id} was not found`}));
        }
    }
    catch(error){
        console.log(error);
    }
}

/*  Used to remove data from the students DB
    Passes an id and checks for availability
    DELETE method   */
async function removeStudent(request,response,id){
    try{
        const data = await Student.findById(id);
        var dataEmpty = !data.length;
        if(!dataEmpty){
            await Student.remove(id);
            response.writeHead(200,{'Content-Type':'application/json'});
            response.end(JSON.stringify({message:`product with ID : ${id} has been deleted`}));

        }
        else
        {
            response.writeHead(404,{'Content-Type':'application/json'});
            response.end(JSON.stringify({message:`ID : ${id} not found`}));
        }
    }
    catch(error){

    }

}

module.exports={
    getStudent,
    getStudentbyId,
    addStudent,
    updateStudent,
    removeStudent
}