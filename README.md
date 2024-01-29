Installation

1. serv-mqtt -> docker-compose.yaml / `docker compose -up -d`
2. serv-ws -> `node index`
3. poc-full-back -> `node index`
4. calls to back
	1. localhost:3000/sub with { topic": "/onebus" }
	2. localhost:3000/pub with { "topic": "/onebus", "message": "Hello World !" }

-> Answer on WebSocket if everything is working !