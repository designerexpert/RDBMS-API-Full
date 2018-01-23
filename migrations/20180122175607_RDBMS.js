
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (tbl) => {
            tbl.increments('id').primary();
            tbl.string('name', 128).notNullable();
            tbl.timestamp('createdAt').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('posts', (tbl) => {
            tbl.increments('id').primary();
            tbl.integer('userId').references('id').inTable('users');
            tbl.text('text');
            tbl.timestamp('createdAt').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('tags', (tbl) => {
            tbl.increments('id').primary();
            tbl.string('tag', 16).unique('tag', 'uq_tag_name');
            tbl.timestamp('createdAt').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('posts-tags', (tbl) => {
            tbl.increments('id').primary();
            tbl.integer('postId').notNullable().references('id').inTable('posts');
            tbl.integer('hashId').references('id').inTable('tags');
        })
    ])

};

exports.down = function (knex, Promise) {

};
