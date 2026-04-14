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
    ["animal_birthdate"]="birthdate"
    ["animal_castrated"]="isNeutered"
    ["animal_characteristic"]="specialCharacteristics"
    ["animal_extra_invoice"]="hasExtraInvoice"

    ["veterinary_office"]="finderName"
)


declare -A value_map=(
  ["Ja"]="true"
  ["Nein"]="false"
  ["Männlich"]="MALE"
  ["Weiblich"]="FEMALE"
)


top=""

for arg in "$@"; do
  key="${arg%%=*}"
  value="${arg#*=}"

  if [ -n "$value" ]; then

    if [[ "$key" == "veterinary_office" ]]; then
      mapped_key="finderName"
      mapped_value="Veterinäramt: $value"
    else
      mapped_key="${key_map[$key]:-$key}"
      mapped_value="${value_map[$value]:-$value}"
    fi

    if [[ "$mapped_value" == "true" || "$mapped_value" == "false" ]]; then
      escaped_value=$mapped_value
    else
      escaped_value=$(printf '%s' "$mapped_value" | jq -R '.')
    fi
    top+="\"$mapped_key\": $escaped_value, "
  fi
done

top+="\"intakeReason\": \"VET_OFFICE\", "

top+="\"finderAddress\": \"\", "
top+="\"finderPhone\": \"\", "

top="{ ${top%, } }"

payload=$(
  jq -n \
    --argjson top "$top" \
    '$top'
)

payload=$(echo "$payload" | jq 'del(..|nulls)')

echo "Payload: $payload" >>/opt/apps/saveFile/log.txt

curl -H "X-API-Key: $ApiKey" \
  -H "Content-Type: application/json" \
  -X POST \
  -d "$payload" \
  $PawCloudUrl &>>/opt/apps/saveFile/log.txt
