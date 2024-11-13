FROM node:22-alpine

WORKDIR /

COPY . .

RUN npm install
RUN npm install -g typescript
RUN tsc

CMD ["node", "."]