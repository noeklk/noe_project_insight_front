# noe_project_insight_front
> Project insight - nodeJS AW EISI 21.1 front

## Description

This APP allow :
  + students to rate their teacher's modules 
  + administrators to create, read, update and delete sessions or modules or  users. They can see the average sessions scores too.

# Instructions
  1. You can either clone the project or download the latest relase here : `https://github.com/noeklk/noe_project_insight_front/releases`
  2. Install docker & docker-compose
  2. Position yourself at the root of the project `cd noe_project_insight_front`
  3. `docker-compose up` (for logs) or with `-d` option in detached mode

## Base URL to application

    localhost:4200
    OR
    127.0.0.1:4200

## Access to the node container to add dependencies

    docker exec -ti project_angular bash
    npm install 'DEPENDENCY'
    ./node_modules/.bin/ng generate component test < Adds a test component
    ./node_modules/.bin/ng lint --fix=true < Lint the whole code according to the tslint.json configuration


## API consumed by this application
    https://github.com/noeklk/noe_project_insight_back
