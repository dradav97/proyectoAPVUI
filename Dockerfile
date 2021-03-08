FROM node:14

COPY [".", "/usr/src/"]

workdir /usr/src


RUN npm install

EXPOSE 300

CMD ["node", "./api/index.js"]