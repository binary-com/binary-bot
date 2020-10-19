FROM nginx:alpine

# install required packages
RUN apk add --no-cache git
RUN apk add --update nodejs npm

# Copy the contents and build 
RUN mkdir /tmp/source
COPY ./ /tmp/source
WORKDIR /tmp/source
RUN npm install
RUN node_modules/gulp/bin/gulp.js build-min

RUN cp -r /tmp/source/www /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
