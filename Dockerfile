FROM nginx:alpine
COPY ./www /usr/share/nginx/html/beta
COPY ./default.conf /etc/nginx/conf.d/default.conf
