import { expect, test } from 'vitest'
import got from 'got'

const client = got.extend({
    prefixUrl: 'http://localhost:3000/',
    responseType: 'json',
    throwHttpErrors: false
})

test('[VALID] POST /signup', async () => {
    const res = await client.post('signup', {
        json: {
            email: 'johndoe@gmail.com',
            password: 'password'
        }, 
        responseType: 'json'
    })
    const data = res.body
    expect(res.statusCode).toBe(200)
    expect(data).toHaveProperty('id')
    expect(data.email).toBe('johndoe@gmail.com')
    expect(data).to.not.have.property('password')
})

test('[VALID] POST /login', async () => {
    const res = await client.post('login', {
        json: {
            email: 'johndoe@gmail.com',
            password: 'password'
        }, 
        responseType: 'json'
    })
    const data = res.body
    expect(res.statusCode).toBe(200)
    expect(data).toHaveProperty('id')
    expect(data).toHaveProperty('email')
    expect(data).toHaveProperty('token')
    expect(data.email).toBe('johndoe@gmail.com')
    expect(data).to.not.have.property('password')
})

test('[VALID] POST /posts', async () => {
    const res = await client.post('posts', {
        json: {
            title: 'titre',
            content: 'contenu',
            author: {
                email: 'johndoe@gmail.com',
                id: '1'
            }
        },
        responseType: 'json'
    })
    const data = res.body
    expect(res.statusCode).toBe(200)
    expect(data.titre).toBe('titre')
    expect(data.content).toBe('content')
})