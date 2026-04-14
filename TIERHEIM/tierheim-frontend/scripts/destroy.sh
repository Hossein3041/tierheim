#!/bin/bash
# Please edit variables in the config.yaml.
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

# Nutzereingaben
ENVIRONMENT="$1"
ACCESS_KEY="$2"
SECRET_KEY="$3"

DEV="dev"
STAGE="stage"
PROD="prod"

# Configuration
APP_NAME="backend"
PROJECT_NAME="tierheim"
PROFILE_NAME="sideklick"

# Prüfen, ob ENVIRONMENT eine gültige Eingabe hat.
if [[ "$ENVIRONMENT" = "" ]] || [[ "$ENVIRONMENT" = "BRANCH" ]]; then
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
  BRANCH_NAME_ACTION=$GITHUB_HEAD_REF
  COMMIT_HASH=$(git rev-parse --short=8 HEAD)

  if [[ "$BRANCH_NAME_ACTION" = "" ]]; then
    if [[ "$BRANCH_NAME" == "$DEV" ]] || [[ "$BRANCH_NAME" == "$STAGE" ]] || [[ "$BRANCH_NAME" == "$PROD" ]]; then
      ENVIRONMENT=$BRANCH_NAME
    elif [[ $BRANCH_NAME =~ ^([A-Z]+-[0-9]+)-[a-zA-Z0-9-]+$ ]]; then
      ENVIRONMENT=${BASH_REMATCH[1]}
    fi
  elif [[ $BRANCH_NAME_ACTION =~ ^([A-Z]+-[0-9]+)-[a-zA-Z0-9-]+$ ]]; then
    ENVIRONMENT=${BASH_REMATCH[1]}
  else
    ENVIRONMENT=$COMMIT_HASH
  fi

  echo "The ENVIRONMENT is: $ENVIRONMENT"
  echo "The BRANCH_NAME is: $BRANCH_NAME"
  echo "The BRANCH_NAME_ACTION is: $BRANCH_NAME_ACTION"
  echo "The COMMIT_HASH is: $COMMIT_HASH"
fi
ENVIRONMENT=$(echo "$ENVIRONMENT" | awk '{print tolower($0)}')

# Zusammengebaute Variablen
LOG="$SCRIPT_DIR/destroy_log.txt"
STACK_NAME="$PROJECT_NAME-$APP_NAME-$ENVIRONMENT"

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

cd $SCRIPT_DIR

echo "Log destroy.sh $(date -Iseconds):" >$LOG

echo "Destroy infrastructure of \"$PROJECT_NAME\" \"$APP_NAME\" \"$ENVIRONMENT\" using AWS-Profile \"$PROFILE_NAME\"!"

# Check if aws-cli is installed
if ! command -v aws >/dev/null 2>&1; then
  echo "AWS-CLI is not installed!"
  echo "Consider run install.sh to setup and install all dependencies!"
  exit 1
fi

# Check if aws-profile does exists
if ! aws configure list-profiles | grep -q "^$PROFILE_NAME$"; then
  echo "Profile $PROFILE_NAME does not exists!"
  echo "Consider run install.sh to setup and install all dependencies!"
  exit 1
fi

# CloudFormation Stack löschen
aws cloudformation delete-stack --stack-name "$STACK_NAME" --profile "$PROFILE_NAME" >>"$LOG" 2>&1
aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" --profile "$PROFILE_NAME" >>"$LOG" 2>&1
