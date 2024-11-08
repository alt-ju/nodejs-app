import { ExistingUserOut } from "./UserDto.js"

const ExistingPostDto = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        content: { type: 'string' },
        author: ExistingUserOut,
        categories: {
            type: 'array'
        }
    },
    required: ['title', 'content']
}

export const CreatePostDto = {
    security: [{ token:[] }],
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' }
        },
        required: ['title', 'content'],
    },
    response: {
        200: ExistingPostDto
    }
}

export const GetPostDto = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number' },
            limit: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'array',
            items: ExistingPostDto
        }
    }
}

export const GetByIdPostDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    response: {
        200: ExistingPostDto
    }
}

export const UpdatePostDto = {
    security: [{ token:[] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            content: { type: 'string' }
        }
    },
    response: {
        200: ExistingPostDto
    }
}

export const DeletePostDto = {
    security: [{ token:[] }],
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'},
        },
        required: ['id']
    },
    response: {
        200: ExistingPostDto
    }
}

export const postCategoryDto = {
    body : {
        type: 'object',
        properties: {
            postId: { type: 'number' },
            categoryId: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                postId: { type: 'number' },
                categoryId: { type: 'number' }
            }
        }
    }
}