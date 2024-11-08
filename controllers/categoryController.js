import { CategoryRepository } from "../repositories/categoryRepository.js"
import { getAllCategoriesDto, getCategoryByIdDto, createCategoryDto, updateCategoryDto, deleteCategoryDto } from "../dto/CategoryDto.js"

export function registerCategoryRoutes(fastify) {
    fastify.get('/categories/:id', {
        schema: getCategoryByIdDto
    }, async function getCategory (request, reply) {
        const id = parseInt(request.params.id)
        return await CategoryRepository.getCategoryById(id)
    })

    fastify.get('/categories', {
        schema: getAllCategoriesDto
    }, async function getAllCategories (request, reply) {
        const page = parseInt(request.query.page) || 1
        const limit = parseInt(request.query.limit) || 3
        return await CategoryRepository.getAllCategories(page, limit)
    })

    fastify.post('/categories', {
        schema: createCategoryDto
    }, async function createCategory (request, reply) {
        const newCategory = request.body
        return await CategoryRepository.createCategory(newCategory)
    })

    fastify.put('/categories/:id', {
        schema: updateCategoryDto
    }, async function updateCategory (request, reply) {
        const id = parseInt(request.params.id)
        const body = request.body
        return await CategoryRepository.updateCategory(id, body)
    })

    fastify.delete('/categories/:id', {
        schema: deleteCategoryDto
    }, async function deleteCategory (request, reply) {
        const id = request.params.id
        return await CategoryRepository.deleteCategory(id)
    })
}