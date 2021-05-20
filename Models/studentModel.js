const {con}=require('../dbConnection');

/*  Method to fetch all data from database
    Returns an array of data  */
function findAll(){
    return new Promise((resolve,reject)=>{                      
        con.query('select * from students',(error,result)=>{
            if(error){
                throw error;
            }
            else
            {
                resolve(result);
            }   
        })    
    })
}

/*  Method to fetch data specified by id
    Returns single data in json format
    Takes id parameter   */
function findById(id){
    return new Promise((resolve,reject)=>{
        con.query('select * from students WHERE id = ?',[id],(error,result)=>{
            if(error){
                throw error;
            }
            else
            {
                resolve(result);
            }
        })    
    })
}

/*  Method to insert a new row of data
    returns affected rows data
    takes an array of data sent from body in paramter */
function create(studentData){
    return new Promise((resolve,reject)=>{

        con.query('insert into students(name,age,place) VALUES(?,?,?)',[studentData.name,studentData.age,studentData.place],(error,result)=>{
            if(error)
            {
                throw error;
            }
            else
            {
                resolve(result);
            }
        })
    })
}

/* Method  to update a particular field of students DB
    Takes in parameters of both id and data from body in postman
    returns affected rows data  */
function update(id,studentData){
    return new Promise((resolve,reject)=>{
        
        con.query('update students SET name = ?, age = ?, place = ? WHERE id = ?',[studentData.name,studentData.age,studentData.place,id],(error,result)=>{
            if(error){
                throw error;
            }
            else
            {
                resolve(result);
            }
        })
    })
}

/* Method  to delete a particular field from students DB
    Takes in parameter of id 
    returns affected rows data  */
function remove(id){
    return new Promise((resolve,reject)=>{
        con.query('delete from students where id = ?',[id],(error,result)=>{
            if(error){
                throw error;
            }
            else
            {
                resolve(result);
            }
        })
    })
}


module.exports={
    findAll,
    findById,
    create,
    update,
    remove
}