import { PostRepository } from "../repositories/postRepository.js"
import { CreatePostDto, GetPostDto, GetByIdPostDto, UpdatePostDto, DeletePostDto, postCategoryDto } from "../dto/PostDto.js"
import { NotAuthorizedError } from "../utils/error.js"

export function registerPostRoutes(fastify) {
    fastify.get('/posts', { schema: GetPostDto }, async function getPosts (request, reply) {
        const page = parseInt(request.query.page) || 1
        const limit = parseInt(request.query.limit) || 3
        return await PostRepository.getAllPosts(page, limit)
    })

    fastify.get('/posts/:id', { schema: GetByIdPostDto }, async function getPost (request, reply) {
        const id = parseInt(request.params.id)
        return await PostRepository.getPostById(id)
    })

    fastify.post('/posts', { 
        preHandler: fastify.auth([fastify.authUser]),
        schema: CreatePostDto 
    }, async function createPost (request, reply) {
        const userId = request.user.id
        const newPost = request.body
        newPost.authorId = userId        
        return await PostRepository.createPost(newPost)
    })

    fastify.delete('/posts/:id', {
        preHandler: fastify.auth([fastify.authUser]),  
        schema: DeletePostDto 
    }, async function deletePost (request, reply) {
        const userId = parseInt(request.user.id)
        const oldPost = await PostRepository.getPostById(request.params.id)
        if (oldPost.author.id !== userId) {
            throw new NotAuthorizedError('You cannot delete this post')
        }
        const id = parseInt(request.params.id)
        return await PostRepository.deletePost(id)
    })

    fastify.put('/posts/:id', {
        preHandler: fastify.auth([fastify.authUser]),  
        schema: UpdatePostDto
    }, async function updatePostByUser (request, reply) {
        const id = parseInt(request.params.id)
        const userId = parseInt(request.user.id)
        const oldPost = await PostRepository.getPostById(id)
        if (oldPost.author.id !== userId) {
            throw new NotAuthorizedError('You cannot modify this post')
        }
        const body = request.body
        return await PostRepository.updatePost(id, body)
    })

    fastify.post('/posts/categories', {
        schema: postCategoryDto
    }, async function addCategoryToPost (request, reply) {
        const body = request.body
        return await PostRepository.addCategoryToPost(body)
    })

    fastify.put('/posts/categories', async function (request, reply) {
        const postCategory = request.body
        return await PostRepository.updateCategoryPost(postCategory)
    })
}