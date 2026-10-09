import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { createApp } from '../src/app.js'
import { Task } from '../src/models/Task.js'

let mongoServer
let app

before(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
  app = createApp()
})

after(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('TaskFlow API', () => {
  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health')
    assert.equal(res.status, 200)
    assert.equal(res.body.status, 'ok')
    assert.equal(res.body.mongodb, 'connected')
  })

  it('POST /api/tasks validates required fields', async () => {
    const res = await request(app).post('/api/tasks').send({ title: 'x' })
    assert.equal(res.status, 400)
    assert.match(res.body.message, /title must be at least 3/)
  })

  it('CRUD lifecycle for tasks', async () => {
    const createRes = await request(app).post('/api/tasks').send({
      title: 'Integration test task',
      description: 'Created by automated test',
      status: 'todo',
      priority: 'medium',
      assigneeId: 'user-2',
      dueDate: new Date().toISOString(),
    })
    assert.equal(createRes.status, 201)
    assert.ok(createRes.body.id)
    const taskId = createRes.body.id

    const listRes = await request(app).get('/api/tasks')
    assert.equal(listRes.status, 200)
    assert.equal(listRes.body.length, 1)

    const getRes = await request(app).get(`/api/tasks/${taskId}`)
    assert.equal(getRes.status, 200)
    assert.equal(getRes.body.title, 'Integration test task')

    const patchRes = await request(app)
      .patch(`/api/tasks/${taskId}`)
      .send({ status: 'done' })
    assert.equal(patchRes.status, 200)
    assert.equal(patchRes.body.status, 'done')

    const deleteRes = await request(app).delete(`/api/tasks/${taskId}`)
    assert.equal(deleteRes.status, 204)

    const missing = await request(app).get(`/api/tasks/${taskId}`)
    assert.equal(missing.status, 404)
  })

  it('returns 400 for invalid ObjectId', async () => {
    const res = await request(app).get('/api/tasks/not-an-object-id')
    assert.equal(res.status, 400)
    assert.match(res.body.message, /Invalid task id/)
  })

  it('returns 404 for missing task', async () => {
    const id = new mongoose.Types.ObjectId()
    const res = await request(app).get(`/api/tasks/${id}`)
    assert.equal(res.status, 404)
  })
})

describe('cleanup', () => {
  it('drops tasks collection', async () => {
    await Task.deleteMany({})
  })
})
