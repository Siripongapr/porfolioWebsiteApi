#!/bin/bash

rsync -avz --exclude=node_modules ./ portFolio:/root/portfolioAPI

ssh portFolio << E0F

cd portfolioAPI

docker build -t portfolio_api .

docker compose down

docker compose up -d 

E0F


