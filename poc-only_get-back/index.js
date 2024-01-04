const mqtt = require('mqtt')
const getenv = require('getenv')

const host = 'localhost'
const port = getenv('PORT') ?? 1884
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
})

const topic = '/sensors/temp'

client.on('connect', () => {
    console.log('Connected')

    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
        client.publish(topic, 'sensors temp test', { qos: 0, retain: false }, (error) => {
            if (error) {
                console.error(error)
            }
        })
    })
})

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})
