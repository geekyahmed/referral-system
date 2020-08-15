# Referral System

This is a simple referral system that makes use of Nodejs to implement a referral system logic.
Let's connect on [Twitter](https://twitter.com/geekyahmed) and [Github](https://github.com/geekyahmed)

# Technologies Used

- Nodejs
- MongoDB
- Express-Handlebars
- Passport

# Getting Started

- Open your Terminal e.g Git Bash
- Fork or clone this project on your terminal
- Open the project and install the packages
- Run the application from your Terminal

Overview:

```shell
$ git clone https://github.com/geekyahmed/referral-system
$ cd referral-system
$ npm install
$ npm start
```

Your application should be running on [localhost:3000](http://localhost:3000), open your browser and check it out.

## Project Structure

    >app
    L controllers
        L auth
    	    L auth.controller.js
    	L profile.controller.js
    L middlewares
    	L auth.js
    L models
    	L referral.js
    	L user.js
    L routes
    	L auth.routes.js
    	L profile.routes.js
    L services
    	L referral.service.js

    >config
    	L config.js

    >public
    >views
    app.js

The **app.js** is the entry point of our application.

**Controllers** contain the logic of the app where it processes data from the models and pass it to the views directory for rendering.

**Middlewares** contain the user authentication middleware for checking if users are properly authenticated.

**Models** contain the schema for our application for the referral and the user.

**Routes** contains the application routes which includes the registration, login and the dashboard.

**Services** handle the logic of checking and validating referrals for users.

**Config** contains the environment variables.

**Public** contains the static assets like the CSS and Javascript files.

**Views** contains the rendered data and template for the application frontend.

## Contributing

This is a completely free and open sourced project. Feel free to contribute. :heart:
Thanks for reading...
