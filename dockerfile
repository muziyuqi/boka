FROM nginx:1.17.0-alpine

ADD ./nginx.conf /etc/nginx/nginx.conf
ADD ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
