#!/bin/bash
# Please edit variables in the config.yaml.
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
CONFIG_FILE="$SCRIPT_DIR/../scripts/config.yaml"

# Nutzereingaben
ENVIRONMENT="$1"
ACCESS_KEY="$2"
SECRET_KEY="$3"

# check if yq is installed
if ! command -v yq >/dev/null 2>&1; then
  echo "yq is not installed!"
  echo "Consider run install.sh to setup and install all dependencies!"
  exit 1
fi

PARAMETERS_CONFIG_DIR="$SCRIPT_DIR/../cloudformation"
PARAMETERS_CONFIG_FILENAME="config.yaml"
PARAMETERS_CONFIG_FILE="$PARAMETERS_CONFIG_DIR/$PARAMETERS_CONFIG_FILENAME"
DEV="dev"
STAGE="stage"
PROD="prod"

# Config laden
APP_NAME=$(yq -e '.AppName' "$PARAMETERS_CONFIG_FILE")
PROJECT_NAME=$(yq -e '.ProjectName' "$PARAMETERS_CONFIG_FILE")
PROFILE_NAME=$(yq -e '.ProfileName' "$PARAMETERS_CONFIG_FILE")
TMP_RESOURCES_FILE=$(yq -e '.TmpResourcesFile' "$CONFIG_FILE")
TMP_PARAMETERS_CONFIG_FILE=$(yq -e '.TmpParametersConfigFile' "$CONFIG_FILE")
TMP_PARAMETERS_FILE=$(yq -e '.TmpParametersFile' "$CONFIG_FILE")
TMP_CONDITIONS_FILE=$(yq -e '.TmpConditionsFile' "$CONFIG_FILE")
TMP_MAPPINGS_FILE=$(yq -e '.TmpMappingsFile' "$CONFIG_FILE")
TMP_OUTPUTS_FILE=$(yq -e '.TmpOutputsFile' "$CONFIG_FILE")
TMP_JSON_PARAMETERS_CONFIG_FILE=$(yq -e '.TmpJsonParametersFile' "$CONFIG_FILE")
TMP_DEPLOYMENT_FILE=$(yq -e '.TmpDeploymentFile' "$CONFIG_FILE")

# Prüfen, ob ENVIRONMENT eine gültige Eingabe hat.
if [[ "$ENVIRONMENT" = "" ]] || [[ "$ENVIRONMENT" = "BRANCH" ]]; then
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
  BRANCH_NAME_ACTION=$GITHUB_HEAD_REF
  COMMIT_HASH=$(git rev-parse --short=8 HEAD)

  if [[ "$BRANCH_NAME" == "$DEV" ]] || [[ "$BRANCH_NAME" == "$STAGE" ]] || [[ "$BRANCH_NAME" == "$PROD" ]]; then
    ENVIRONMENT="$BRANCH_NAME"
  elif [[ "$BRANCH_NAME_ACTION" == "$DEV" ]] || [[ "$BRANCH_NAME_ACTION" == "$STAGE" ]] || [[ "$BRANCH_NAME_ACTION" == "$PROD" ]]; then
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

# Zusammengebaute Variablen
LOG="$SCRIPT_DIR/deploy_log.txt"
RESOURCES_DIR="$SCRIPT_DIR/../cloudformation/infrastructure/resources"
PARAMETERS_DIR="$SCRIPT_DIR/../cloudformation/infrastructure/parameters"
CONDITIONS_DIR="$SCRIPT_DIR/../cloudformation/infrastructure/conditions"
MAPPINGS_DIR="$SCRIPT_DIR/../cloudformation/infrastructure/mappings"
OUTPUTS_DIR="$SCRIPT_DIR/../cloudformation/infrastructure/outputs"
CODES_DIR="$SCRIPT_DIR/../cloudformation/infrastructure/codes"
STACK_NAME="$PROJECT_NAME-$APP_NAME-$ENVIRONMENT"
PRE_DEPLOYMENT_SCRIPT_PATH="$SCRIPT_DIR/../cloudformation/scripts/pre-deployment.sh"
POST_DEPLOYMENT_SCRIPT_PATH="$SCRIPT_DIR/../cloudformation/scripts/post-deployment.sh"
IS_TMP_PARAMETERS_CONFIG_FILE=0

PARAMETERS_CONFIG_ENVIRONMENT_FILENAME="config_${ENVIRONMENT}.yaml"
PARAMETERS_CONFIG_ENVIRONMENT_FILE="$PARAMETERS_CONFIG_DIR/$PARAMETERS_CONFIG_ENVIRONMENT_FILENAME"

if [[ ! -f $PARAMETERS_CONFIG_ENVIRONMENT_FILE ]]; then
  PARAMETERS_CONFIG_ENVIRONMENT_FILENAME="config.yaml"
  PARAMETERS_CONFIG_ENVIRONMENT_FILE="/tmp/cloudformation_$PARAMETERS_CONFIG_ENVIRONMENT_FILENAME"
  echo "Environment: $ENVIRONMENT" >$PARAMETERS_CONFIG_ENVIRONMENT_FILE
  IS_TMP_PARAMETERS_CONFIG_FILE=1
