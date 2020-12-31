
import Objection, { Model } from 'objection';
import Knex from 'knex';
import { resolve } from "path"
import { config } from "dotenv"

config({ path: resolve(__dirname, "../.env") })

const POSTGRES_DB_PASSWORD = process.env.POSTGRES_DB_PASSWORD || 'postgres';
const POSTGRES_SYS_PASSWORD = process.env.POSTGRES_SYS_PASSWORD;

// Initialize knex.
const knex = Knex({
  client: 'postgresql',
  useNullAsDefault: true,
  connection: `postgres://postgres:${POSTGRES_DB_PASSWORD}@localhost:5433/cooktop-development`
});
POSTGRES_DB_PASSWORD
// Give the knex instance to objection.
Model.knex(knex);

// Person model.
class Person extends Model {
  static get tableName() {
    return 'persons';
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Person,
        join: {
          from: 'persons.id',
          to: 'persons.parentId'
        }
      }
    };
  }
}

async function createSchema() {
  if (await knex.schema.hasTable('persons')) {
    return;
  }

  // Create database schema. You should use knex migration files
  // to do this. We create it here for simplicity.
  await knex.schema.createTable('persons', table => {
    table.increments('id').primary();
    table.integer('parentId').references('persons.id');
    table.string('firstName');
  });
}

async function main() {
  // Create some people.
  const sylvester = await Person.query().insertGraph({
    firstName: 'Sylvester',

    children: [
      {
        firstName: 'Sage'
      },
      {
        firstName: 'Sophia'
      }
    ]
  } as Objection.PartialModelGraph<Person, Person & Objection.GraphParameters>);

  console.log('created:', sylvester);

  // Fetch all people named Sylvester and sort them by id.
  // Load `children` relation eagerly.
  const sylvesters = await Person.query()
    .where('firstName', 'Sylvester')
    .withGraphFetched('children')
    .orderBy('id');

  console.log('sylvesters:', sylvesters);
}

const _createSchema = createSchema()
  .then(() => main())
  .then(() => knex.destroy())
  .catch(err => {
    console.error(err);
    return knex.destroy();
  });

export default knex;