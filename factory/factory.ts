import {TItemData} from '../src/types/ItemsTypes';
import { faker } from '@faker-js/faker';

export const bodyItem : TItemData  = {
    title:faker.word.adjective(),
    url: faker.internet.url(),
    description: faker.word.adjective(),
    amount:parseInt(faker.finance.amount())
}