fi

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

cd "$SCRIPT_DIR"

echo "Log deploy.sh $(date -Iseconds):" >"$LOG"

echo "Deployment for \"$PROJECT_NAME\" \"$APP_NAME\" \"$ENVIRONMENT\" using AWS-Profile \"$PROFILE_NAME\"!"

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

echo "Creating temporary files..."

function merge() {
  local TYPE=$1
  local DIRECTORY=$2
  local OUTPUT=$3

  if [[ -d "$DIRECTORY" ]]; then
    if ls "$DIRECTORY"/*.yaml 1>/dev/null 2>&1; then
      echo "$TYPE" >"$OUTPUT" 2>>"$LOG"
      if [[ $? -ne 0 ]]; then
        echo "Failed to write $TYPE!"
        exit 1
      fi
      for FILE in "$DIRECTORY"/*.yaml; do
        if [[ -f "$FILE" ]]; then
          sed 's/^/  /' "$FILE" >>"$OUTPUT" 2>>"$LOG"
          echo "" >>"$OUTPUT" 2>>"$LOG"
        fi
      done
    fi
  fi
}

merge "Resources:" "$RESOURCES_DIR" "$TMP_RESOURCES_FILE"
merge "Parameters:" "$PARAMETERS_DIR" "$TMP_PARAMETERS_FILE"
merge "Conditions:" "$CONDITIONS_DIR" "$TMP_CONDITIONS_FILE"
merge "Mappings:" "$MAPPINGS_DIR" "$TMP_MAPPINGS_FILE"
merge "Outputs:" "$OUTPUTS_DIR" "$TMP_OUTPUTS_FILE"

# parameters_env in eigene tmp.yaml überführen
yq eval-all 'select(fileIndex == 0) * select(fileIndex == 1 | (.[].key as $key | select(.[$key] == null)))' $PARAMETERS_CONFIG_FILE $PARAMETERS_CONFIG_ENVIRONMENT_FILE >"$TMP_PARAMETERS_CONFIG_FILE" 2>>"$LOG"
if [[ $? -ne 0 ]]; then
  echo "Failed to create temporary copy of Parameters!"
  exit 1
fi

# pre-deployment.sh ausführen.
test -f "$PRE_DEPLOYMENT_SCRIPT_PATH" && bash "$PRE_DEPLOYMENT_SCRIPT_PATH" "$ENVIRONMENT"
if [[ $? -ne 0 ]]; then
  echo "Failed to run pre-deployment!"
  exit 1
fi

PARAMETERS=$(yq -o=json -I=0 "$TMP_PARAMETERS_CONFIG_FILE" 2>>"$LOG")
if [[ $? -ne 0 ]]; then
  echo "Failed to read Temporary Parameters!"
  exit 1
fi
echo "{\"Parameters\": $PARAMETERS}" >"$TMP_JSON_PARAMETERS_CONFIG_FILE" 2>>"$LOG"
if [[ $? -ne 0 ]]; then
  echo "Failed to write Parameters as JSON!"
  exit 1
fi

# CloudFormation Stack aus Komponenten zusammenbauen
function writeDeployment() {
  local INPUT=$1
  local OUTPUT=$2
  local MODE=$3

  if [[ -f $INPUT ]]; then
    if [[ "$MODE" = "OVERWRITE" ]]; then
      cat "$INPUT" >"$OUTPUT" 2>>"$LOG"
    else
      cat "$INPUT" >>"$OUTPUT" 2>>"$LOG"
    fi
    if [[ $? -ne 0 ]]; then
      echo "Failed to create temporary deployment!"
      exit 1
    fi
  fi
}

writeDeployment "$TMP_PARAMETERS_FILE" "$TMP_DEPLOYMENT_FILE" "OVERWRITE"
writeDeployment "$TMP_MAPPINGS_FILE" "$TMP_DEPLOYMENT_FILE"
writeDeployment "$TMP_CONDITIONS_FILE" "$TMP_DEPLOYMENT_FILE"
writeDeployment "$TMP_RESOURCES_FILE" "$TMP_DEPLOYMENT_FILE"
writeDeployment "$TMP_OUTPUTS_FILE" "$TMP_DEPLOYMENT_FILE"

echo "Creating Infrastructure..."

# CloudFormation Stack hochladen und ausführen
aws cloudformation deploy --stack-name "$STACK_NAME" --template-file "$TMP_DEPLOYMENT_FILE" --parameter-overrides "file:///$TMP_JSON_PARAMETERS_CONFIG_FILE" --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --profile "$PROFILE_NAME" >>"$LOG" 2>&1
if [[ $? -ne 0 ]]; then
  echo "Failed to deploy!"
  exit 1
fi

# post-deployment.sh ausführen.
test -f "$POST_DEPLOYMENT_SCRIPT_PATH" && bash "$POST_DEPLOYMENT_SCRIPT_PATH" "$ENVIRONMENT"
if [[ $? -ne 0 ]]; then
  echo "Failed to run post-deployment!"
  exit 1
fi

echo "Clean up..."

## Temporäre Dateien löschen
rm /tmp/cloudformation_* >>"$LOG" 2>&1

