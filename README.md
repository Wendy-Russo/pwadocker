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

Third package leaflet is used to display a map and interact with it.
native function navigator.geolocation is used to get the user's position.
The position is saved in the local storage and displayed on the map using a leaflet marker.


Voice recorder : 
1. Allow your browser to use the microphone
2. Allow the website to use your microphone
3. Press anywhere in the timer section to enable recording
4. Say 'commence','start','demarre','continue' or 'reprends' to start the timer and 'stop','tape','arete','pause'to stop it.
***Some spartphones might automatically disable the microphone***

Notification system : 
When the user click on the bell icon, he can allow notifications and then will receive push notification for encourage him to stay hydrated and active.
