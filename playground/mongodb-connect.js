 const {MongoClient,ObjectID} = require('mongodb');
 MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
   if (err){
     return console.log('Could not connect to Mongo DB !');
   }
   const db = client.db('TodoApp')
   console.log('Connected to Mongo DB server !');
   // db.collection('Todos').insertOne({
   //   text:'Mongo DB connection',
   //   completed : false
   // },(err,result) => {
   //   if (err){
   //     return console.log('Unable to insert Data ! : ',err);
   //   }
   //   console.log(JSON.stringify(result.ops,undefined,2));
   // });

   // db.collection('Users').insertOne({
   //   name : 'Shivam',
   //   age : 24,
   //   location : 'Bengaluru'
   // },(err,result)=>{
   //   if (err){
   //     return console.log('Unable to insert Data ! : ',err);
   //   }
   //   console.log(JSON.stringify(result.ops,undefined,2));
   // });

   // db.collection('Todos').find({
   //   completed : true
   // }).toArray().then((docs) => {
   //   console.log('Todos');
   //   console.log(JSON.stringify(docs,undefined,2));
   // },(err) => {
   //   console.log('Error fetching Documents !',err);
   // });

   db.collection('Users').find({
     name : 'Shivam'
   }).toArray().then((docs) => {
     console.log(`User Shivam : `);
     console.log(JSON.stringify(docs,undefined,2));
   });

   client.close();


 });
