FROM nginx:alpine
COPY ./www /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
