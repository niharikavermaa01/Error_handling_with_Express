const express= require ("express");
const Chat = require("./models/chat.js")
const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("Connection successful.");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from:"niharika",
        to: "divyansh",
        message:"Send the final report",
        created_at: new Date()
    },
    {
        from:"chakshu",
        to: "jasmeet",
        message:"Hii",
        created_at: new Date()
    },
    {
        from:"chakshu",
        to: "divyansh",
        message:"Hi bro",
        created_at: new Date()
    }
];

Chat.insertMany(allChats);
