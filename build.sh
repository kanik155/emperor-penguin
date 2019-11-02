# 前回ビルドで作成されたフォルダ群を一度全て削除
rm -rf .nuxt public functions/nuxt

mkdir public

npm run build

cp -R .nuxt functions/nuxt
cp -R .nuxt/dist/client public/assets
cp -R app/static/* public/assets