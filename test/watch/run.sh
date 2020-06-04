#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

pid=0
log=./log.txt
exitCode=0

clean() {
  rm -rf src/*
  rm -rf dist/*
}

copy_base() {
  cp -r fixtures/base/* src
}

start_watch() {
  path=src/$1
  options=$2

  node ../../cli.js watch $path $options > $log 2>&1 &
  pid=$!
}

end_watch() {
  kill $pid
  pid=0
}

run_test() {
  name=$1
  pathToWatch=$2

  clean
  copy_base
  start_watch $pathToWatch
  sleep 3
  node -e "require('./expectations/$name').before()"
  [[ $? != 0 ]] && exitCode=1
  sh ./steps/$name.sh
  sleep 2
  node -e "require('./expectations/$name').after()"
  [[ $? != 0 ]] && exitCode=1
  end_watch
  diff $log expectations/$name.log
  [[ $? != 0 ]] && exitCode=1
}

run_test change-font sassy/partials
run_test do-not-build-partial sassy/partials
run_test add-new-element sassy/partials

exit $exitCode
