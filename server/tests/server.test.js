const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

var {app} = require('./../server')
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {

  it('should create a new todo', (done) => {
    var text = 'Test Todo Text';

    request(app)
      .post('/todos')
      .send({text})
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if (err){
          return done(err);
        }

        Todo.find({text}).then((todos)=> {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
    });
    it('should not create todo with invalid body data !',(done) => {
      request(app)
        .post('/todos')
        .set('x-auth',users[0].tokens[0].token)
        .send({})
        .expect(400)
        .end((err,res) => {
          if (err){
            return done(err);
          }

          Todo.find().then((todos) => {
            expect(todos.length).toBe(4);
            done();
          }).catch((e) => done());
        });

    });
  });

  describe('GET /todos', () => {
    it('should get all todos', (done) => {
      request(app)
        .get('/todos')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(1);
        })
        .end(done);
    });
  });

describe('DELETE /todos/:id',() => {
  it('should delete a todo',(done) => {
    var id = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe('First test todo!');
      })
      .end((err,res) => {
        if (err){
          done(err);
        }

        Todo.findById(id).then((todo) => {
          expect(todo).toBeNull();
          done();
        }).catch((err) => done(err));
      });
  });

  it('should return a 404 when todo is not found',(done) => {
    var id = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it ('should return a 400 for invalid todo is',(done) => {
    request(app)
      .delete('/todos/123asd')
      .expect(400)
      .end(done);
  });
});

describe('PATCH /todos/:id',() => {
  it ('should update a todo !',(done) => {
    var id = todos[0]._id.toHexString();
    var text = 'This should be the new text.'
    request(app)
      .patch(`/todos/${id}`)
      .send({
        "completed":true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        // expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  });

  // it('should ')
});

describe('GET /todos/:id', () => {
  it('should return todo doc',(done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404',(done) => {
    var id = new ObjectID().toHexString();
  request(app)
    .get(`/todos/${id}`)
    .expect(404)
    .end(done);
  });

  it('should return 404',(done) => {

  request(app)
    .get(`/todos/123abc`)
    .expect(400)
    .end(done);
  });

});

// });
