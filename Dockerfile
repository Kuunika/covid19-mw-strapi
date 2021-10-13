FROM node:14 as building
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:14-alpine
WORKDIR /usr/src/app
COPY --from=building /usr/src/app/package*.json .
RUN npm install --only=prod
COPY --from=building /usr/src/app/api/ api/
COPY --from=building /usr/src/app/build/ build/
COPY --from=building /usr/src/app/config/ config/
COPY --from=building /usr/src/app/extensions/ extensions/
COPY --from=building /usr/src/app/public/ public/
COPY --from=building /usr/src/app/favicon.ico ./
RUN mkdir .tmp
EXPOSE 1337
CMD ["npm", "start"]