const router = require("express").Router();
let Item = require("../models/Item");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Middleware function
const logRequest = (req, res, next) => {
  console.log(`Received a ${req.method} request to ${req.originalUrl}`);
  next();
};

// Use the middleware function on all routes
router.use(logRequest);

// Define other routes and handlers
router.route("/").get((req, res) => {
  res.send("Hello, World!");
});

router.route("/save").post((req, res) => {

  const item_id = req.body.id;
  const item_name = req.body.itemname;
  const measuring_unit = req.body.measuringunit
  const item_size = req.body.size
  const item_image = req.body.itemimg;
  const catogery = req.body.catogery;
  const company = req.body.company;
  const description = req.body.description;
  const sale_price = req.body.saleprice;
  const selling_price = req.body.sellingprice;
  const quantity = req.body.quantity;
  const active = req.body.active
  //create item object using item model
  const item = new Item({
    item_id,
    item_name,
    measuring_unit,
    item_size,
    item_image,
    catogery,
    company,
    description,
    sale_price,
    selling_price,
    quantity,
    active
}
  );

  console.log(item)
 // res.json("recieved")

  item.save()
       .then(()=>{
        res.json("item added")
       })
       .catch((err)=>{
         console.log(err)  
       })
});


router.route('/get-all').get((req,res)=>{

    Item.find()
        .then((items)=>{
            console.log(items)
            res.json(items)
        })
        .catch((err)=>{
            console.error(err)
        })
   // console.log(items)
   // res.json("get all items")

})

module.exports = router;
