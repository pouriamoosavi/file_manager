const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
//let hashedPasswordFromClient = bcrypt.hashSync(password, salt);

router.get("/login", async function (req, res, next) {
  try{
    if (req.session.loggedin) {
      res.redirect('/b');
    } else {
      return res.render("login", {errcode: req.query && req.query.errcode});
    }
  } catch (err) {
    return next(err, req, res);
  }
});

router.post("/auth", async function (req, res, next) {
  try{
    const {username, password} = req.body;
    if(!username || !password) {
      return res.redirect("/u/login?errcode=1");
    }
    let user = global.appDB.get('users').find({username}).value();
    if(user) {
      if(bcrypt.compareSync(password, user.password || '')) {
        req.session.loggedin = true;
        req.session.username = username;
        return res.redirect('/b');
      } else {
        return res.redirect("/u/login?errcode=1");
      }
    } else {
      return res.redirect("/u/login?errcode=1");
    }

  } catch (err) {
    return next(err, req, res);
  }
});

router.get("/logout", async function (req, res, next) {
  try{
    req.session.destroy();
    return res.redirect("/u/login");
  } catch (err) {
    return next(err, req, res);
  }
});

module.exports = router;
