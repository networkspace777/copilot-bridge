FROM node:18
COPY . /app
WORKDIR /app
RUN npm install --production
EXPOSE 8080
CMD ["node", "server.js"]
