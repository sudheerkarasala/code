FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm","start"]
