# VARIABLE=VALUE sh curl-scripts/game/update.sh

curl "https://tic-tac-toe-wdi.herokuapp.com/games/7043" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=BAhJIiVhMmE2NjdiMzAxYTkxMjEyZDkwMTkxZjhmZjRiOGNmZQY6BkVG--1842b8b458f28270ddcf02041466e5e62e72701d" \
  --header "Content-Type: application/json" \
  --data '{
  "game": {
    "over": true
  }
}'

echo
