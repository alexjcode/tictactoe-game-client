# VARIABLE=VALUE sh curl-scripts/game/show.sh

curl --include --request GET "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
  --header "Authorization: Token token=${TOKEN}"

echo
