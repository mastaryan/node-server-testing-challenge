const db = require('../database/connection.js');

module.exports = {
  add,
  del,
  edit,
  find,
  findBy,
  findById
};

function find() {
  return db('knights').select('id', 'name', 'nickname');
}

function findBy(filter) {
  return db('knights')
    .select('id', 'name', 'nickname')
    .where(filter);
}

function findById(id) {
  return db('knights')
    .select('id', 'name', 'nickname')
    .where({ id })
    .first();
}

function add(knight) {
  return db('knights')
    .insert(knight, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function edit(changes, id) {
  return db('knights')
    .where({ id })
    .update(changes);
}

function del(id) {
  return db('knights')
    .where({ id })
    .del();
}