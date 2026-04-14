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
APPLICATION_FILE=$(yq e '.LambdaCodePath' "$PARAMETERS_CONFIG_FILE")
APPLICATION_FILENAME=$(yq e '.LambdaCodeArchive' "$PARAMETERS_CONFIG_FILE")
AWS_S3_BUCKET_NAME=$(yq e '.LambdaCodeS3Bucket' "$PARAMETERS_CONFIG_FILE")
TMP_RESOURCES_FILE=$(yq e '.TmpResourcesFile' "$CONFIG_FILE")
TMP_PARAMETERS_CONFIG_FILE=$(yq -e '.TmpParametersConfigFile' "$CONFIG_FILE")
TMP_CODES_FILE=$(yq e '.TmpCodesFile' "$CONFIG_FILE")

# Zusammengebaute Variablen
LOG="$SCRIPT_DIR/../../scripts/deploy_log.txt"
AWS_S3_FILE_PATH="$PROJECT_NAME/$APP_NAME/${ENVIRONMENT}_$APPLICATION_FILENAME"
CODES_DIR="$SCRIPT_DIR/../infrastructure/codes"

echo "Checking App..."

# Prüfen ob gebaute Anwendung zur Verfügung steht.
if [ ! -f "$APPLICATION_FILE" ]; then
  echo "Did not found $APPLICATION_FILE!"
  echo "Consider using make.sh to build App!"
  exit 1
fi

# Gebaute Anwendung auf S3 hochladen
S3_ETAG=$(aws s3api head-object --bucket "$AWS_S3_BUCKET_NAME" --key "$AWS_S3_FILE_PATH" --query ETag --output text --profile "$PROFILE_NAME" 2>>"$LOG")
LOCAL_ETAG=$(openssl md5 "$APPLICATION_FILE" | awk '{print $2}')
LOCAL_ETAG="\"$LOCAL_ETAG\""
if [[ "$LOCAL_ETAG" != "$S3_ETAG" ]]; then
  echo "App is not up to date!"
  echo "Uploading App..."
  VERSION_ID=$(aws s3api put-object --body "$APPLICATION_FILE" --bucket "$AWS_S3_BUCKET_NAME" --key "$AWS_S3_FILE_PATH" --query 'VersionId' --output text --profile "$PROFILE_NAME" 2>>"$LOG")
else
  echo "App is up to date!"
  VERSION_ID=$(aws s3api list-object-versions --bucket "$AWS_S3_BUCKET_NAME" --prefix "$AWS_S3_FILE_PATH" --query 'Versions[0].VersionId' --output text --profile "$PROFILE_NAME" 2>>"$LOG")
fi

echo "Refresh Parameters..."

# Parameters überschreiben
cat "$TMP_PARAMETERS_CONFIG_FILE" > "$TMP_PARAMETERS_CONFIG_FILE.tmp"
yq eval-all 'select(fileIndex == 0) * select(fileIndex == 1 | (.[].key as $key | select(.[$key] == null)))' "$TMP_PARAMETERS_CONFIG_FILE.tmp" - <<< "LambdaCodeVersion: \"$VERSION_ID\"" > "$TMP_PARAMETERS_CONFIG_FILE" 2>>"$LOG"
if [[ $? -ne 0 ]]; then
  echo "Failed to create temporary copy of Parameters!"
  exit 1
fi
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  LAMBDA_ARCHITECTURE="x86_64"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  LAMBDA_ARCHITECTURE="arm64"
fi
cat "$TMP_PARAMETERS_CONFIG_FILE" > "$TMP_PARAMETERS_CONFIG_FILE.tmp"
yq eval-all 'select(fileIndex == 0) * select(fileIndex == 1 | (.[].key as $key | select(.[$key] == null)))' "$TMP_PARAMETERS_CONFIG_FILE.tmp" - <<< "LambdaArchitecture: \"$LAMBDA_ARCHITECTURE\"" > "$TMP_PARAMETERS_CONFIG_FILE" 2>>"$LOG"
if [[ $? -ne 0 ]]; then
  echo "Failed to create temporary copy of Parameters!"
  exit 1
fi

# Makros ersetzen.
TIMESTAMP=$(date +%s)
sed -i'' -e "s/\\\$TIMESTAMP\\\$/$TIMESTAMP/g" "$TMP_RESOURCES_FILE" >> "$LOG" 2>&1
while [ -n "$(sed -n '/\$IMPORT(".*")\$/{p;q;}' "$TMP_RESOURCES_FILE")" ]; do
  IMPORT_LINE=$(sed -n '/\$IMPORT(".*")\$/{p;q;}' "$TMP_RESOURCES_FILE")
  INDENTATION=$(echo "$IMPORT_LINE" | sed 's/[^[:space:]].*//')
  IMPORT_PATTERN=$(echo "$IMPORT_LINE" | sed -n 's/.*\(\$IMPORT(".*")\$\).*/\1/p')
  FILENAME=$(echo "$IMPORT_PATTERN" | sed -n 's/.*$IMPORT("\(.*\)")\$.*/\1/p')
  if [[ ! -f "$CODES_DIR/$FILENAME" ]]; then
    echo "Datei $CODES_DIR/$FILENAME nicht gefunden!"
    exit 1
  fi

  cat "$CODES_DIR/$FILENAME" > "$TMP_CODES_FILE"
  echo "" >> "$TMP_CODES_FILE"

  sed -i'' -e "s/^/${INDENTATION}/" "$TMP_CODES_FILE"

  IMPORT_LINE=$(echo "$IMPORT_LINE" | sed 's/[\$\/".]/\\&/g')
  sed -i'' -e "/$IMPORT_LINE/{
    r $TMP_CODES_FILE
    d
  }" "$TMP_RESOURCES_FILE"
done

rm "$TMP_CODES_FILE" >> "$LOG" 2>&1