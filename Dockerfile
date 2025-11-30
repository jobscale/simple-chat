FROM node:lts-trixie-slim
WORKDIR /root
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends netcat-openbsd \
 && apt-get clean && rm -fr /var/lib/apt/lists/*
COPY --chown=node:staff package.json .
RUN npm i --omit=dev
COPY --chown=node:staff . .
EXPOSE $PORT
CMD ["./start.sh"]
