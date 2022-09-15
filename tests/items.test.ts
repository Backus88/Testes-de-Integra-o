import app from '../src/app';
import supertest from 'supertest';
import {bodyItem} from '../factory/factory';
import {prisma} from '../src/database';

console.log(bodyItem);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE items;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});
describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async ()=>{
    const result =await supertest(app).post('/items').send(bodyItem);
    const status = result.status;
    expect(status).toEqual(201);
  });
  it('Deve retornar 409, ao tentar cadastrar um item que exista', async ()=>{
    const result =await supertest(app).post('/items').send(bodyItem);
    const result1 =await supertest(app).post('/items').send(bodyItem);
    const status = result1.status;
    expect(status).toEqual(409);
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array', async()=>{
    const result =await supertest(app).get('/items');
    const status = result.status;
    expect(status).toEqual(200);
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async()=>{
    const result1 =await supertest(app).post('/items').send(bodyItem);
    const result =await supertest(app).get(`/items/${result1.body.id}`);
    const status = result.status;
    expect(status).toEqual(200);
  });
  it('Deve retornar status 404 caso não exista um item com esse id', async()=>{
    const result =await supertest(app).get(`/items/1`);
    const status = result.status;
    expect(status).toEqual(404);
  });
});
