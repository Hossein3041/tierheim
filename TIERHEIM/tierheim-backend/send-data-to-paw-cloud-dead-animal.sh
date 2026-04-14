#!/bin/bash

ApiKey=""
PawCloudUrl="http://localhost:8080/tierheim/api/private/apikey/pet/create"

declare -A key_map=(
  ["animal_name"]="name"
  ["animal_species"]="species"
  ["animal_race"]="breed"
  ["animal_color"]="color"
  ["animal_gender"]="sex"
  ["animal_chipnumber"]="chipNumber"
  ["animal_registered"]="isRegistered"

  ["find_place"]="foundLocation"
  ["find_date"]="foundDate"

  ["transferee_name"]="finderName"
  ["transferee_address"]="finderAddress"
  ["transferee_tel"]="finderPhone"

)

declare -A value_map=(
  ["Ja"]="true"
  ["Nein"]="false"
  ["Männlich"]="MALE"
  ["Weiblich"]="FEMALE"
)

LOG="/opt/apps/saveFile/log.txt"
TMP_RESULT="/tmp/dead_animal_last_result.txt"

top=""

for arg in "$@"; do
  key="${arg%%=*}"
  value="${arg#*=}"

  if [ -n "$value" ]; then
    mapped_key="${key_map[$key]:-$key}"
    mapped_value="${value_map[$value]:-$value}"

    if [[ "$mapped_value" == "true" || "$mapped_value" == "false" ]]; then
      escaped_value=$mapped_value
    else
      escaped_value=$(printf '%s' "$mapped_value" | jq -R '.')
    fi
    top+="\"$mapped_key\": $escaped_value, "
  fi
done

top+="\"intakeReason\": \"ANIMALDEAD\", "

top="{ ${top%, } }"

payload=$(
  jq -n \
    --argjson top "$top" \
    '$top'
)

payload=$(echo "$payload" | jq 'del(..|nulls)')

echo "Payload: $payload" >>"$LOG"

curl -H "X-API-Key: $ApiKey" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "$payload" \
  $PawCloudUrl &>>/opt/apps/saveFile/log.txt

