# VARIABLE=VALUE sh curl-scripts/game/update.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=BAhJIiVmZjc3YjZjZGM3ZDIxMDRhNzQwZDk0ZWUxMDNiNjljZAY6BkVG--343268082f13ada8c8b7747f41fbab0185521379" \
  --header "Content-Type: application/json" \
  --data '{
  "game": {
    "cell": {
      "index": "'${INDEX}'",
      "value": "'"${VALUE}"'"
    },
    "over": "'${OVER}'"
  }
}'

echo
