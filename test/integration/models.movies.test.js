const request = require("supertest");
let server;
const { Genre } = require("../../models/Genres");
const User = require("../../models/Users");

describe("POST/API/MOVIES", () => {
  beforeEach(() => {
    server = require("../../server");
  });

  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  it("should add a movie and return the added movie", async () => {
    let newGenre = {category:"ALIENS", names:["Mr. Bean", "Pink Panther", "Dexter"]};
    await Genre.create(newGenre);

    let genre = await Genre.findOne({category:"ALIENS"});

  
    let newMovie = { title: "Wild Life", numberInStock: 3, dailyRentalRate: 2 };

    const userCredentials = {
      name: "Ahu",
      email: "jamserenade@gmail.com",
      password: "happyboyyyy",
    };
    let token = new User(userCredentials).generateToken();
   
    let { body, status } = await request(server)
      .post(`/api/movies/${genre._id.toString()}`)
      .set("x-auth-token", token)
      .send(newMovie);

    expect(status).toBe(200);
    expect(body).toHaveProperty("title", "Wild Life");
  });
});
