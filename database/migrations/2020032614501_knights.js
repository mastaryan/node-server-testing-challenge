exports.up = function(knex) {
    return knex.schema.createTable('knights', knights => {
      knights.increments();
      knights
        .string('name', 128)
        .notNullable()
        .unique();
      knights.string('nickname', 128);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('knights');
  };