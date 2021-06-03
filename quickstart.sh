rm -rf node_modules &
pushd ../../core
yarn build
popd
yarn install
yarn start
