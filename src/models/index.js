// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Reinvest } = initSchema(schema);

export {
  Reinvest
};