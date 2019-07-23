#!/bin/bash

. configure
export DB_HOST=mongo
export DB_PORT=27017

check() {
  nc $DB_HOST $DB_PORT -w 1 < /dev/null
  if [ $? -eq 0 ]
  then
    echo -e "\nOK!"
    return 0
  fi
  return 1
}

waiter() {
  while true
  do
    check
    if [ $? -eq 0 ]
    then
      break
    fi
    sleep 60
  done
}
waiter

npm start
