const express = require('express')
const app = express()
const port = 3000

// MQTT

const mqtt = require('mqtt')
const mqttClient = mqtt.connect('ws://localhost:9001/mqtt')

app.get('/',  (req, res) => {
    res.send('Hello World!')
    console.log('Connected !')
})

app.use(express.json());

app.post('/send_message', (req, res) => {
    try {
        mqttClient.publish(req.body.topic, req.body.message)
        res.send('Message : ' + req.body.message + ' - Topic : ' + req.body.topic)
    } catch (e) {
        res.send('Not Working')
    }
})

app.listen(port, () => {
    console.log(`Example app : port ${port}`)
})