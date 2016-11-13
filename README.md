#exponent-push-expressjs

 Simple server to broadcast all devices with push notification with use of ExpressJS and Exponent Backend.

Implemented routes for listen and store tokens from devices and a route for send a message to all users connected (this is made with Exponent Backend, reason why I reuse exponent-node-sdk code)

#Deploy to Heroku
// initialize git for your project, add the changes and perform a commit

git init

git add .

git commit -m "first commit"

// create heroku app and push to heroku

heroku create

git push heroku master
