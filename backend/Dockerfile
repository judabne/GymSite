FROM node:12

WORKDIR /backend

COPY package.json /backend/
RUN npm install
COPY . /backend/

ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]