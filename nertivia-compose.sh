#!/bin/bash

# Functions

commands() {
 echo "start - Starts the instance"
 echo "build - Builds your own instance"
 echo "update - Updates the instance"
 echo "ups - Updates then starts the instance"
}

start() {
 echo "Starting nertivia instance..."
 docker-compose up
}

build() {
 # Build nertivia/server
 echo "Building nertivia/server"
 docker build -t nertivia/server build/server

 # Build nertivia/client
 echo "Building nertivia/client"
 docker build -t nertivia/client build/client

 # Start all containers
 start
}

update() {
 # Update server
 echo "Updating server..."
 docker-compose pull server

 # Update client
 echo "Updating client..."
 docker-compose pull client
}

ups() {
  # Update the instance
  update

 # Start the instance
 start
}

if [ "$1" == "" ]; then
 commands
 exit
fi

if [ "$1" == "start" ]; then
 start
 exit
fi

if [ "$1" == "build" ]; then
 build
 exit
fi

if [ "$1" == "update" ]; then
 update
 exit
fi

if [ "$1" == "ups" ]; then
  ups
  exit
fi