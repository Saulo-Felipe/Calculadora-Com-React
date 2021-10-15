const express = require('express') 
const favicon = require('express-favicon') 
const path = require('path') 

const app = express() 

app.use(favicon(__dirname + '/build/favicon.ico')) 

app.use(express.static(__dirname))

app.use(express.static(path.join(__dirname, 'build'))) 

//Routes
app.get('/ping', function (req, res) {
  return res.send('pong') 
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html')) 
}) 

app.listen(process.env.PORT || 3000, (error) => {
  if (error) return console.log('Error: '+error)

  console.log('Tudo funcionando Perfeitamente.')
})