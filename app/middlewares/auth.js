module.exports = {
  //Checks if user is authenticated
  isUserAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  }
}
