const fs =require('fs');

function WriteToFile(filename,content){
    fs.writeFileSync(filename,JSON.stringify(content));

}

module.exports={
    WriteToFile
}