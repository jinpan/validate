FROM node:20

RUN yarn global add dotenv-cli

WORKDIR /validate/src/next
CMD /validate/devops/local/start_next.sh
