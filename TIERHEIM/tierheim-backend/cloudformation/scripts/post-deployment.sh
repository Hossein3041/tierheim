#!/bin/bash
# Please edit variables in the config.yaml.
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
CONFIG_FILE="$SCRIPT_DIR/../../scripts/config.yaml"

# Nutzereingaben
ENVIRONMENT="$1"

# Config laden
PARAMETERS_CONFIG_DIR="$SCRIPT_DIR/.."
PARAMETERS_CONFIG_FILENAME="config.yaml"
PARAMETERS_CONFIG_FILE="$PARAMETERS_CONFIG_DIR/$PARAMETERS_CONFIG_FILENAME"

# Config laden
APP_NAME=$(yq -e '.AppName' "$PARAMETERS_CONFIG_FILE")
PROJECT_NAME=$(yq -e '.ProjectName' "$PARAMETERS_CONFIG_FILE")
PROFILE_NAME=$(yq -e '.ProfileName' "$PARAMETERS_CONFIG_FILE")
DOMAIN_NAME=$(yq -e '.DomainName' "$PARAMETERS_CONFIG_FILE")

LOG="$SCRIPT_DIR/../../scripts/deploy_log.txt"

echo "Deploying..."

REST_API_ID=$(aws apigateway get-rest-apis --no-cli-pager --output json --profile "$PROFILE_NAME" | jq -e --raw-output ".items[] | select(.name == \"$ENVIRONMENT-$PROJECT_NAME-root\") | .id" 2>"$LOG")
if [ -z "$REST_API_ID" ]; then
  echo "Rest API not found!"
  exit 1
fi

if ! aws apigateway get-stage --rest-api-id "$REST_API_ID" --stage-name "$ENVIRONMENT" --no-cli-pager --output json --profile "$PROFILE_NAME" >> "$LOG" 2>&1; then
  DEPLOYMENT_ID=$(aws apigateway create-deployment --rest-api-id "$REST_API_ID" --output text --query "id" --profile "$PROFILE_NAME" 2>"$LOG")
  aws apigateway create-stage --rest-api-id "$REST_API_ID" --stage-name "$ENVIRONMENT" --deployment-id "$DEPLOYMENT_ID" --profile "$PROFILE_NAME" >> "$LOG" 2>&1
else
  aws apigateway create-deployment --rest-api-id "$REST_API_ID" --stage-name "$ENVIRONMENT" --profile "$PROFILE_NAME" >> "$LOG" 2>&1
fi

BASE_PATH_MAPPING=$(aws apigateway get-base-path-mappings --domain-name "$ENVIRONMENT.$DOMAIN_NAME" --no-cli-pager --output json --profile "$PROFILE_NAME" | jq -e --raw-output ".items[] | select(.basePath == \"$PROJECT_NAME\")" 2>&1)
if [ -z "$BASE_PATH_MAPPING" ]; then
  aws apigateway create-base-path-mapping --rest-api-id "$REST_API_ID" --stage "$ENVIRONMENT" --domain-name "$ENVIRONMENT.$DOMAIN_NAME" --base-path "$PROJECT_NAME" --profile "$PROFILE_NAME" >> "$LOG" 2>&1
fi