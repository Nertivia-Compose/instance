FROM node:lts-alpine
COPY . .
RUN apk add --no-cache \
imagemagick libwebp
RUN mkdir dist dist/public dist/public/avatars dist/public/temp
RUN npm i
RUN npm i -g typescript
CMD ["npm", "run", "compile"]