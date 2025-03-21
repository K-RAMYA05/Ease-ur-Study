const mongoose = require('mongoose');

const dbURI = "mongodb://Admin:Admin@cluster0.sltih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";

mongoose.connect(dbURI, {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
  sslValidate: true
})
.then(() => console.log("Connected successfully"))
.catch(err => console.error("Connection error:", err));

