import { fastify } from 'fastify'
import { DataBasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DataBasePostgres()

// create video
server.post('/videos', async (request, reply) => {

  const { title, description, duration } = request.body

  await database.create({
    title,
    description,
    duration
  })

  return reply.status(201).send()
})

// list video
server.get('/videos', async (request) => {
  const search = request.query.search

  const videos = await database.list(search)

  return videos
})

// update video
server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  const { title, description, duration } = request.body

  await database.update(videoId, {
    title,
    description,
    duration
  })

  return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})

server.get('/projetos', async () => {
  const projects = await database.getProjects()

  return projects
})

server.post('/projetos', async (request, reply) => {

  const { title, description, image } = request.body

  await database.createProject({
    title,
    description,
    image
  })

  return reply.status(201).send()
})

server.delete('/projetos/:id', async (request, reply) => {
  const projetoId = request.params.id

  await database.deleteProject(projetoId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333
})
