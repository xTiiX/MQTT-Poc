const express = require('express')
const app = express()
const portExpress = 3000
app.use(express.json());

// MQTT
const mqtt = require('mqtt')
const host = 'localhost'
const portMQTT = 9001
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `ws://${host}:${portMQTT}`

// WS
const WebSocket = require('ws')
const ws = new WebSocket('ws://localhost:8082')

const mqttClient = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
})

mqttClient.on('connect', () => {
    console.log('Connected to MQTT')
})

// Publish to a topic
app.post('/pub', (req, res) => {
    try {
        console
        mqttClient.publish(req.body.topic, req.body.message)
        res.send('Published Message : "' + req.body.message + '" on Topic "' + req.body.topic + '"')
    } catch (e) {
        res.send('Not Working : ' + e)
    }
})

// Subscribe to a new Topic
app.post('/sub', (req, res) => {
    try {
        mqttClient.subscribe(req.body.topic)
        res.send('Subscribed to "' + req.body.topic + '" Topic')
    } catch (e) {
        res.send('Not Working : ' + e)
    }
})

// Send Received Pub to Front - WebService
mqttClient.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
    ws.send(payload.toString())
})

app.listen(portExpress, () => {
    console.log(`Example app : port ${portExpress}`)
})