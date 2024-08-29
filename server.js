// Require Dotenv
require('dotenv').config();

// Require Express
const express = require('express');
const { connect } = require('mongoose');

// Get instance of  Express
const app = express();

// Create body parser middleware
app.use(express.json());

// Create PORT
const PORT = process.env.PORT || 5002;

// Create server
app.listen(PORT,(err) => {
    err ? console.log(err)
    : console.log(`Server is running on http://127.0.0.1:${PORT}`)
});

// Require connectDB
const connectDB = require('./config/ConnectDB');

connectDB()




// Define the Person schema
// Require Mongoose
const mongoose = require('mongoose');

// Create person Schema
const personSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
      type: Number,
      required: true
    },
    favoriteFoods: [String] ,
  },
  {
    collection : "persons"
  },
  {
    timestamps: true
  }
);

// Create the Person model
const Person = mongoose.model('Person', personSchema);

// Create new person
const onePerson = {
    name: "Jhon",
    age: 37 , 
    email: "jhon1@gmail.com",
    favoriteFoods:["Pizza","Pasta"]
}
// Create one person
const createOnePerason = async(onePerson)=>{
try {
    const savedPerson = await Person.create(onePerson)
    console.log("person created successfully", savedPerson)
} catch (error) {
    console.log("Error in saving person",error)
}
}

// createOnePerason(onePerson)

// Create many person
const createManyPersons = async(newPersons)=>{
    try {
        const savedPersons = await Person.insertMany(newPersons)
        console.log("person created successfully", savedPersons)
    } catch (error) {
        console.log("Error in saving person",error)
    }
    }

    const personArray = [
        {
            name: "saif",
            age: "22",
            email:"saif@gmail.com",
            favoriteFoods:["Pizza","Burgers"],
        },
        {
            name: "saif1",
            age: "28",
            email:"saif1@gmail.com",
            favoriteFoods:["kafteji","couscous","mloukhiya"],
        },
        {
            name: "saif2 ",
            age: "25",
            email:"saif2@gmail.com",
            favoriteFoods:["Sushi","Pasta","Salmon"],
        },
    ];


    // createManyPersons(personArray)


// find all the persons
const findAllPersons = async (newPersons)=>{
    try {
        const foundPersons = await Person.find()
        foundPersons.length >0 ? console.log("Persons found",foundPersons)
        : console.log("No Persons found")
        
    } catch (error) {
        console.log(error)
    
    } 
} 
// findAllPersons();


const foundPersonById = async(id)=>{
    try {
        const foundPerson = await Person.findById(id)
       foundPerson? console.log("person found", foundPerson)
       : console.log("person not found")
    } catch (error) {
        console.log(error)
    }
    }
// 


// find one person by name

const foundPersonByName = async (name)=>{
    try {
        const foundPersons = await Person.find({name: {$regex: name , $options:"i"}})
        foundPersons.length >0 ? console.log("Persons found",foundPersons)
        : console.log("No Persons found with this name")
    } catch (error) {
        console.log(error)
    }
}
// foundPersonByName("person 1")


// find one person by favorite food

const foundPersonByFavoriteFood = async (food)=>{
    try {
        const foundPerson = await Person.find({favoriteFoods: {$regex: food , $options:"i"}});
        foundPerson.length >0 ? console.log("Persons found",foundPerson)
        : console.log("No Person found ")
    } catch (error) {
        console.log(error)
    }
}
//  foundPersonByFavoriteFood("PASTA")

// find one person by id and update
const findPersonByIdAndUpdate = async (id , newFood) =>{
    try {
      const foundPerson = await Person.findByIdAndUpdate(id,{$push: {favoriteFoods: newFood}},{new: true});
      console.log("person updated successfully", foundPerson )
    } catch (error) {
        console.log(error)
    }
} 
// findPersonByIdAndUpdate("66cf52606e05369160321d49" ,"lasagna bolognese")

// find one person by name and update
const findPersonByNameAndUpdate = async (name , newAge) =>{
    try {
      const foundPerson = await Person.findOneAndUpdate({name : name},{age: newAge},{new: true});
      console.log("person updated successfully", foundPerson )
    } catch (error) {
        console.log(error)
    }
} 

// findPersonByNameAndUpdate ("person 2" , "35")

// find one person by id and remove
const findPersonByNameAndRemove = async (id) =>{
    try {
      await Person.findByIdAndDelete(id)
      console.log("person deleted successfully")
    } catch (error) {
        console.log(error)
    }
} 
// findPersonByNameAndRemove("66cf4e7bf1e1028a48a1d224")


const findPersonByNameAndUpdatee = async (currentName, newName) => {
    try {
      // Find a person by currentName and update their name to newName
      const updatedPerson = await Person.findOneAndUpdate(
        { name: currentName },      // Criteria: Find person with this name
        { $set: { name: newName } }, // Update operation: Set new name
        { new: true }                // Options: Return the updated document
      );
  
      if (updatedPerson) {
        console.log("Person updated successfully", updatedPerson);
      } else {
        console.log("No person found with the name", currentName);
      }
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };
  
//   // Example calls
//   findPersonByNameAndUpdatee("saif1", "saif");
//   findPersonByNameAndUpdatee("saif2 ", "saif");
  

// delete many persons
const deleteManyPersons = async (name) =>{
    try {
         await Person.deleteMany({name: name})
         console.log(`persons with the name ${name} deleted successfully `)
    } catch (error) {
        console.log(error)
    }
}
// deleteManyPersons("saif");

// chaing serach query 
const chainSearchQuery = async (food) => {
   try {
    const foundPersons = await Person.find({favoriteFoods:  food}).sort({name:1}).limit(2).select({age:0}).exec()
    console.log("persons found" ,foundPersons )
   } catch (error) {
    console.log(error)
   }
}

// chainSearchQuery("Pasta")