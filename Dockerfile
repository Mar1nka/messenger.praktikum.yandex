FROM node:13 as build

ARG PORT

RUN echo $PORT

WORKDIR /app

COPY . /app

RUN npm install --quiet
RUN npm run build-webpack

FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

EXPOSE 3002
