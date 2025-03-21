const mongoose = require('mongoose');
const dbURI = "mongodb://Admin:Admin@cluster0.sltih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&&ssl=true";

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tls: true,
  tlsInsecure: true, // Bypass certificate validation (use with caution)
})
.then(() => console.log("Connected successfully"))
.catch(err => console.error("Connection error:", err));
