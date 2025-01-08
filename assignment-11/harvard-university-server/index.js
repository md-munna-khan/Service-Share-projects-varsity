const express = require('express');
const cors = require('cors');
require('dotenv').config()
const jwt= require('jsonwebtoken')
const port =process.env.PORT|| 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
const cookieParser= require('cookie-parser')
app.use(cookieParser())

const corsOptions={
  origin:['http://localhost:5173','http://localhost:5175','https://harvard-university-server.vercel.app','https://harvard-university-11.netlify.app'],
  credentials:true,
  optionalSuccessStatus:true
}
//middleWar
app.use(cors(corsOptions))
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gamza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const verifyToken =(req,res,next)=>{
  const token =req.cookies?.token
  if(!token)return res.status(401).send({message:'unauthorized access'})
    jwt.verify(token,process.env.SEC_KEY,(err,decoded)=>{
  if(err){
    return res.status(401).send({message:'unauthorized access'})
  }
  req.user=decoded
  next()
  
    })
 
  // res
}

async function run() {
  try {
// create collection
const db =client.db('abroad-varsity')
const varsityCollection=db.collection('services')
const bookingCollection=db.collection('booking')
// generate jwt
app.post('/jwt',async(req,res)=>{
  const email = req.body;
  const token= jwt.sign(email,process.env.SEC_KEY,{expiresIn:'365d'})

  res.cookie('token',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
     
  }).send({success:true})
 
})

// clear cookie from browser
app.post('/clear-cookie',async(req,res)=>{
  res.clearCookie('token',{
    httpOnly: true,
    // maxAge:0,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
 
   

  })
  .send({success:true})
})


// varsity post
app.post('/add-services', verifyToken,async(req,res)=>{
  const decodedEmail=req.user?.email
  const emails = req.query?.email
  if(decodedEmail !== emails){
  return res.status(401).send({message:'unauthorized access'})
  }

  const varsityData = req.body;
  const result = await varsityCollection.insertOne(varsityData)
 
  res.send(result)
})
// varsity items get
app.get('/services',async(req,res)=>{
const {search}=req.query
let option ={}
if(search){
  option={title:{$regex:search,$options:"i"}}
}
  const result = await varsityCollection.find(option).toArray()
  res.send(result)
})

// get a single job data from db
app.get('/service/:id',async(req,res)=>{
  const id =req.params.id
  const query = {_id:new ObjectId(id)}
  const result = await 
  varsityCollection.findOne(query)
  res.send(result)
})
//get all services posted by specific user
app.get('/services/:email', verifyToken,async(req,res)=>{
  const email = req.params.email;
  const query={'buyer.email':email}
  const decodedEmail=req.user?.email
  if(decodedEmail !== email){
   return res.status(401).send({message:'unauthorized access'})
  }
  const result= await varsityCollection.find(query).toArray()
 
  res.send(result)
})
// delete specific job id
app.delete('/service/:id',async(req,res)=>{
  const id =req.params.id
  const query = {_id:new ObjectId(id)}
  const result = await varsityCollection.deleteOne(query)
  res.send(result)
})


// update services
app.put('/update-service/:id',async(req,res)=>{
  const id =req.params.id;
  const query ={_id:new ObjectId(id)}
  const serviceData=req.body
  const updated={
    $set:serviceData,
  }
  const options ={upsert:true}
  const result = await varsityCollection.updateOne(query,updated,options)
  res.send(result)
})
//<------------------booked section------------------------>
// save a booking data in db
app.post('/add-book',async(req,res)=>{
  const bookData = req.body;

//   const query = {email:bookData.email,serviceId:bookData.serviceId}
//   const alreadyExist  = await bookingCollection.findOne(query)
 
// if(alreadyExist)
//   return res.status(400).send('you have already placed on this service')


const result= await bookingCollection.insertOne(bookData)
res.send(result)
})
// get all bookings for specific user and get all bookings request  for specific user




app.get('/bookings/:email', verifyToken,async(req,res)=>{
 
  const email = req.params.email;
  const query={currentUserEmail:email}
  const result= await bookingCollection.find(query).toArray()
  const decodedEmail=req.user?.email
 if(decodedEmail !== email){
  return res.status(401).send({message:'unauthorized access'})
 }
  res.send(result)
})
app.get('/bookings-requests/:email', verifyToken,async(req,res)=>{
  const email = req.params.email;
  const query={providerEmail:email}

  const decodedEmail=req.user?.email
  if(decodedEmail !== email){
   return res.status(401).send({message:'unauthorized access'})
  }
  const result= await bookingCollection.find(query).toArray()
 
  res.send(result)
})

// updated bookings services
app.put('/bookings-requests/:id',async(req,res)=>{
  const id =req.params.id;
  const query ={_id:new ObjectId(id)}
  const serviceData=req.body
  const updated={
    $set:serviceData,
  }
  const options ={upsert:true}
  const result = await bookingCollection.updateOne(query,updated,options)
  res.send(result)
})

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('This is harvard university')
})
app.listen(port,()=>{
    console.log(`harvard varsity port is running:${port}`)
})