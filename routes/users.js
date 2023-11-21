const express = require('express');
const router = express.Router();
const session = require('express-session');
const UserModel = require('../models/User');
 const bcrypt = require('bcrypt');
 const mongoose = require('mongoose');


let userName,userEmail;


// const nocache = (req, res, next) => {
//   res.set("Cache-Control", "no-store, max-age=0, must-revalidate");
//   next();
// };

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user && req.session.userDelete===false) {
    next();
  } else {
    res.redirect('/login');
  }
}

router.get('/',isAuthenticated,(req,res)=>{
  res.render('home',{user:userName})
})

// router.get('/', isAuthenticated, async (req, res) => {
//   if(req.session.userDelete){
//     console.log("this is working");
//     let doc=await UserModel.find({email:userEmail})
//     console.log(doc);
//     console.log(doc.length===0);
//     if(doc.length===0){
//       console.log("doc found")
//       req.session.user=false;
//       res.redirect('/login')
//     }else{
//       console.log("delete true");
     
     
//       res.render('home',{user:userName})
//     }
//     req.session.userDelete=false
//   }else{
//     console.log("else worked");
//   res.render('home', { user: userName});

//   }

// });


router.get('/signup', (req, res) => {
  res.render('userSignup');
});

router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists in the database
  UserModel.findOne({ email: email })
    .then(foundUser => {
      if (foundUser) {
        res.render('userSignup', { errorMessage: 'User already exists. Please log in.' });
      } else {
        const newUser = new UserModel({
          name: username,
          email: email,
          password: password,
          status:false,
        });

        newUser.save()
          .then(() => {
            res.send('<script>alert("User registered successfully."); window.location.href = "/login";</script>');
            return;
          })
          .catch(err => {
            console.error(err);
            res.send('<script>alert("Error occurred while registering the user."); window.location.href = "/signup";</script>');
          //   res.send(`<script>
          //   toastr.error('Error occurred while registering the user.');
          //   window.location.href = '/signup';
          // </script>`);
          
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.send('<script>alert("Error occurred while checking user existence."); window.location.href = "/signup";</script>');
    });
});


/* GET home page. */
router.get('/login', function (req, res) {
  
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('index', { title: 'Login Page' });
  }
});
router.post('/login', async(req, res) => {
  // userEmail = req.body.email;  
  // const Password = req.body.password;
  
  const { email, password } = req.body;
  console.log(req.body);
  // console.log('Username:', email);
  // console.log('Password:', password);
  try{
    console.log(UserModel);

  let user = await UserModel.findOne({ email:email });
  
  
   console.log(user);
   if(user){
    const passwordMatch = await bcrypt.compare(password,user.password)
   
   
   if (user && passwordMatch) {
    console.log(user.status +"   brfore");
    user.status=true;
    await user.save();
    console.log(user.status+"    after");

   userName  = user.name;
   userEmail = user.email;
     console.log(userName);
    req.session.user = true;
    req.session.userDelete=false;

    res.status(200);
    res.redirect('/');
  }} else {
    res.render('index', { errorMessage: 'Enter Valid Username or Password' });
  }
}catch(error){
  console.error(error);
  res.status(500).send('Internal Server Error');
}
});


router.get('/logout', async (req, res) => {
  try {
    if (req.session.user) {
      req.session.user = false;
      const user = await UserModel.findOne({ email: userEmail});
      console.log(user+'    logout');
      if (user) {
        user.status = false; // Set status to false on logout
        await user.save();
      }
      console.log(user+'    after logout');
    }
      
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;




// router.get('/logout', (req, res) => {
                                // req.session.destroy(err => {
                                //   if (err) {
                                //     console.error('Error destroying session:', err);
                                //   }
                                //   res.redirect('/login'); // Redirect to the login page after logout
                                // });

// req.session.user=false;
// res.redirect('/login');

// });
