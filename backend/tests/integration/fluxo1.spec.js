const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
var ong_id='', newIncidentId = 0;
expect.extend({
  ToHaveObjectInArray(received ,property, value){
    const booleanArray = received.map(object => (object[property] == value) )
                              .filter(element => element == true )
    if(booleanArray.length < 1){
      return {
        message: `expected object not found with this value: ${value}`,
        pass: false
      }
    } else return {
      message: `expected object found with this value: ${value}`,
      pass: true
    }
  }
})
describe('Teste de fluxo 1', () => {
  beforeAll( async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll( async () => {
    await connection.destroy();
  })
  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
          name: "Teste",
          email: "Teste@Teste.com",
          whatsapp:"5584986221356",
          city: "João Pessoa",
          uf: "PB"
      });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    ong_id = response.body.id;
  })

  it('should be able to log in with the created ong', async () =>{
    const response = await request(app)
      .post('/sessions')
      .send({
        id: ong_id
    });
    expect(response.body).toHaveProperty('name');
  });

  it('should be able to creat a new incident with the new ong_id', async () => {
    const response = await request(app)
      .post('/incidents')
      .set('authorization', ong_id)
      .send({
        title: 'caso teste',
        description: 'caso do teste de um integração',
        value: '1'
      })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id');
    newIncidentId = response.body.id;
  })

  it('should be able to list incidents and the new incident will be in this list', async () => {
    const response = await request(app)
      .get('/incidents')
    expect(response.status).toBe(200)
    expect(response.body).ToHaveObjectInArray('id', newIncidentId)
  })


})