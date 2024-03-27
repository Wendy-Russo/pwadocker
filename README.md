1 - crééer l'image : 
docker build -t pwaimage:1 -f Dockerfile.dev .

2 - run l'image pour créer le container
docker run -d -p 3000:3000 -v /app/node_modules -v $(pwd):/app --name pwacontainer pwaimage:1