# Classy

Delivers updates for ucb classes.

## Setup

    $ cp app/email_auth.json{.sample,}

    Replace gmail username and password with your own in this file.

## Run

    $ docker-compose up -d

## Test

    $ npm install -g mocha
    $ mocha .

## Deploy

    $ rsync --exclude '.git' --exclude 'node_modules' -avz "./" "neilsarkar@104.236.42.174":/home/neilsarkar/app/
