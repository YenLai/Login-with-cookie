function Login(user) {
  const users = [
    {
      firstName: 'Tony',
      email: 'tony@stark.com',
      password: 'iamironman'
    },
    {
      firstName: 'Steve',
      email: 'captain@hotmail.com',
      password: 'icandothisallday'
    },
    {
      firstName: 'Peter',
      email: 'peter@parker.com',
      password: 'enajyram'
    },
    {
      firstName: 'Natasha',
      email: 'natasha@gamil.com',
      password: '*parol#@$!'
    },
    {
      firstName: 'Nick',
      email: 'nick@shield.com',
      password: 'password'
    }
  ]

  //crop the info. of the user
  const member = users.filter(member => member.email === user.email)

  //if what we crop is an empty array, return null
  if (member.length !== 0) {
    if (user.password === member[0].password)
      return member[0].firstName
    else {
      return false
    }
  }
  else {
    return false
  }

}
module.exports = Login
