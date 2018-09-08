const express = require("express");
const bodyParser = require("body-parser");

// Controller Imports
const boardController = require("./boardController");
const listController = require("./listController");
const cardController = require("./cardController");

const massive = require("massive");
const session = require("express-session");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

/////////////////////
///// DATABASE //////
/////////////////////
massive(process.env.CONNECTIONSTRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("Connected to database");
  })
  .catch(err => {
    console.log(err.message);
  });

////////////////////
///// SESSIONS /////
////////////////////
app.use(
  session({
    secret: "mys3cr3t",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

///////////////////////////
///// AUTH0 STRATEGY //////
///////////////////////////
passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid email profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      const db = app.get("db");
      db.findUser(profile._json.email).then(user => {
        if (user.length) {
          return done(null, profile);
        } else {
          db.addUser([
            profile._json.email,
            profile._json.given_name,
            profile._json.family_name
          ]).then(user => {
            return done(null, profile);
          });
        }
      });
    }
  )
);

passport.serializeUser(function(profile, done) {
  console.log(profile);
  let user = {
    username: profile._json.email,
    first_name: profile._json.given_name,
    last_name: profile._json.family_name
  };
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//////////////////////
///// ENDPOINTS //////
//////////////////////

// Login Endpoint
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: process.env.ROOT_URL,
    failureRedirect: "/login",
    failureFlash: true
  })
);

// Logout Endpoint
app.post("/api/logout", (req, res, next) => {
  console.log("Logging out...");
  req.session.destroy();
});

// User Profile Endpoint
app.get("/profile", (req, res, next) => {
  const db = app.get("db");
  db.findUser(req.user.username)
    .then(user => {
      if (!req.user.username) {
        res.redirect("/login");
      } else {
        // Set session.user_id to the user_id from the db
        req.session.user_id = user[0].id;
        //console.log(req.session.user_id);
        res.status(200).send(user[0]);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/// Board Endpoints ///
// Create Board Endpoint
app.post("/api/board/new", boardController.createBoard);
// Read Board Endpoint (Get a single board)
app.get("/api/board/:id", boardController.readBoardByBoardId);
// Read Boards Endpoint (Get all boards for a user)
app.get("/api/boards/:id", boardController.readBoardsByUserId);
// Update Board Endpoint
app.put("/api/board/:id", boardController.updateBoard);
// Delete Board Endpoint
app.delete("/api/board/:id", boardController.deleteBoard);

/// List Endpoints ///
app.get("/api/lists", listController.readLists);
app.get("/api/lists/byBoard/:boardID", listController.readListsByBoardID);
app.post("/api/lists", listController.createList);
app.delete("/api/lists/:id", listController.deleteList);
app.put("/api/lists/:listID", listController.editList);

/// Card Endpoints ///
app.get("/api/card/:id", cardController.readCard); // get cards by card id
app.get("/api/cards/:id", cardController.readCardsByList); // get cards by list id
app.get("/api/cardbyboard/:id", cardController.readCardByBoard); // get cards by board id
app.post("/api/card", cardController.createCard); // makes new card and sends back all cards from the same list
app.put("/api/card/:id", cardController.editCard); // edits card w/ given id and sends back cards from same list
app.delete("/api/card/:id", cardController.deleteCard); // deletes card w/ given id

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
