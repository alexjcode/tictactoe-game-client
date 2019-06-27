# VARIABLE=VALUE sh curl-scripts/game/index.sh

curl --include --request GET "https://tic-tac-toe-wdi.herokuapp.com/games" \
  --header "Authorization: Token token=${TOKEN}"

echo
