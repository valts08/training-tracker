import { User } from '../validation/user'

let users = [
  {
    id: 1,
    username: "billybob"
  },
  {
    id: 2,
    username: "valtscoolguy"
  },
  {
    id: 3,
    username: "pacereaper"
  }
]

const createUserService = (data: User) => {
    const idExists = users.some(user => user.id === data.id)
    const usernameExists = users.some(user => user.username === data.username)

    if (idExists) {
        throw new Error("Identifier conflict, can't submit user with already existing ID")
    }

    if (usernameExists) {
        throw new Error("Username already exists")
    }

    return data
}

export default createUserService