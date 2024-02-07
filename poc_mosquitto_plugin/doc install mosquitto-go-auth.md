# PoC mosquitto avec authorizer

## Schéma Fonctionnel

![Schéma Fonctionnel][schema_authz]

[schema_authz]: ./schema_authz.png "Schéma Fonctionnel"

1. Call WS (connect, sub, pub) et reception de Mosquitto
2. Call HTTP vers l'app d'authorisation avec les informations permettant l'authorisation
3. Callback vers Mosquitto avec un status 200 (Authorized) ou 400 (Unauthorized)
4. Reception au back du résultat de l'action (succes ou non du connect, sub ou pub)
5. En cas de reception de pub, Call WebSocket pour transferer les infos au front (6.)

## Install mosquitto-go-auth

1. sudo apt install perl-doc bsdutils gcc g++ git make dialog libc-ares-dev libcurl4-openssl-dev libwebsockets-dev uuid uuid-dev
2. sudo apt update
3. sudo groupadd mosquitto puis sudo useradd -s /sbin/nologin mosquitto -g mosquitto -d /var/lib/mosquitto
4. wget https://mosquitto.org/files/source/mosquitto-X.X.X.tar.gz (Actuellement 2.0.9)
5. tar xvfz mosquitto-X.X.X.tar.gz
6. cd mosquitto-X.X.X
7. nano config.mk -> Verifier que SERV=no ET websocket support activé
8. make mosquitto
9. cd
10. https://www.openssl.org/source/ et WGET la tar + SHA256 Sign
11. sha256sum puis tar xfvz
12. cd openssl-X.X.X
13. ./config --prefix=/usr/local/openssl --openssldir=/usr/local/openssl
14. make
15. sudo make install
16. cd
17. git clone https://github.com/iegomez/mosquitto-go-auth.git
18. https://go.dev/dl/ et install une version (1.18 MINIMUM) 
19. sudo mkdir -p /var/log/mosquitto/ /var/lib/mosquitto/
20. sudo chown -R mosquitto:mosquitto /var/log/mosquitto/
21. sudo chown -R mosquitto:mosquitto /var/lib/mosquitto/
22. cd mosquitto-go-auth
23. make -> go-auth.so est build si tout a fonctionné
24. Suite de la configuration sur le [repo Git](https://github.com/iegomez/mosquitto-go-auth/tree/master?tab=readme-ov-file#configuration)
25. cd /etc/mosquitto
26. mosquitto -c mosquitto.conf

Vidéo pouvant aider jusqu'à l'étape 17 : https://www.youtube.com/watch?v=YGOBKE2xbEE

Enjoy