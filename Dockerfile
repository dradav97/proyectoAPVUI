FROM node:14

COPY [".", "/usr/src/"]

workdir /usr/src


RUN npm install

EXPOSE 3000

CMD ["npx","nodemon", "./api/index.js"]