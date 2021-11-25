const mongoose = require('mongoose')
const dbURI = "mongodb+srv://k01:k01ramya@cluster0.zplgs.mongodb.net/details?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })