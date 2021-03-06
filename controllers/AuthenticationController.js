const userModel = require('../models').User;
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  // ONE_WEEK = 60 * 60 * 24 * 7
  const ONE_WEEK = 60 * 15
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await userModel.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.error(err);
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}