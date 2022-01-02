FROM node:16

WORKDIR /use/src/app

COPY . .

RUN npm install
RUN npm install -g typescript
RUN tsc

CMD ["node", "."]