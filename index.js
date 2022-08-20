const express = require("express");
// const jwt = require('jsonwebtoken');
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
//MIDDLEWARE
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.likhlkc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const productsCollection = client
      .db("it_course")
      .collection("services");

    //    //auth jwt token
    //    app.post('/login',async(req, res)=>{
    //     const user = req.body;
    //     const getAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
    //         expiresIn: '1d'
    //     });
    //     res.send({getAccessToken});
    // })

    app.get("/inventory", async (req, res) => {
      const query = {};
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

  
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("it_course server is running!!");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
