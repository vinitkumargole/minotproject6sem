const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/CarrerGuidance", {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=> {
    console.log("done successful");
}).catch((e) => {
    console.log("No connection");
})