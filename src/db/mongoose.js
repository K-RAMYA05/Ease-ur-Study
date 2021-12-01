const mongoose = require('mongoose')
const dbURI = "mongodb+srv://ADMIN:admin102@cluster0.tl7m4.mongodb.net/details?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })