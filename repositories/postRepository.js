import { prisma } from "../services/db.js"
import { NotFoundError } from "../utils/error.js"

export const PostRepository = {
    getPostById: async (id) => {
        const post = await prisma.posts.findUnique({
            where: {
                id: id,
            },
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        })
        if(!post) {
            throw new NotFoundError('Post Not Found')
        }
        return post
    },
    createPost: async (post) => {
        const newPost = await prisma.posts.create({
            data: post,
            include: {
                author: true
            }
        })
        return newPost
    },
    getAllPosts: async (page, limit) => {
        const allPosts = await prisma.posts.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                author: true
            }
        })
        return allPosts
    },
    updatePost: async (id, post) => {
        const oldPost = await prisma.posts.findUnique({
            where: {
                id: id
            }
        })
        if (!oldPost) {
            throw new NotFoundError('Post Not Found')
        }
        const updatedPost = await prisma.posts.update({
            data: post,
            where: {
                id: id
            }
        })
        return updatedPost
    },
    deletePost: async (id) => {
        const deletedPost = await prisma.posts.delete({
            where: {
                id: id
            }
        })
        return deletedPost
    },
    addCategoryToPost: async (postCategory) => {
        const newPostCategory = await prisma.CategoriesPosts.create({
            data: postCategory
        })
        return newPostCategory
    },
    // updateCategoryPost: async (postCatgeory) => {
    //     const oldCategoryPost = await prisma.CategoriesPosts.update({
    //         where: {
    //             postId:
    //         }
    //     })
    // }
}