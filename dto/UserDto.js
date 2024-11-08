export const ExistingUserOut = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        id: { type: 'number' },
    },
    required: ['email', 'id']
}

const ExistingUserIn = {
    type: 'object',
    properties: {
        email: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['email', 'password']
}

export const CreateUserDto = {
    body: ExistingUserIn,
    response: {
        200: ExistingUserOut
    }
}

export const LoginDto = {
    body: ExistingUserIn,
    response: {
        200: {
            type: 'object',
            properties: {
            email: { type: 'string' },
            id: { type: 'number' },
            token: { type: 'string' }
            },
            required: ['email', 'token', 'id']
        } 
    }
}

export const GetUserByIdDto = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'number'}
        },
        required: ['id']
    },
    response: {
        200: ExistingUserOut
    }
}
