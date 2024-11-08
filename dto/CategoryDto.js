const categoryOut = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        label: { type: 'string' }
    },
    required: ['id', 'label']
}

export const getCategoryByIdDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    response: {
        200: categoryOut
    }
}

export const getAllCategoriesDto = {
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
            items: categoryOut
        }
    }
}

export const createCategoryDto = {
    body: {
        type: 'object',
        properties: {
            label: { type: 'string' }
        },
        required: ['label']
    },
    response: {
        200: categoryOut
    }
}

export const updateCategoryDto = {
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
            label: { type: 'string' }
        }
    },
    response: {
        200: categoryOut
    }
}

export const deleteCategoryDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    response: {
        200: categoryOut
    }
}