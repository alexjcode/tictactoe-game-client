# VARIABLE=VALUE sh curl-scripts/game/create.sh

# don't use a password you use for any real websites!
curl "https://tic-tac-toe-wdi.herokuapp.com/games" \
  --include \
  --request POST \
  --header "Authorization: Token token=BAhJIiVmZjc3YjZjZGM3ZDIxMDRhNzQwZDk0ZWUxMDNiNjljZAY6BkVG--343268082f13ada8c8b7747f41fbab0185521379" \
  --header "Content-Type: application/json" \
  --data ''

echo
