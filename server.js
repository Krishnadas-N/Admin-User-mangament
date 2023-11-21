// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser'); // For parsing POST request data
// const path = require('path');
// const exp = require('constants');
// require('dotenv').config();

// const { name } = require("ejs");

// const db_Port = process.env.DB_PORT;
// const db_Name = process.env.DB_NAME;

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');//it set view engine which type


// const loginSchema = new mongoose.Schema({
//     _id:Number,
//     name: String ,
//     email:String,
//     password:String,
    
//     // Define other fields in your schema here
//   },{collection:'logintable'});

// // Create a mongoose model using the schema
// const LoginModel = mongoose.model('logintable', loginSchema);

// let foundDocument;
// async function connectToDatabase() {
//     try {
//         await mongoose.connect(`mongodb://${db_Port}/${db_Name}`).then(()=>{
//             console.log("MongoDB connected");
//         }) // No space before 'mongodb://'
        

//        // Use the LoginModel to interact with the collection
      
//        const query = { name:'Krishnadas' } ;
//         // await LoginModel.insertMany({_id:5,name:'Raman',email:'raman@mail.com',password:'raman123'})
//        foundDocument= await LoginModel.find();
//         console.log('Found document:', foundDocument);

//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//     }
// }

// connectToDatabase();



// app.get('/logi',(req,res)=>{
//    res.render('index')
// })


// // ... (Your schema and database connection code)

// // Middleware to parse JSON in POST request body
// app.use(bodyParser.json());

// // Route for handling login requests
// app.post('/logi', async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         // Find a document with the provided email in the database
//         const user = await LoginModel.findOne({ email });

//         if (!user) {
//             // User not found
//             return res.status(401).json({ message: 'User not found' });
//         }

//         // Compare the provided password with the stored password
//         if (user.password === password) {
//             // Passwords match, user is authenticated
//             return res.status(200).json({ message: 'Login successful' });
//         } else {
//             // Passwords do not match
//             return res.status(401).json({ message: 'Invalid password' });
//         }
//     } catch (err) {
//         console.error('Error during login:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// });



// app.listen(3005,()=>{
//     console.log("Server is started");
// })





// //  ... Your other code ...



// // const userSchema =new mongoose.Schema({
// //     name:String,
// //     age:Number,
// // })

// // const UserModel = mongoose.model("users",UserSchema)
// const mongoose = require('mongoose');

// const url="mongodb://127.0.0.1:27017/";

// MongoClient.connect(url,(err,db)=>{
//     if(err) throw err;

//     const Db = db.db('loginTask');
//     let mydata = {name:'Rajufrom Vs',age:123};

//     Db.collection('vscode').insertOne(mydata,(err,res)=>{
//         if(err) throw err;
//         console.log(`Data inserted ${JSON.stringify(res)}`);
//         db.close();
//     })
// })

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/loginTask',{
//     useNewUrlParser : true , 
//     useUnifiedTopology:true,
// })

// const db = mongoose.connection;

// db.on('error',console.error.bind(console,'MongoDb connetion error'));
// db.once('open',function(){
//     console.log('Connected to MongoDb');
// })


// const {MongoClient}=require('mongodb')
// const uri='mongodb://127.0.0.1:27017/'
// const client = new MongoClient(uri)
// client.connect()
// const database=client.db('loginTask')

// async function hi(){
//     console.log("hi");
//     let test=database.collection('User')
//     console.log("worked")
//     let User = 'dileep@mail.com'
//     let hi = await test.find().toArray()
//     console.log(hi);
//     console.log("hi");
// }

// hi()
// const express = require('express');
// const app = express();

// app.get('/users/:userId/h/:userid', (req,res)=>{
//     const userId = req.params.userId;
//     const user = req.params.userid;
//     res.send(`user id is ${userId} and ${user}`)
// })

// app.listen(3001,()=>{
//     console.log('Started');
// // })
// let str1 = "ABCABC", str2 = "ABC"
// console.log(str1/'ABC');

