import { UserRepository } from "../repositories/userRepository.js"
import { GetUserByIdDto } from "../dto/UserDto.js"

export function registerUsersRoutes(fastify) {
    fastify.get('/users/:id', { schema: GetUserByIdDto }, async function getUser (request, reply) {
        const id = parseInt(request.params.id)
        return await UserRepository.getUserById(id)
    })
}