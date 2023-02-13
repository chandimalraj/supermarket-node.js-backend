const router = require("express").Router();
let Customer = require("../models/Customer");
const jwt = require('jsonwebtoken');


require("dotenv").config()

// Middleware function
// const logRequest = (req, res, next) => {
//   console.log(`Received a ${req.method} request to ${req.originalUrl}`);
//   next();
// };

// Use the middleware function on all routes
//router.use(logRequest);

// Define other routes and handlers
router.route("/").get((req, res) => {
  res.send("Hello, World!");
});


//customer registration
router.route("/register").post((req, res) => {
  
  //get user details from request
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const pword = req.body.password;

  //create customer object according to the Customer schema
  const newCustomer = new Customer({
    username,
    email,
    phone,
    pword,
  });

  //customer object save to database
  const query = { email: email, phone: phone };
  const query1 = { email: email };
  const query2 = { phone: phone };

  Customer.find(query, (error, user) => {
    if (error) {
      console.error(error);
    } else {
      if (user.length > 0) {
        res.json("Email and phone already registered");
      } else {
        Customer.find(query1, (error, user) => {
          if (error) {
            console.error(error + "email find");
          } else {
            if (user.length > 0) {
              res.json("Email is already registered");
            } else {
              Customer.find(query2, (error, user) => {
                //console.log("awa")
                if (error) {
                  console.error(error);
                } else {
                  if (user.length > 0) {
                    res.json("phone is already registered");
                  } else {
                    newCustomer
                      .save()
                      .then(() => {
                        res.json("Customer Added");
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }
              });
            }
          }
        });
      }
    }
  });
});

router.route("/login").post((req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const phonePattern = /^\d{10}$/;

  if (RegExp(phonePattern).test(id)) {
    const query = { phone: id };
    Customer.find(query, (error, user) => {
      if (error) {
        console.error(error);  
      } else {
        console.log(user);
        if (user[0].pword == password) {
         
          res.setHeader('Set-Cookie', 'my-cookie=hi buddy')
          res.json("user verified");
          
        } else {
          res.json("password incorrect");
        }
      }
    });
  } else {
    const query = { email: id };
    Customer.find(query, (error, user) => {
      if (error) {
        console.error(error);
      } else {
        console.log(user);
        if (user[0].pword == password) {
          
          res.json("user verified");
        } else {
          res.json("password incorrect"); 
        }
      }
    });
  }
});

const posts = [{
  "name":"chandimal",
  "post_id":1
},
{
  "name":"prabath",
  "post_id":2

}]

router.route("/login-test").post((req,res)=>{
  const username = req.body.uname;
  const user = {name:username}
  //asume that user authentication process is done

  //then create JWT token
  const accessToken= jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1m' })
  res.json({accessToken:accessToken})
})

function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null){
    return res.sendStatus(401)
  }
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
    if(err){
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })

}

router.route("/posts").get(authenticateToken, (req,res)=>{
  const user = req.user.name
 
 res.json("awa")

})
module.exports = router;