// let obj ={
//     name:'krishna',
//     age:23,
//     "like birds":true,
//     place:{
//         street:123,
//     }
// }
// delete obj.age;
// console.log(obj["like birds"]);
// console.log(obj.age);
// console.log(obj===obj2);
// let obj2=Object.assign({},obj);
// obj.place.street=123434
// console.log(obj2?.place?.street?.ks);
// console.log(obj2+obj);
// 

// const prom1= Promise.resolve('Hello');
// const prom2= Promise.resolve('World');
// const prom3= Promise.resolve('Siree');

// Promise.all([prom1,prom2,prom3]).then((res)=>{
//     console.log(res);
// })

// async function hel(){
//     const promise1 = fetch('sa');
//     const promise2 = fetch('sd');
//     try{
//         // Promise.all([promise1,promise2]).then((res)=>{console.log(res);}).catch((err)=>{console.log(err);})
//         const results = await Promise.all([promise1,promise2]);
//     }catch(err){
//         console.log("error");
//     }
// }
// hel();

// const objec = {
//     name:'ja',
//     age:12,
//     infos:{
//         as:12,
//         asxz:12334
//     }
// };
// console.log(objec);

// const {name , age, infos:{as,asxz}} = objec;
// console.log(name,age,as);
// console.log(a);
// a=5
// var a ;
// console.log(a);
// function add(a){
//     return function(b){
//         return a+b;
//     }
// }
// add1 = add(4)
// console.log(add1(23));

// const prom = new Promise((res,rej)=>{
//    const sucess =  setTimeout(()=>{
//         console.log("hello");
//     },2000)

//     if(sucess){
//         res("sucessfully")
//     }else{
//         rej("not sucess")
//     }
// })
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

// async function h(){
//     try{
//         const s = await new Promise((res,rej) =>{
//            const we= setTimeout(()=>{
//                 return 4+5;
//             },1000)
            
//             if(we){
//                 res(we)
//             }
//         })
//         const data = await s;
//         console.log(data);
//     }catch(err){
//         console.log(err);
//     }
// }
// h();

// console.log(h());
// console.log(a());
// var ab=5;
// function h() {
//     console.log('hello');
// }
// let a = ()=>{
//     console.log("bpu");
// }

// const  http = require('http');
// http.createServer((req,res)=>{
//     res.writeHead(200,{'Content-Type':'text/plain'})
//     res.end("helloowprls")
// }).listen(30001,()=>{
//     console.log("3000");
// })
// // const fs = fs.readfilesync('adks',{encoding:'utf-8',flag:r+}
// class user{
//     constructor (name , age ){
//         this.name = name;
//         this.age = age;
//     }
//      hello(){
//         console.log(this.name,this.age);
//         return this.age;
//     }
// }

// let h=new user('john',23);
// console.log(h.hello());

// const obj = {
//     name:'krishnaddas',
//     age:23
// }
// const {name,age}= obj;
// console.log(name);

// const obj ={
//     name:"raju",
//     age:1323
// }

// const http = require('http');

// let server =  http.createServer((req,res)=>{
//     if(req.url==='/'){
//         res.writeHead(200,{'Content-Type':"text/html"});
//         res.end('<h1>Hello page 1</h1>')
//     }else if(req.url === '/path'){
//         res.writeHead(200,{'Content-Type':"text/html"});
//         res.end('<h1>Hello page 12 ns</h1>')
//     }else{
//         res.writeHead(200,{'Content-Type':"text/html"});
//         res.end('<h1>Hello page 1</h1>')
//     }
// })
// server.listen(4000,()=>{
//     console.log("Started");
// })


// const myArray = [1, 2, 2, 3, 4, 4, 5];
// const data  = myArray.filter((val,idx,arr)=>{
//    return arr.indexOf(val)===idx;
// })
// console.log(data)
// console.log(myArray.splice(1,3));;

// let result = (function(a,b){
//     return a+b;
// })(4,4);
// console.log(result);

