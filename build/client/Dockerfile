FROM node
COPY . .
RUN npm i
RUN npm i -g vue
RUN npm i -g @vue/cli-service
CMD ["npm", "run", "build"]
CMD ["npm", "run", "serve"]