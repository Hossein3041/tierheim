#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

PROJECT_NAME=$1
APP_NAME=$2
PROFILE_NAME=$3
DOMAIN_NAME=$4

CLOUDFORMATION_CONFIG="$SCRIPT_DIR/../cloudformation/config.yaml"
MICRONAUT_CONFIG="$SCRIPT_DIR/../src/main/resources"

TMP_CLOUDFORMATION_CONFIG="/tmp/cloudformation_config.yaml"
TMP_MICRONAUT_CONFIG="/tmp/micronaut_config.yaml"

POM_PATH=".."
POM_FILENAME="pom.xml"
POM_FILE="$POM_PATH/$POM_FILENAME"

cd "$SCRIPT_DIR"

cat "$CLOUDFORMATION_CONFIG" > "$TMP_CLOUDFORMATION_CONFIG"
yq ".AppName = \"$APP_NAME\" | .ProjectName = \"$PROJECT_NAME\" | .ProfileName = \"$PROFILE_NAME\" | .DomainName = \"$DOMAIN_NAME\"" "$TMP_CLOUDFORMATION_CONFIG" > "$CLOUDFORMATION_CONFIG"

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  for FILE in "$MICRONAUT_CONFIG"/application*.properties
  do
    if [[ -f "$FILE" ]]; then
      sed -i "s/project.name=unknown/project.name=$PROJECT_NAME/g" "$FILE"
      sed -i "s/app.name=unknown/app.name=$APP_NAME/g" "$FILE"
      sed -i "s/app.domain=unknown/app.domain=$DOMAIN_NAME/g" "$FILE"
    fi
  done

  sed -i "s/micronaut\-microservice\-template/$PROJECT_NAME-$APP_NAME/g" "$POM_FILE"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  for FILE in "$MICRONAUT_CONFIG"/application*.properties
  do
    if [[ -f "$FILE" ]]; then
      sed -i '' -e "s/project.name=unknown/project.name=$PROJECT_NAME/g" "$FILE"
      sed -i '' -e "s/app.name=unknown/app.name=$APP_NAME/g" "$FILE"
      sed -i '' -e "s/app.domain=unknown/app.domain=$DOMAIN_NAME/g" "$FILE"
    fi
  done

  sed -i '' -e "s/micronaut\-microservice\-template/$PROJECT_NAME-$APP_NAME/g" "$POM_FILE"
fi
