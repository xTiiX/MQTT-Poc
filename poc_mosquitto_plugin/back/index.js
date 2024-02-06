const express = require('express')
const app = express()
const port = 8181

app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.post('/getuser', (req, res) => {
	console.log('Get User')
	console.log(req.body)

	// Check user
	if (req.body.username !== "test") {
		res.send('Not a good user').status(400)
	}

	res.send('Fake GetUser Valid')
})

app.post('/aclcheck', (req, res) => {
	console.log('ACL Check')
	console.log(req.body)

	// Check user
	if (req.body.username !== "test") {
		res.send('Not a good user').status(400)
	}

	res.send('Fake ACL Valid')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})