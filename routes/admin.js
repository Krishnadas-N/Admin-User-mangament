const express = require("express");
const router = express.Router();
const session = require("express-session");
const adminModel = require("../models/Admin");
const UserModel = require("../models/User");
const mongoose = require("mongoose");
const nocache = require('nocache')

// router.use(nocache)
let admiN;

//Admin Login......
// router.use((req, res, next) => {
//   res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
//   next();
// });

function isAdmin(req, res, next) {
  if (req.session && req.session.isAdmin) {
    next();
  } else {
    res.status(403).render('FORBIDDEN');
    // res.redirect("/admin/login");
  }
}

function checkUserSession(req, res, next) {
  if (req.session && req.session.user) {
    res.locals.isUserActive = true;
  } else {
    res.locals.isUserActive = false;
  }
  next();
}

// Apply the checkUserSession middleware to all admin routes
router.use(checkUserSession);



router.get("/login", (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect("/admin");
  } else {
    res.render("adminLogin");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(adminModel);

    const admin = await adminModel.findOne({ email, password });

    console.log(admin);

    if (admin) {
      admiN = admin.name;
      req.session.isAdmin = true;
      console.log(admiN);
      res.status(200);
      res.redirect("/admin");
    } else {
      res.render("adminLogin", {
        errorMessage: "Invalid admin credentials",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//Admin Homepage....

router.get("/", isAdmin, (req, res) => {
  res.render("adminHome", { admiN });
});

router.get("/logout", isAdmin, (req, res) => {
  console.log("hello logout ");
  // req.session.isAdmin=false;
                                                  // if (req.session.isAdmin) {
                                                  //   req.session.destroy((err) => {
                                                  //     if (err) {
                                                  //       console.error("Error destroying admin session:", err);
                                                  //     }
                                                  //     res.redirect("/admin/login");
                                                  //   });
                                                  // } else {
                                                  //   // Session doesn't exist; redirect to the login page
                                                  //   res.redirect("/admin/login");
                                                  // }
    req.session.isAdmin=false;
    res.redirect('/admin/login')

});

//Admin side users lists....

router.get("/users", isAdmin, async (req, res) => {
  const users = await UserModel.find();
  console.log(users);
  res.render("usersList", { users });
});

//Users delete

router.delete("/users/delete/:id", isAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      res.status(404).send("User not found");
    } else {
      req.session.user=false;
      res.send("User deleted successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while deleting the user");
  }
});

//Users add.....

router.get("/users/add", isAdmin, (req, res) => {
  res.render("adminAdduser");
});

router.post("/users/add", isAdmin, (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists in the database
  UserModel.findOne({ email: email })
    .then((foundUser) => {
      if (foundUser) {
        res.render("adminAdduser", {
          errorMessage: "User already exists. Please See in your list.",
        });
      } else {
        const newUser = new UserModel({
          name: username,
          email: email,
          password: password,
        });

        newUser
          .save()
          .then(() => {
            res.send(
              '<script> window.location.href = "/admin/users"; alert("New User are added successfully."); </script>'
            );
            return;
          })
          .catch((err) => {
            console.error(err);
            res.send(
              '<script>alert("Error occurred while registering the user."); window.location.href = "/users";</script>'
            );
            //   res.send(`<script>
            //   toastr.error('Error occurred while registering the user.');
            //   window.location.href = '/signup';
            // </script>`);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.send(
        '<script>alert("Error occurred while checking user existence."); window.location.href = "/signup";</script>'
      );
    });
});

//Users Update....

router.get("/users/edit/:userId", isAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Render the EJS template for editing user details
    res.render("adminEdituser", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to handle user details update
router.post("/users/edit/:userId", isAdmin, async (req, res) => {
  try {
    const userId = req.params.userId;

    const updatedUserDetails = req.body;
    console.log("herer updated");

    const user = await UserModel.findByIdAndUpdate(userId, updatedUserDetails, {
      new: true,
    });
    if (!user) {
      res.send(
        '<script> window.location.href = "/admin/users"; alert("User is Not Found or something error occurs."); </script>'
      );
      return;
    }
    // Redirect to a user details page or dashboard
    // res.redirect('/admin/users');
    res.send(
      '<script> window.location.href = "/admin/users"; alert("User Details are updated successfully."); </script>'
    );
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//To search the users

router.post("/users/search", isAdmin, async (req, res) => {
  try {
    const { searchTerm } = req.body;
    console.log(searchTerm);
    // Perform the user search based on the searchTerm
    const Users = await UserModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Case-insensitive name search
        { email: { $regex: searchTerm, $options: "i" } }, // Case-insensitive email search
      ],
    });
    
    // Render a page with the search results
    res.render("adminUserSearch", { Users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

// <--------------------------------------------------------------------------------------------------------------------------------->

// router.post('/admin/users', async (req, res) => {
//   try {
//       const { searchTerm } = req.body;
// console.log();
//       // Perform the user search based on the searchTerm
//       const users = await UserModel.find({
//           $or: [
//               { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive name search
//               { email: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive email search
//           ],
//       });

//       res.json(users);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });
