#!/bin/bash

ApiKey=""
PawCloudUrl="http://localhost:8080/tierheim/api/private/apikey/pet/create"

# Defining the mapping for the fields
declare -A key_map=(
  ["animal_extra_invoice"]="hasExtraInvoice"
  ["animal_name"]="name"
  ["animal_race"]="breed"
  ["animal_species"]="species"
  ["animal_color"]="color"
  ["animal_gender"]="sex"
  ["animal_chipnumber"]="chipNumber"
  ["animal_birthdate"]="birthdate"
  ["animal_registered"]="isRegistered"
  ["animal_castrated"]="isNeutered"
  ["animal_characteristic"]="specialCharacteristics"

  ["transferee_name"]="finderName"
  ["transferee_name_inline"]="transfereeNameInline"
  ["transferee_address"]="finderAddress"
  ["transferee_tel"]="finderPhone"

  ["find_place"]="foundLocation"
  ["find_date"]="foundDate"

  ["date"]="handoverDate"
  ["animal_handover_type"]="type"
)

declare -A value_map=(
  ["Ja"]="true"
  ["Nein"]="false"
  ["Männlich"]="MALE"
  ["Weiblich"]="FEMALE"
)

# Definition of the JSON-Objects
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

# Ergänze Intake-Reason für Fundtier:
top+="\"intakeReason\": \"FOUND\", "

# Remove trailing comma and space
top="{ ${top%, } }"

# Generate JSON
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
