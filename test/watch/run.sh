#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

pid=0
log=./log.txt
testName=""

clean() {
  rm -rf src/*
  rm -rf dist/*
}

copy_base() {
  cp -r fixtures/base/* src
}

start_watch() {
  testName=$1
  path=src/$2
  options=$3

  node ../../cli.js watch $path $options > $log 2>&1 &
  pid=$!
}

end_watch() {
  kill $pid
  pid=0
}

run_test() {
  name=$1
  watchMe=$2

  clean
  copy_base
  start_watch $name $watchMe
  sleep 2
  node -e "require('./expectations/$name').before()"
  ./steps/$name.sh
  sleep 2
  node -e "require('./expectations/$name').after()"
  end_watch
  diff $log expectations/$name.log
}

run_test change-font sassy/partials
