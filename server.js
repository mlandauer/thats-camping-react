const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()

// serve static assets normally
app.use(express.static(__dirname + '/public'))
app.use('/fonts', express.static(__dirname + '/fonts'))

app.get('/api/data.json', function (request, response){
  response.sendFile(path.resolve(__dirname, 'data.json'))
})

// When running on heroku (which sets the x-forwarded-proto header) forward
// everything to https
app.get('*', function(request, response, next){
  if(request.headers['x-forwarded-proto'] != undefined && request.headers['x-forwarded-proto'] != 'https')
    response.redirect('https://thatscamping.herokuapp.com' + request.url)
  else
    next() // Continue to other routes if we're not redirecting
})

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)
console.log("server started on port " + port)
