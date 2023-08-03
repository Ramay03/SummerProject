const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_CLIENT_EVENTS } = require("mongodb");
const dotenv = require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// MONGO DB CONNECTION
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

// USER SCHEMA
const userSchema = mongoose.Schema({
  Name: String,
  Mobile: {
    type: Number,
    unique: true,
  },
  Email: {
    type: String,
    unique: true,
  },
  Password: String,
});

// Create a model based on the schema
const UserModel = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.post("/register", async (req, res) => {
  // console.log(req.body)
  const { Mobile } = req.body;

  await UserModel.findOne({ Mobile: Mobile })
    .then((result) => {
      // console.log(result);
      if (result) {
        // console.log("Already")
        res.send({
          message: "Mobile number is already registered",
          alert: false,
        });
      } else {
        // console.log("Not present")
        const data = UserModel(req.body);
        const save = data.save();
        res.send({ message: "You have registered successfully", alert: true });
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle any errors here
      res.status(500).send({ message: "An error occurred" });
    });
});

app.post("/login", async (req, res) => {
  // console.log(req.body)
  const { Mobile, Password } = req.body;
  await UserModel.findOne({ Mobile: Mobile })
    .then((result) => {
      console.log(result);
      if (result) {
        if (result.Password === Password) {
          const ResultData = {
            _id: result._id,
            Name: result.Name,
            Email: result.Email,
            Mobile: result.Mobile,
          };
          res.send({
            message: "Successfully logged in",
            alert: true,
            data: ResultData,
          });
        } else {
          res.send({ message: "Password is incorrect", alert: false });
        }
      } else {
        // console.log("Not present")
        res.send({ message: "Mobile number is not registered", alert: false });
      }
    })
    .catch((error) => {
      console.error(error);
      // Handle any errors here
      res.status(500).send({ message: "An error occurred" });
    });
});

// PRODUCT SCHEMA
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  quantity: String,
  mrp: Number,
  offer: String,
  image: String,
  category: String,
  searchword: String,
  stock: Boolean,
});

const ProductModel = mongoose.model("Product", productSchema);

app.post("/admin", async (req, res) => {
  const data = await ProductModel(req.body);
  const save = await data.save();
  res.send({ message: "Product is saved successfully", alert: true });
});


app.get("/product", async (req,res)=>{
  const data = await ProductModel.find({})
  res.send(JSON.stringify(data))
})


app.listen(PORT, () => console.log("server port : " + PORT));
