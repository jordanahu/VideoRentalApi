let server;
const request = require("supertest");
const {Genre} = require("../../models/Genres")


describe("api/genres", ()=>{
    beforeEach(()=>{
        server = require("../../server")
    });

    afterEach(async()=>{
        await server.close();
        await Genre.deleteMany({});
    });


    describe("GET/API/GENRES", ()=>{
        it("should make a get request to api/genres and return all genres", async()=>{
            await Genre.insertMany(
                [
                  {category:"ALIENS", names:["Star Wars", "Bloody space", "Alien Invasion"]},
                  {category:"HORROR", names:["Rise of the dead","Vampire Dairies"]}
                ]);
               
            let {body, status} = await request(server).get("/api/genres");

            expect(status).toBe(200)
            expect(body[0]).toHaveProperty("category", "ALIENS");

        });

        it("should make a get request to api/genres/id and return a genre", async()=>{
            await Genre.create({category:"HORROR", names:["Rise of the dead","Vampire Dairies"]})
            let genre = await Genre.findOne({category:"HORROR"});           

            let {body, status} = await request(server).get(`/api/genres/${genre._id.toString()}`);

            expect(status).toBe(200)
            expect(body).toHaveProperty("category", "HORROR");
        })
    });

    describe("POST/API/GENRES", ()=>{
        it("should make a post request to api/genres and post a genre", async()=>{
        
            let newGenre = {category:"COMEDY", names:["Mr. Bean", "Pink Panther", "Dexter"]};

            let {body, status} = await request(server).post("/api/genres").send(newGenre);

            expect(status).toBe(201)
            expect(body).toHaveProperty("category", "COMEDY");
        });
    });

    describe("DELETE/API/GENRES", ()=>{
        it("should make a delete request to api/genres/id and delete a genre", async()=>{           
            let newGenre = {category:"HORROR", names:["Mr. Bean", "Pink Panther", "Dexter"]};
            await Genre.create(newGenre)


            let genre = await Genre.findOne({category:"HORROR"})

            let {status} = await request(server).delete(`/api/genres/${genre._id.toString()}`);
     
            let delGenre = await Genre.findOne({category:"HORROR"})
            expect(status).toBe(200)
            expect(delGenre).toBeFalsy()
        })
    });

    describe("PATCH/API/GENRES", ()=>{
     
        it("should update a genre at api/genres/id", async()=>{
            let newGenre = {category:"COMEDY", names:["Mr. Bean", "Pink Panther", "Dexter"]};
            await Genre.create(newGenre);

            let genre = await Genre.findOneAndUpdate({category:"COMEDY"}, {$set:{
                category:"MAGIC"
            }}, {new:true})
            
            let {body} = await request(server).get(`/api/genres/${genre._id.toString()}`);
         
            expect(body).toHaveProperty("category", "MAGIC")
        })
    })
})



