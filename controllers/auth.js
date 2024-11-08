import { UserRepository } from "../repositories/userRepository.js"
import { CreateUserDto, LoginDto } from "../dto/UserDto.js"
import Jwt from "jsonwebtoken"
import { createHash } from 'crypto'

export function registerAuthRoutes(fastify) {
    fastify.post('/signup', { schema: CreateUserDto }, async function createUser (request, reply) {
        const email = request.body.email
        const password = createHash('sha1')
            .update(request.body.password+process.env.PASSWORD_SALT)
            .digest('hex')
        const user = { email, password }
        
        return await UserRepository.createUser(user)
    })

    fastify.post('/login', { schema: LoginDto }, async function logUser (request, reply) {
        const email = request.body.email
        const password = createHash('sha1')
            .update(request.body.password+process.env.PASSWORD_SALT)
            .digest('hex')
        const user = await UserRepository.getUserByCredentials(email, password)
        if (!user) {
            throw new Error('Invalid Credentials')
        }
        user.token = Jwt.sign({ id:user.id }, process.env.JWT_SECRET)
        return user
    })
}