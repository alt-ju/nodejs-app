import { prisma } from "../services/db.js"

export const CategoryRepository = {
    getCategoryById : async (id) => {
        const category = await prisma.categories.findUnique({
            where: {
                id: id
            }
        })
        if (!category) {
            throw new Error('Not Found')
        }
        return category 
    },
    getAllCategories : async (page, limit) => {
        const allCategories = await prisma.categories.findMany({
            skip: (page - 1) * limit,
            take: limit
        })
        return allCategories
    },
    createCategory : async (category) => {
        const newCategory = await prisma.categories.create({
            data: category
        })
        return newCategory
    },
    updateCategory : async (id, category) => {
        const oldCategory = await prisma.categories.findUnique({
            where: {
                id: id
            }
        })
        if (!oldCategory) {
            throw new Error('Not Found')
        }
        const updatedCategory = await prisma.categories.update({
            data: category, 
            where: {
                id: id
            }
        })
        return updatedCategory
    },
    deleteCategory : async (id) => {
        const deletedCategory = await prisma.categories.delete({
            where: {
                id: id
            }
        })
        return deletedCategory
    }
}