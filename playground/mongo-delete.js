const {MongoClient,ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) => {
  if (err){
    return console.log('Could not connect to Mongo DB !');
  }
  const db = client.db('TodoApp')
  console.log('Connected to Mongo DB server !');

  db.collection('Todos').deleteMany({text : 'Sleep'}).then((result) => {
    console.log(result);
  });
  client.close();
db.collection('Users').deleteMany({name : 'Shivam'});

});
