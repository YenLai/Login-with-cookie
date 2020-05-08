const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const expressSession = require('express-session')
const Login = require('./login')
const port = 3000
const app = express()
const hb = exphbs.create({
  defaultLayout: 'main'
})

app.engine('handlebars', hb.engine)
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({
  secret: 'secret key',
  cookie: { maxAge: 10 * 1000 }  //cookie存在10秒鐘
}))

// Login interface
app.get('/', (req, res) => {
  console.log(req.session)
  if (req.session.name) {
    res.redirect(`/${req.session.name}`)
  }
  else {
    res.render('index')
  }
})

app.post('/login', (req, res) => {
  const input = req.body
  const member = Login(input)

  if (member) {
    req.session.name = member
    res.redirect(`/${member}`)
  }
  else {
    res.render('index', { member_not_exist: !member, input })
  }
})

app.get('/:username', (req, res) => {
  if (req.session.name)
    res.render('view', { member: req.params.username })
  else {
    res.redirect('/')
  }
})


// profile, mail, setting routes
app.get('/:username/profile', (req, res) => {
  if (req.session.name)
    res.send(`<h1>Hi ${req.session.name}, This is your profile page</h1>`)
  else {
    res.redirect('/')
  }
})
app.get('/:username/mail', (req, res) => {
  if (req.session.name)
    res.send(`<h1>Hi ${req.session.name}, This is your mail page</h1>`)
  else {
    res.redirect('/')
  }
})
app.get('/:username/setting', (req, res) => {
  if (req.session.name)
    res.send(`<h1>Hi ${req.session.name}, This is your setting page</h1>`)
  else {
    res.redirect('/')
  }
})

app.listen(port, (req, res) => {
  console.log(`Express app is listening on http://localhost:${port}`)
})
