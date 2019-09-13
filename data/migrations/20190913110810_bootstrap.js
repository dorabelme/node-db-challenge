exports.up = function (knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('name', 128)
                .notNullable();
            tbl.string('description', 400)
            tbl.boolean('completed')
                .defaultTo(false)
                .notNullable()
        })

        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('name', 128)
                .unique()
                .notNullable();
            tbl.string('description', 400)
        })

        .createTable('project_resources', tbl => {
            tbl.increments();
            // Foreign key
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })

        .createTable('task', tbl => {
            tbl.increments();
            tbl.string('description', 128)
                .notNullable();
            tbl.string('notes', 400)
            tbl.boolean('completed')
                .defaultTo(false)
                .notNullable()

            // Foreign key
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')

        })
    
        .createTable('contexts', tbl => {
            tbl.increments();
            tbl.string('name', 128)
                .unique()
                .notNullable();
        })

        .createTable('task_contexts', tbl => {
            tbl.increments();
            // Foreign key
            tbl.integer('task_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('task')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
            tbl.integer('context_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('contexts')
                .onDelete('RESTRICT')
                .onUpdate('CASCADE')
        })


};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('task')
        .dropTableIfExists('project_resource')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');
};
