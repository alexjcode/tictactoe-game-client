# VARIABLE=VALUE sh curl-scripts/game/update.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/games/7723" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=BAhJIiU3NWIzNTIyZjIyNmNkYjc4MjkyODVhNWE3Yjg2ZmE0MgY6BkVG--3b53e26cbc5bc0ea3f051333b51be4ff47f5b455" \
  --header "Content-Type: application/json" \
  --data '{
  "game": {
    "over": true
  }
}'

echo
