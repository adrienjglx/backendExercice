import config from '../config'
import { UserModel } from '../resources/user/model'
import jwt from 'jsonwebtoken'

const modelUser = new UserModel();

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  let user = {
    email: req.body.email,
    password: await modelUser.hashPassword(req.body.password)
  }
  modelUser.create(user)
  const token = newToken(user)
  res.status(201).send(token)
}

export const signin = async (req, res) => {
  const user = modelUser.findByMail(req.body.email)
  if (modelUser.findByMail(req.body.email)) {
    if (modelUser.checkPassword(user.id, req.body.password)) {
      res.status(201).send()
    } else {
      res.status(401).send('Wrong password')
    }
  } else {
    res.status(401).send('Wrong email')
  }
}

export const protect = async (req, res, next) => {
  next()
}
