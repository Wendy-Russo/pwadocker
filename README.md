## Prerequisites 

1 Use project with Docker :
- build image : 
docker build -t pwaimage:1 -f Dockerfile.dev .
- run image to create the container
docker run -d -p 3000:3000 -v /app/node_modules -v $(pwd):/app --name pwacontainer pwaimage:1 on Linux
docker run -d -p 3000:3000 -v /app/node_modules -v %cd%:/app --name pwacontainer pwaimage:1 on Windows

2. Install dependencies :
npm install

## Project description

The application provide the user with a dashboard intuitive and interactive, offering an overview of your physical activity daily. The application will use geolocation to record the
route during jogging or walking sessions, thus allowing the user to track their progress in terms of distance and speed. Moreover, the application will include a customizable notification system for
encourage the user to stay hydrated and active.

## Features

Geolocation : 

Voice recorder : 

Notification system : 
When the user click on the bell icon, he can allow notifications and then will receive push notification for encourage him to stay hydrated and active.
