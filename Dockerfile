FROM node:latest

USER root
RUN mkdir -p /opt/serene
WORKDIR /opt/serene/

# install deps
ADD package.json /opt/serene/
ADD .npmrc /opt/serene/
RUN npm install

# add the rest of our app
ADD . /opt/serene/

# Execute
RUN chown -R nobody:nobody /opt/data-www
USER nobody

# Build production version
ENV NODE_ENV=production

CMD node app.js

EXPOSE 3000
