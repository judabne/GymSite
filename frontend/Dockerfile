FROM node:12

WORKDIR /frontend

COPY package.json /frontend/
RUN npm install
COPY . /frontend/

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]