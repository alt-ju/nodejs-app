const users = [
    {
        id: 1,
        email: 'chloewalsh@gmail.com',
        password: 123
    },
    {
        id: 2,
        email: 'elsiesilver@gmail.com',
        password: 345
    }
]

export const UserRepository = {
    getUser: async (id) => {
        const user = users.find(user => user.id === id)
        if(!user) {
            throw new Error('This user does not exist')
        }
        return user
    },
    createUser: async (email, password) => {
        const id = users.length + 1
        const newUser = { id, email, password }
        users.push(newUser)
        return newUser
    },
    identifyUser: async (email, password) => {
        const user = users.find(user => user.email === email && user.password === password)
        if (!user) {
            throw new Error('This user does not exist')
        }
        return user
    }
}