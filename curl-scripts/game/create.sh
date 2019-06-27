# VARIABLE=VALUE sh curl-scripts/game/create.sh

# don't use a password you use for any real websites!
curl "https://tic-tac-toe-wdi.herokuapp.com/games" \
  --include \
  --request POST \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data ''

echo
