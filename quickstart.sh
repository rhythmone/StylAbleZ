cd core
yarn install
yarn doc
yarn build
cd ../examples/dnd
rm -rf node_modules
yarn install
yarn start
