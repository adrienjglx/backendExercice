import bcrypt from 'bcrypt'

export class UserModel {
  constructor() {
    this.users = []
  }

  // id email password
  create(user) {
    console.log(user)
    this.users.push(user)
  }

  findById(id) {
    return this.users.find(elt => elt.id === id)
  }

  checkPassword(id, password) {
    let user = this.findById(id)
    return !!bcrypt.compare(password, user.password)
  } // hint: make use of bcrypt to match password i.e: bcrypt.compare

  hashPassword(password) {
    return bcrypt.hash(password)
  } // hint: make use of bcrypt to hash password i.e: bcrypt.hash

  findByMail(email) {
    return this.users.find(elt => elt.email === email)
  }
}
