#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR

pid=0
log=./log.txt
exitCode=0

clean() {
  rm -rf src/*
  rm -rf dist/*
  rm -f $log
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
  kill -s INT $pid
  pid=0
}

run_test() {
  name=$1
  pathToWatch=$2

  echo "Running $name"

  echo "clean..."
  clean
  echo "copy base..."
  copy_base
  echo "start watch $pathToWatch"
  start_watch $pathToWatch
  sleep 2
  echo "before expectations"
  node -e "require('./expectations/$name').before()"
  if [[ $? == 0 ]]
  then
    echo "step"
    sh ./steps/$name.sh
    sleep 2
    echo "after expectations"
    node -e "require('./expectations/$name').after()"
    [[ $? != 0 ]] && exitCode=1
    end_watch
    echo "diff"
    diff $log expectations/$name.log
    [[ $? != 0 ]] && exitCode=1
  else
    echo "Failed at before assertion" >&2
    exitCode=1
    end_watch
  fi
}

trap 'end_watch' INT

run_test change-colors sassy/partials
run_test change-font sassy/partials
run_test do-not-build-partial sassy/partials
run_test add-new-element sassy/partials
run_test css-import sassy/partials

exit $exitCode
