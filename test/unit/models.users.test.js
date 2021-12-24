let User = require("../../models/Users");
let jwt = require("jsonwebtoken");
let mongoose = require("mongoose")
require("dotenv").config();

let {JWT_SECRET:jwtSecret} = process.env;

describe("user.generateToken", ()=>{
    it("should generate a valid jwt token", ()=>{
        
        let payload = {id: new mongoose.Types.ObjectId(), email:"ja@yahoo.com"}
        let user = new User(payload);
        let token = user.generateToken();

        let decodedToken = jwt.verify(token, jwtSecret);

        expect(decodedToken).toMatchObject(payload)
        
    });
})




