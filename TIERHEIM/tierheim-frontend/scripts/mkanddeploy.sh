#!/bin/bash

ENVIRONMENT=$1

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

cd "$SCRIPT_DIR"

bash make.sh
if [ "$?" -ne "0" ]; then
  echo "make.sh failed!"
  exit 1
fi

bash deploy.sh "$ENVIRONMENT"
