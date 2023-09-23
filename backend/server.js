const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_CLIENT_EVENTS } = require("mongodb");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs")

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
      // console.error(error);
      // Handle any errors here
      res.status(500).send({ message: "An error occurred" });
    });
});

app.post("/login", async (req, res) => {
  const { Mobile, Password } = req.body;
  // console.log("Mobile : ", Mobile)
  await UserModel.findOne({ Mobile: Mobile })
    .then((result) => {
      // console.log(result);
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
      // console.error(error);
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

app.get("/product", async (req, res) => {
  const data = await ProductModel.find({});
  res.send(JSON.stringify(data));
});

// ORDER SCHEMA
const orderSchema = mongoose.Schema({
  UserId: String,
  Amount: Number,
  Quantity: Number,
  Payment: String,
  OrderTime: String,
  OnWayTime: String,
  ShipTime: String,
  FinalTime: String,
  Items: Object,
  Address: Object,
  Status: String,
});

// Create a order model based on the schema
const OrderModel = mongoose.model("Order", orderSchema);

// /*****payment getWay */
// console.log(process.env.STRIPE_SECRET_KEY)
// const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-checkout-session", async (req, res) => {
  // console.log(req.body)
  try {
    const data = OrderModel(req.body);
    // console.log(data.Status)
    const save = data.save();
    res.status(200).send({ message: "Ordered successfully", alert: true });
  } catch (error) {
    // console.error(error);
    // Handle any errors here
    res.status(500).send({ message: "Error occurred", alert: false });
  }
  console.log(res)

  //      try{
  //       const params = {
  //           submit_type : 'pay',
  //           mode : "payment",
  //           payment_method_types : ['card'],
  //           billing_address_collection : "auto",
  //           shipping_options : [{shipping_rate : "shr_1N0qDnSAq8kJSdzMvlVkJdua"}],

  //           line_items : req.body.map((item)=>{
  //             return{
  //               price_data : {
  //                 currency : "inr",
  //                 product_data : {
  //                   name : item.name,
  //                   // images : [item.image]
  //                 },
  //                 unit_amount : item.price * 100,
  //               },
  //               adjustable_quantity : {
  //                 enabled : true,
  //                 minimum : 1,
  //               },
  //               quantity : item.qty
  //             }
  //           }),

  //           success_url : `${process.env.FRONTEND_URL}/success`,
  //           cancel_url : `${process.env.FRONTEND_URL}/cancel`,

  //       }

  //       const session = await stripe.checkout.sessions.create(params)
  //       // console.log(session)
  //       res.status(200).json(session.id)
  //      }
  //      catch (err){
  //         res.status(err.statusCode || 500).json(err.message)
  //      }
});

app.get("/order", async (req, res) => {
  const data = await OrderModel.find({});
  res.send(JSON.stringify(data));
});

app.get("/order/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const data = await OrderModel.find({ UserId: userId });
    res.send(JSON.stringify(data));
  } catch {
    res.status(500).send({ message: "Error in fetching data" });
  }
});

app.put("/status-change", async (req, res) => {
  // console.log("Backend", req.body)
  const { OrderId, NewStatus } = req.body;
  // console.log(OrderId)
  try {
    const time = new Date();
    let orderData = {};
    if (NewStatus == "onway") {
      orderData = await OrderModel.findOneAndUpdate(
        { _id: OrderId },
        { $set: { Status: NewStatus, OnWayTime: time.toLocaleString() } },
        { new: true }
      );
    } else if (NewStatus == "shipped") {
      orderData = await OrderModel.findOneAndUpdate(
        { _id: OrderId },
        { $set: { Status: NewStatus, ShipTime: time.toLocaleString() } },
        { new: true }
      );
      // orderData.ShipTime = time.toLocaleString();
    } else {
      orderData = await OrderModel.findOneAndUpdate(
        { _id: OrderId },
        { $set: { Status: NewStatus, FinalTime: time.toLocaleString() } },
        { new: true }
      );
      // orderData.FinalTime = time.toLocaleString();
    }

    // console.log(orderData)

    // console.log(output)
    // await orderData.save();
    // const save = data.save();
    // res.status(200).send({ message: "Ordered successfully", alert: true });
  } catch (error) {
    // console.error(error);
    // Handle any errors here
    res.status(500).send({ message: "Error occurred", alert: false });
  }
});

app.listen(PORT, () => console.log("server port : " + PORT));
