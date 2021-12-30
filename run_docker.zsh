#Open Docker, only if is not running
if (! docker stats --no-stream ); then
  # On Mac OS this would be the terminal command to launch Docker
  open /Applications/Docker.app
 #Wait until Docker daemon is running and has completed initialisation
while (! docker stats --no-stream ); do
  # Docker takes a few seconds to initialize
  echo "Waiting for Docker to launch..."
  sleep 1
done
fi

existed=$(docker images -q redis)

if [[ -n "$existed" ]]; then
    echo "Docker image existed, running container ..."
else
    echo "Pulling Redis image ..."
    docker pull redis
fi

if [ ! "$(docker ps -q -f name=CryptoBot)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=CryptoBot)" ]; then
        # cleanup
        docker rm CryptoBot
    fi
    # run your container
    docker run -d --name CryptoBot -p 127.0.0.1:6379:6379 redis
fi

cd bot
npm start