const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Login = require('./login')
const port = 3000
const app = express()
const hb = exphbs.create({
  defaultLayout: 'main'
})

app.engine('handlebars', hb.engine)
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})
app.post('/', (req, res) => {
  const input = req.body
  const member = Login(req.body)
  if (member) {
    res.render('view', { member, input })
  }
  else {
    res.render('index', { member: !member, input })
  }
})

app.listen(port, (req, res) => {
  console.log(`Express app is listening on http://localhost:${port}`)
})