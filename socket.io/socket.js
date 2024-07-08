import Server from 'socket.io'
import {
  addTemporal,
  updateDeviceId,
  updateDeviceSerial,
  deviceOff,
} from '../controllers/socket.js'
export const socket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  })
  io.on('connection', (socket) => {
    console.log(
      'A user connected',
      socket.handshake.address.replace('::ffff:', '')
    )
    if (socket.handshake.query.type === 'device') {
      // socket.on('newDevice', (data) => {
      //   addTemporal(data, socket.handshake.address.replace('::ffff:', ''))
      //   socket.serial = data.serial
      // })
      socket.on('deviceSend', async (data) => {
        console.log('d', data)

        // updateDeviceSerial(data, (err, result) => {
        //   if (err) {
        //     console.error('Error:', err)
        //   } else {
        //     io.sockets.emit('userReceiver', result)
        //   }
        // })
      })
    }
    if (socket.handshake.query.type === 'user') {
      console.log('user')
      socket.on('userSend', async (data) => {
        console.log(data)
        updateDeviceId(data, (err, result) => {
          if (err) {
            console.log(err)
          } else {
            io.sockets.emit('deviceReceiver', {
              id: result.id,
              state: String(result.state),
            })
            io.sockets.emit('userReceiver', data)
          }
        })
      })
    }
    socket.on('message', (data) => {
      console.log(data)
    })
    socket.on('disconnect', () => {
      console.log(
        'A user disconnected',
        socket.handshake.address.replace('::ffff:', '')
      )
      if (socket.handshake.query.type === 'device') {
        updateDeviceSerial(
          { serial: socket.serial, state: 0 },
          (err, result) => {
            if (err) {
              console.error('Error:', err)
            } else {
              io.sockets.emit('userReceiver', result)
            }
          }
        )
      }
    })
  })
}
