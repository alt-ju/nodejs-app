import { prisma } from "../services/db.js"

export const UserRepository = {
    getUserByCredentials: async (email, password) => {
        const user = await prisma.users.findFirst({
            where: {
                email: email,
                password: password
            }
        })
        return user
    },
    getUserById: async (id) => {
        const user = await prisma.users.findUnique({
            where: {
                id: id
            },
            include: {
                posts: true
            }
        })
        return user
    },
    createUser: async (user) => {
        const newUser = await prisma.users.create({
            data: user
        })
        return newUser
    }
}