const mongoose = require('mongoose')


const dbURI = "mongodb+srv://Admin:Admin@cluster0.sltih.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbURI, {
  tls: true, // Ensures TLS (SSL) is used
  tlsAllowInvalidCertificates: false, // Ensures only valid certificates are accepted
})
.then(() => console.log("Connected successfully"))
.catch(err => console.error("Connection error:", err));
