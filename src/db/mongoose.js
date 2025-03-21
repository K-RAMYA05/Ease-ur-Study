const mongoose = require('mongoose')
const dbURI = "mongodb+srv://Admin:Admin@cluster0.sltih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&&ssl=true";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, tlsAllowInvalidCertificates: true,ssl: true,   tls: true, })