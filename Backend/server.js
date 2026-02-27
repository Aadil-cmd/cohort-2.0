/* 
server ko create krna
database se connet krna
*/

const connectToDB = require('./config/database')
const app = require('./src/app')

connectToDB()


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})