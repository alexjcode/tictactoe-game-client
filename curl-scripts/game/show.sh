# VARIABLE=VALUE sh curl-scripts/game/show.sh

curl --include --request GET "https://tic-tac-toe-wdi.herokuapp.com/games/${ID}" \
  --header "Authorization: Token token=BAhJIiVmZjc3YjZjZGM3ZDIxMDRhNzQwZDk0ZWUxMDNiNjljZAY6BkVG--343268082f13ada8c8b7747f41fbab0185521379"

echo
