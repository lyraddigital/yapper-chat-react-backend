FROM node:12.18.0-buster

ENV NODE_ENV production

WORKDIR /opt/yapper-chat/
COPY package.json .
RUN npm install --no-audit --no-optional
RUN rm package.json

COPY dist/**.js ./

EXPOSE 3000
ENTRYPOINT ["node", "main.js"]