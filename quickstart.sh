cd core
jsdoc -d docs *
yarn install
yarn build
cd ../examples/dnd
rm -rf node_modules
yarn install
yarn start
