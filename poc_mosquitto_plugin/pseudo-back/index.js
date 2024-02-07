const express = require('express')
const app = express()
const port = 8181
app.use(express.json());

// MQTT
const mqtt = require('mqtt')
const host = 'localhost'
const portMQTT = 9001
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `ws://${host}:${portMQTT}`

const mqttClient = mqtt.connect(connectUrl, {
	clientId,
	username: "admin",
	password: "admin",
	clean: true,
	connectTimeout: 4000,
	reconnectPeriod: 1000,
})

app.use(express.urlencoded({ extended: true })); // support encoded bodies

mqttClient.on('connect', () => {
	console.log('Connected to MQTT')
})

app.post('/getuser', (req, res) => {
	console.log('Get User Check')
	console.log(req.body)

	// Check user
	if ((req.body.username !== "test" || req.body.password !== "test") && (req.body.username !== "admin" || req.body.password !== "admin")) {
		console.log('Get User Not Valid')
		res.status(400)
	} else {
		console.log('Get User Valid')
		res.send('Fake GetUser Valid')
	}
})

app.post('/aclcheck', (req, res) => {
	console.log('ACL Check')
	console.log(req.body)

	// Check user
	if (req.body.username !== "test" && req.body.username !== "admin") {
		res.status(400)
	}

	res.send('Fake ACL Valid')
})

// Publish to a topic
app.post('/pub', (req, res) => {
	try {
		// let test = mqttClient.publish(req.body.topic, req.body.message)
		// console.log(test)
		mqttClient.publish(req.body.topic, req.body.message)
		res.send('Published Message : "' + req.body.message + '" on Topic "' + req.body.topic + '"')
	} catch (e) {
		res.send('Not Working : ' + e)
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})