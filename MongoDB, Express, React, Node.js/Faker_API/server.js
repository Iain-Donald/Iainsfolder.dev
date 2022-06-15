const express = require("express");
const { faker } = require('@faker-js/faker');
const app = express();
const port = 8000;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

const users = new Array;

//// CREATE USER OBJECT (stored in 'users')
const createUser = () => {
  const newUser = {
      password: faker.internet.password(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      lastName: faker.name.lastName(),
      firstName: faker.name.firstName(), 
      _id: faker.random.numeric()
  };
  return newUser;
};
  
const newFakeUser = createUser();
users.push(newFakeUser);
console.log(users);


const companies = new Array;

//// CREATE COMPANY OBJECT (stored in 'companies')
const createCompany = () => {
  const newCompany = {
      _id: faker.random.numeric(),
      name: faker.company.companyName(),
      address: {
        street: faker.address.streetName(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country()
      }
  };
  return newCompany;
};
  
const newCompany = createCompany();
companies.push(newCompany);
console.log(companies);

    
// req is shorthand for request
// res is shorthand for response
app.get("/api/user/company", (req, res) => {
  res.json( JSON.stringify(users[0]) + JSON.stringify(companies[0]) );
});

app.get("/api/all", (req, res) => {
  res.json( JSON.stringify(users) + JSON.stringify(companies) );
console.log("\n\n------- Fake company -------\n");
console.log(createCompany());
console.log("------- Fake user -------\n");
console.log(createUser());
});

app.post("/api/users/new", (req, res) => {
  console.log(req.body);
  let tempUser = createUser();
  users.push(tempUser);
  res.json( tempUser );
});

app.post("/api/companies/new", (req, res) => {
  console.log(req.body);
  let tempCompany = createCompany();
  users.push(tempCompany);
  res.json( tempCompany );
});

app.listen( port, () => console.log(`Listening on port: ${port}`) );