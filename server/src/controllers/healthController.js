import mongoose from 'mongoose'

export function getHealth(req, res) {
  const mongoState = mongoose.connection.readyState
  const mongoStatus =
    mongoState === 1 ? 'connected' : mongoState === 2 ? 'connecting' : 'disconnected'

  res.json({
    status: 'ok',
    mongodb: mongoStatus,
    timestamp: new Date().toISOString(),
  })
}
