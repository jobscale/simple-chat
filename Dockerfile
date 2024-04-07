FROM node:lts-bookworm-slim
WORKDIR /root
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y netcat-openbsd
COPY --chown=node:staff package.json .
RUN npm i --omit=dev
COPY --chown=node:staff . .
RUN rm -fr /var/lib/apt/lists/*
EXPOSE $PORT
CMD ["./start.sh"]
