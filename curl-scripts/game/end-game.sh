# VARIABLE=VALUE sh curl-scripts/game/end-game.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
  "game": {
    "over": "'${OVER}'"
  }
}'

echo
