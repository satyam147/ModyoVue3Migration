update.sh

#!/bin/bash

echo "Downloading migration files"
git clone https://github.com/satyam147/ModyoVue3Migration.git ModyoVue3Migration

mv ModyoVue3Migration/Vue3Migration .

rm -r ModyoVue3Migration

if [[ -f "package-lock.json" ]]
then
  echo "Updating project to use pnpm"
  echo "Removing node_modules and package-lock.json"
  rm -r node_modules
  rm package-lock.json
else
  echo "Already using pnpm"
fi

echo "Installing dependencies"
pnpm install --ignore-scripts

echo "Removing unused dependencies"
pnpm remove  jest jest-sonar-reporter vue-template-compiler @vue/vue2-jest babel-jest @vue/cli-plugin-unit-jest

echo "Installing new dependencies"
pnpm install vite vite-plugin-commonjs @vitejs/plugin-vue pinia @vee-validate/i18n @vee-validate/rules vue3-toastify vue-loading-overlay

echo "Updating dependencies"
pnpm update @modyo/sdk@2.0.4 axios@1.7.9 bootstrap@5.3.3 core-js@3.39.0 liquidjs@10.19.0 moment@2.30.1 vue@3.5.13 vue-i18n@10.0.5 \
 vue-router@4.5.0 @commitlint/cli @commitlint/config-conventional @modyo/cli @webzlodimir/vue-bottom-sheet axe-core eslint @vue/test-utils \
 eslint-plugin-import eslint-plugin-promise eslint-plugin-vue validate-branch-name vue-axe vee-validate@4.14.7

echo "Installing new devDependencies"
pnpm i -D @tsconfig/node20 @types/jsdom @types/node @vitest/coverage-v8 @vue/eslint-config-prettier @vue/eslint-config-typescript@13.0.0 @vue/tsconfig \
autoprefixer jsdom prettier sass-embedded typescript@5.5.4 vitest vitest-sonar-reporter vue-i18n-extract vue-tsc @vue/cli-plugin-typescript

echo "Removing common js files to replace with ts"
rm jest.config.js babel.config.js commitlint.config.js jsconfig.json postcss.config.js stylelint.config.js vue.config.js
rm src/i18n.js src/vee-validate-config.js src/i18n-with-config-space.js .eslintrc.js
rm src/liquid/liquidParser.js src/liquid/LiquidParserJs.js src/liquid/PlatformParser.js

echo  "Removing tests folder"
rm -r tests unit

echo  "Removing old loader"
rm -r src/components/Loader

echo  "Coping new files"
mv Vue3Migration/src/liquid/* src/liquid
rm -r Vue3Migration/src/liquid
mv Vue3Migration/src/Loader src/components

if [[ -f "src/stores/store.ts" ]]
  echo "Store already exists"
then
  mv Vue3Migration/src/store.ts src/stores
fi

mv Vue3Migration/src/* src
mv Vue3Migration/.* .
mv Vue3Migration/*.* .

echo "Removing migration folder"
rm -r Vue3Migration

# convert all the js files to ts files in src and all src sub directories.

echo "Converting all js files to ts (except store)"
for f in src/*.js; do
  if [[ $f != *"stores"* ]]; then
     mv "$f" "${f%.js}.ts"
  fi
done

for f in src/**/*.js; do
  if [[ $f != *"stores"* ]]; then
     mv "$f" "${f%.js}.ts"
  fi
done

for f in src/**/**/*.js; do
  if [[ $f != *"stores"* ]]; then
     mv "$f" "${f%.js}.ts"
  fi
done

echo "Basic migration completed"
echo "Please run pnpm run type-check and solve all the type issues"

