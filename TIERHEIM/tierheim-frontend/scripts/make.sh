#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
LOG="$SCRIPT_DIR/make_log.txt"

cd "$SCRIPT_DIR"
cd ../
echo "Log make.sh $(date -Iseconds):" > "$LOG"

cd "$SCRIPT_DIR"
cd ../

echo "Remove old App..."

rm -rf "$SCRIPT_DIR/../out" >> "$LOG" 2>&1
if [ "$?" -ne "0" ]; then
  echo "Failed to clean project!"
  exit 1
fi

echo "Build new App..."

npm install >> $LOG 2>&1
if [ "$?" -ne "0" ]; then
  echo "Failed to install dependencies!"
  exit 1
fi

npm run build >> $LOG 2>&1
if [ "$?" -ne "0" ]; then
  echo "Failed to build project!"
  exit 1
fi