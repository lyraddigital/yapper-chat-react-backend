FROM node:12.18.0-buster

COPY package.json /opt/yapper-chat/
COPY dist/**.js /opt/yapper-chat/

WORKDIR /opt/yapper-chat/
CMD npm install
ENTRYPOINT ["node", "main.js"]