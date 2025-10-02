const express= require ("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError.js");

app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

main()
  .then(() => {
    console.log("Connection successful.");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats})
})

app.get("/chats/new", (req,res)=>{
    let chats =  Chat.find();
    console.log(chats);
    res.render("newchat.ejs",{chats})
});

app.post("/chats",async (req,res,next)=>{
    let{from, to, message}= req.body;
        if (!message || message.trim() === "") {
            throw new ExpressError(400, "Chat message cannot be blank.");
        }
        let newchat = new Chat({
        from: from,
        to: to,
        message: message,
        created_at: new Date()
    });
    await newchat.save()
    res.redirect("/chats");
});


//in Express 4 we need to write our asyncWrap or try-catch block but 
//but in express 5 it handles it automatically without asyncWrap nor try catch block.
//but for better understanding i am trying this.

function asyncWrap (fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    };
}
app.get("/chats/:id/edit",asyncWrap(async (req,res,next)=>{
        let {id}= req.params;
        let chat = await Chat.findById(id);
        if(!chat){
        throw new ExpressError(404,"ID wrong chat not found")
    }
    res.render("editchat.ejs",{chat})
}));


app.put("/chats/:id",async (req,res)=>{
    let {id}= req.params;
    let {message} = req.body;
    let updatedmsg = await Chat.findByIdAndUpdate(
        id,
        {message: message},
        {runValidators:true, new:true}
    );
    console.log(updatedmsg)
    res.redirect("/chats");
});

app.delete("/chats/:id",async (req,res)=>{
    let {id}= req.params;
    let deletechat= await Chat.findByIdAndDelete(id);
    console.log(deletechat);
    res.redirect("/chats");
})
//error handling middleware 
app.use((err,req,res,next)=>{
    let { status=500, message="Some error has occurred" }= err;
    res.status(status).send(message);
})


app.listen(8080,()=>{
    console.log("Server is running")
})