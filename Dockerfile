FROM jobscale/node:bionic
SHELL ["bash", "-c"]

WORKDIR /root
COPY . .

RUN apt install -y netcat
RUN git clone https://github.com/jobscale/simple-chat.git && . .nvm/nvm.sh && npm i

EXPOSE $PORT
CMD ["./daemon"]
