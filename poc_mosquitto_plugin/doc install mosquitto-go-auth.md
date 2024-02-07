# PoC mosquitto avec authorizer

## Schéma Fonctionnel

![Schéma Fonctionnel][schema_authz]

[schema_authz]: ./schema_authz.png "Schéma Fonctionnel"

1. Call WS (connect, sub, pub) et reception de Mosquitto
2. Call HTTP vers l'app d'authorisation avec les informations permettant l'authorisation
3. Callback vers Mosquitto avec un status 200 (Authorized) ou 400 (Unauthorized)
4. Reception au back du résultat de l'action (succes ou non du connect, sub ou pub)
5. En cas de reception de pub, Call WebSocket pour transferer les infos au front (6.)

Pour faire des tests, lancer le docker avec un `docker compose up` puis :
- `curl --location 'localhost:3000/sub' --header 'Content-Type: application/json' --data '{"topic": "/onebus"}'`
- `curl --location 'localhost:8181/pub' --header 'Content-Type: application/json' --data '{"topic": "/onebus", "message":"This is a test"}'`
