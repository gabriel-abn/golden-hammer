FROM node:18-alpine

WORKDIR /usr/app

COPY ./ .

VOLUME [ "./:/usr/app" ]

RUN yarn

CMD [ "yarn", "start" ]