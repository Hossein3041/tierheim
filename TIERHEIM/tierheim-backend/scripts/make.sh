#!/bin/bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
LOG="$SCRIPT_DIR/make_log.txt"

cd "$SCRIPT_DIR"
cd ../
echo "Log make.sh $(date -Iseconds):" >"$LOG"

# java installieren falls noch nicht vorhanden.
if ! command -v java >/dev/null 2>&1; then
  echo "Java is not installed!"
  echo "Consider run install.sh to setup and install all dependencies!"
  exit 1
fi

cd "$SCRIPT_DIR"
cd ../

echo "Remove old App..."

./mvnw clean >>"$LOG" 2>&1
if [ "$?" -ne "0" ]; then
  echo "Failed to clean project!"
  exit 1
fi

echo "Build new App..."
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  ./mvnw package -Dpackaging=docker-native -DbuildArgs="-march=x86-64-v2 -H:+AddAllCharsets" -Dmicronaut.runtime=lambda -DDB_ENABLED=false -Pgraalvm >>$LOG 2>&1
  if [ "$?" -ne "0" ]; then
    echo "Failed to build project!"
    exit 1
  fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
  ./mvnw package -Dpackaging=docker-native -Dmicronaut.runtime=lambda -Pgraalvm >>$LOG 2>&1
  if [ "$?" -ne "0" ]; then
    echo "Failed to build project!"
    exit 1
  fi
fi
