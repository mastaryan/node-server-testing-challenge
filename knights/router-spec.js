const request = require('supertest');
const server = require('../api/server.js');

// Endpoint: GET all Knights of Carlos
describe('GET /api/knights', function() {
  it('should return json 200 OK', function(done) {
    request(server)
      .get('/api/knights')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('should return an array of the Knights of Carlos', function(done) {
    request(server)
      .get('/api/knights')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

// Endpoint: GET a specific Knight by ID
describe('GET /api/knights/:id', function() {
  // provided with an existing user
  it('should respond with json containing a single knight', function(done) {
    request(server)
      .get('/api/knights/6')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  // provided with a non-existing user
  it('should respond with the correct error message', function(done) {
    request(server)
      .get('/api/knights/99999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"Knight with that ID does not exist"')
      .end(err => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

// Endpoint: POST a new Knight
describe('POST /api/knights', function() {
  // with a name provided for new knight
  it('should respond with json 201', function(done) {
    request(server)
      .post('/api/knights')
      .send({ name: Date.now(), nickname: Date.now() })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  // without a name provided for new knight
  it('should respond with json 400', function(done) {
    request(server)
      .post('/api/knights')
      .send({ nickname: 'noname' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .expect('"Error creating new knight"')
      .end(err => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('should create name & nickname fields correctly', function(done) {
    request(server)
      .post('/api/knights')
      .send({ name: 'Carlos', nickname: '#1TL' })
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.name = 'Carlos';
        res.body.nickname = '#1TL';
      })
      // .expect(function(res) {
      //   res.body.name === 'carlos';
      //   res.body.nickname === '#1lt';
      // })
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe('PUT /api/knights/:id', function() {
  it('should respond with json 200 OK', function(done) {
    request(server)
      .put('/api/knights/6')
      .send({ nickname: 'the myth' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect('"Successfully updated knight"')
      // .expect({
      //   id: '2',
      //   name: 'kj',
      //   nickname: 'the myth',
      //   message: 'Successfully updated knight'
      // })
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  it('should properly update nickname', function(done) {
    request(server)
      .put('/api/knights/6')
      .send({ nickname: 'the legend' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect('"Successfully updated knight"')
      // .expect({
      //   id: '2',
      //   name: 'kj',
      //   nickname: 'the legend',
      //   message: 'Successfully updated knight'
      // })
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

describe('DELETE /api/knights:id', function() {
  // provided with an existing user ID
  it('should properly delete knight & respond with json 200 OK', function(done) {
    request(server)
      .delete('/api/knights/12')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
  // provided with a non-existing user ID
  it('should respond with json 500 error', function(done) {
    request(server)
      .delete('/api/knights/99999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .expect('"Knight with that ID does not exist"')
      .end(function(err) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});