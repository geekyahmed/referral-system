/* Importing Different Modules */

const { globalVariables } = require('./config/config')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const hbs = require('express-handlebars')
const { mongoDbUrl, PORT } = require('./config/config')
const flash = require('connect-flash')
const session = require('express-session')
const { selectOption } = require('./config/customFunctions')
const passport = require('passport')
const app = express()
const authRoutes = require('./app/routes/auth.routes')
const profileRoutes = require('./app/routes/profile.routes')

// Configure Mongoose to Connect to MongoDB
mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true
  })
  .then(response => {
    console.log('MongoDB Connected Successfully.')
  })
  .catch(err => {
    console.log('Database connection failed.')
  })

/* Configure express*/
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.static(path.join(__dirname, 'public')))

/*  Flash and Session*/
app.use(
  session({
    secret: 'anysecret',
    saveUninitialized: true,
    resave: true
  })
)

app.use(flash())

/* Passport Initialize */
app.use(passport.initialize())
app.use(passport.session())

/* Use Global Variables */
app.use(globalVariables)

/* Setup View Engine To Use Handlebars */
app.engine(
  'handlebars',
  hbs({
    defaultLayout: 'default',
    helpers: {
      select: selectOption
    }
  })
)
app.set('view engine', 'handlebars')

app.use('/', authRoutes)
app.use('/dashboard', profileRoutes)

/* Start The Server */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
