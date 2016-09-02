#!/usr/bin/env bash
apt-get update # Update apt-get
apt-get -y install curl # Install Curl
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - # Download NodeJS 4.x
apt-get -y install git
apt-get -y install nodejs # Install NodeJS
apt-get -y install npm # Install NPM
