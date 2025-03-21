const mongoose = require('mongoose')
const dbURI = "mongodb+srv://Admin:Admin@cluster0.sltih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })