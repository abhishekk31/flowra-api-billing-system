const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config()

const route=require('./route.js')

const app=express()
const PORT =process.env.PORT || 5151;

//midleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json())

//Routes
app.use('/',route)



//Mongodb-connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('mongodb-connected'))
.catch((err)=>
  console.log(
    'error-in-mongodb',
    err.message
  )
)





//last stm
app.listen(PORT, () => {

  console.log(
    'app is running on:',
    PORT
  );

});
