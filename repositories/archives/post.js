const posts = [
    {
        id: 1,
        title: 'Hello World!',
        content: 'This is a post about Hello World '
    },
    {
        id: 2,
        title: 'Article numéro 2',
        content: 'Ceci est mon deuxième article'
    }
]

export const PostRepository = {
    getPosts: async (page, limit) => {
        const start = (page -1) * limit
        const end = page * limit 
        return posts.slice(start,end)
    },
    getPost: async (id) => {
        const post = posts.find(post => post.id === id)
        if (!post) {
            throw new Error('Post Not Found')
        }
        return post
    },
    createPost: async (post) => {
        const id = posts.length + 1
        const newPost = { id, ...post }
        posts.push(newPost)
        return newPost
    },
    updatePost: async (id, post) => {
        const oldPost = posts.find(post => post.id === id)
        const index = posts.findIndex(post => post.id === id)
        if (!oldPost) {
            throw new Error('Post Not Found')
        }
        const newPost = { id, ...oldPost, ...post}
        posts[index] = newPost
        return newPost
    },
    deletePost: async (id) => {
        const index = posts.findIndex(post => post.id === id)
        if (index === -1) {
            throw new Error('Post Not Found')
        }
        const deleted = posts.splice(index, 1)
        return deleted
    }
}