//los tester es uno por post
const { graphql } = require("graphql");
const { schema } = require("../app");
const actions = require("../actions");
const setupTest = require("./helpers");

const mutationRegister = ` 
    mutation Register($data:UserCreateInput!){
        signup(data:$data){
            token
            message
        }
    }
`

describe("User singup works correctly",()=>{
    beforeEach(async() => await setupTest());
    //afterEach
    it("Should create user correctly ", async()=>{
        const data ={
            first_name:"Test",
            last_name:"test",
            email:"test@gmail.com",
            password:"pokemon243"
            //profile_image:""
        }
        const res = await graphql(schema, mutationRegister, null,{},{data})
        expect(res.data.signup).toHaveProperty("token")
    })
    it("should not create user", async()=>{
        const data = {
            first_name:"Test",
            last_name: "test",
            email: "test@gmail.com",
            password: "pokemon243"
            //profile_image: ""

        };
        await actions.createUser(data);
        const res = await graphql(schema,mutationRegister,null,{},{data})
        expect(res).toHaveProperty("errors")
    })
})

const mutationLogin = `
        mutation LogUser($email:String!, $password:String!){
            login(email:$email, password:$password){
                token
            }
        }
`

describe("User Login Should work correctly", () =>{
    beforeEach(async ()=> await setupTest());
    it("should login correctly", async () =>{
        const data = {
            first_name:"Test",
            last_name:"test",
            email:"test2@gmail.com",
            password:"pokemon300"
            //profile_image:""
        };
        await actions.createUser(data);
        const res = await graphql(schema, mutationLogin, null, {},
            {
                email:data.email,
                password:data.password
            })
        expect(res.data.login).toHaveProperty("token");
    })
    it("should not login correctly", async () =>{
        const data = {
            first_name:"Test",
            last_name: "test",
             email: "test1@gmail.com",
             password: "pokemon300"
            //profile_image:""
        }
    await actions.createUser(data);
    const res  =await graphql(schema,mutationLogin,null,{},
        {
            email: data.email,
            password: data.password
        })
    expect(res).toHaveProperty("errors");
    })
})
