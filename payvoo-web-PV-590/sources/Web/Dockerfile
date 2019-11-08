FROM httpd:alpine
COPY ./httpd.conf /usr/local/apache2/conf/
COPY ./httpd-vhosts.conf /usr/local/apache2/conf/extra/
RUN rm -r /usr/local/apache2/htdocs/*
COPY ./dist/PayVoo /usr/local/apache2/htdocs/
CMD apachectl -D FOREGROUND