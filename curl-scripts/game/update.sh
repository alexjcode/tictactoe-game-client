# VARIABLE=VALUE sh curl-scripts/game/update.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=BAhJIiUyMThlODA1OTJmN2QwZDI0NzJlMzc1NjJhMjE1YjVmNwY6BkVG--73961e016e6d859cfe54bfd9b586b32fa2946d36" \
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
