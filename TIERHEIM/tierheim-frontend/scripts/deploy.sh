#!/bin/bash
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

cd "$SCRIPT_DIR" || exit

# Nutzereingaben
ENVIRONMENT="$1"
ACCESS_KEY="$2"
SECRET_KEY="$3"

# Configuration
APP_NAME="backend"
PROJECT_NAME="tierheim"
PROFILE_NAME="sideklick"

LOG="$SCRIPT_DIR/deploy_log.txt"

if [[ "$ENVIRONMENT" = "" ]] || [[ "$ENVIRONMENT" = "BRANCH" ]]; then
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
  BRANCH_NAME_ACTION=$GITHUB_HEAD_REF
  COMMIT_HASH=$(git rev-parse --short=8 HEAD)

  if [[ "$BRANCH_NAME" == "$DEV" ]] || [[ "$BRANCH_NAME" == "$STAGE" ]] || [[ "$BRANCH_NAME" == "$PROD" ]]; then
    ENVIRONMENT="$BRANCH_NAME"
  elif [[ $BRANCH_NAME =~ ^([A-Z]+-[0-9]+)-[a-zA-Z0-9-]+$ ]]; then
    ENVIRONMENT=${BASH_REMATCH[1]}
  elif [[ $BRANCH_NAME_ACTION =~ ^([A-Z]+-[0-9]+)-[a-zA-Z0-9-]+$ ]]; then
    ENVIRONMENT=${BASH_REMATCH[1]}
  else
    ENVIRONMENT=$COMMIT_HASH
  fi
fi
ENVIRONMENT=$(echo "$ENVIRONMENT" | awk '{print tolower($0)}')

if [[ $ACCESS_KEY != "" ]] && [[ $SECRET_KEY != "" ]]; then
  echo "CONSOLE MODE"
  # AWS-CLI konfigurieren.
  aws configure set aws_access_key_id $ACCESS_KEY --profile "$PROFILE_NAME" >>$LOG 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to configure AWS access_key!"
    exit 1
  fi
  aws configure set aws_secret_access_key $SECRET_KEY --profile "$PROFILE_NAME" >>$LOG 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to configure AWS secret_key!"
    exit 1
  fi
  aws configure set region eu-central-1 --profile "$PROFILE_NAME" >>$LOG 2>&1
  if [[ $? -ne 0 ]]; then
    echo "Failed to configure AWS region!"
    exit 1
  fi
fi

echo "Deploying..."

OUTPUT=$(aws s3 ls "s3://$ENVIRONMENT-$PROJECT_NAME-$APP_NAME" --profile "$PROFILE_NAME")
if [ -n "$OUTPUT" ]; then
  aws s3 rm "s3://$ENVIRONMENT-$PROJECT_NAME-$APP_NAME" --recursive --profile "$PROFILE_NAME" >>"$LOG" 2>&1
fi

OUTPUT=$(ls "../out/" 2>"$LOG")
if [ -z "$OUTPUT" ]; then
  echo "Did not find ../out/!"
  echo "Consider using make.sh to build App!"
  exit 1
fi
aws s3 cp "../out/" "s3://$ENVIRONMENT-$PROJECT_NAME-$APP_NAME" --recursive --profile "$PROFILE_NAME" >>"$LOG" 2>&1
