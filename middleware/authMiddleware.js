import { UserRepository } from "../repositories/userRepository.js"
import Jwt from "jsonwebtoken"

export function registerAuthMiddleware(fastify) {
    fastify.decorate('authUser', async function (request, reply) {
        const authHeader = request.headers['authorization']

        if(!authHeader) {
            reply.code(401).send({error: 'Token Not Found'})
        }

        const token = authHeader.replace('Bearer ', '')

        try {
            const payload = Jwt.verify(token, process.env.JWT_SECRET)
            const user = await UserRepository.getUserById(payload.id)

            if (!user) {
                reply.code(404).send({ error: 'User not found' })
                return
            }

            request.user = user
        } catch (err) {
            reply.code(401).send({ error: 'Invalid token'})
            return
        }
    })
}
