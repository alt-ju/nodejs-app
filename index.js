import Fastify from 'fastify'
import { registerPostRoutes } from './controllers/post.js'
import { registerAuthRoutes } from './controllers/auth.js'
import { registerUsersRoutes } from './controllers/user.js'
import { registerCategoryRoutes } from './controllers/categoryController.js'
import fastifyCors from '@fastify/cors'
import Jwt from 'jsonwebtoken'
import fastifyAuth from '@fastify/auth'
import { registerAuthMiddleware } from './middleware/authMiddleware.js'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { registerErrorMiddleware } from './middleware/error.js'

const fastify = Fastify({
    logger: true,
    ajv: {
        customOptions: { removeAdditionnal: true }
    }
})

await fastify.register(fastifyAuth)

fastify.register(fastifyCors, {
    origin: process.env.NODE_ENV == 'production' ? 'example.com' : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
})

await fastify.register(fastifySwagger, {
    openapi: {
        components: {
            securitySchemes: {
                token: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    }
})

await fastify.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list'
    }
})

fastify.get('/', async function handler (request, reply) {
    return {hello: 'world'}
})

registerErrorMiddleware(fastify)
registerAuthMiddleware(fastify)
registerAuthRoutes(fastify)
registerPostRoutes(fastify)
registerUsersRoutes(fastify)
registerCategoryRoutes(fastify)

try {
    await fastify.listen({ port : 3000 })
    await fastify.ready()
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}

