import { NextFunction, Request, Response } from "express"
import createUserService from "../services/users.services"
import { User, UserVal } from '../validation/user'

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

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    // not actually an async function, just trying to imitating for practice
    if (!req.body) {
        return res.status(400).json({ message: "No body sent with request" })
    }

    const user = await createUserService(req.body)

    const zoddedUser = UserVal.parse(user)

    users.push(zoddedUser)

    res.status(200).send({ users, message: "User added successfully" })
    // empty objects can also be added
}

const editUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id as string) // not sure why this needs to be cast as a string, but want to check later

    let editIndex = users.findIndex((user: User) => user.id === userId)

    if (editIndex == -1) {
        res.status(400).send({ message: `User with id ${userId} not found` })
    }

    users[editIndex] = UserVal.parse({
        id: userId,
        username: req.body.username
    })

    res.status(200).send({ users, message: "Username edited successfully" })
}

export { createUser, editUser }