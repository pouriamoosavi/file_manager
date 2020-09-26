module.exports = function (req, res, next) {
  try{ 
    if (req.session.loggedin) {
      let user = global.appDB.get('users').find({username: req.session.username}).value();
      if(!user) {
        return res.redirect("/u/login");
      } else {
        res.locals.clientUser = user;
        return next();
      }
    } else {
      return res.redirect("/u/login");
    }
  } catch (err) {
    return next(err); 
  }
};