FROM node
COPY . .
RUN apt update && apt install -y \
imagemagick-6.q16 webp
RUN mkdir dist dist/public dist/public/avatars dist/public/temp
RUN npm i
RUN npm i -g typescript
CMD ["npm", "run", "compile"]