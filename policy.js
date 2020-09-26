module.exports = function (req, res, next) {
  try{ 
    if (req.session.loggedin) {
      let user = global.appDB.get('users').find({username: req.session.username}).value();
      if(!user) {
        return res.status(401).render("login", {errcode:null});
      } else {
        res.locals.clientUser = user;
        return next();
      }
    } else {
      return res.status(401).render("login", {errcode:null});
    }
  } catch (err) {
    return next(err); 
  }
};