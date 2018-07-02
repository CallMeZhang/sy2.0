# 运行格式 ./build.sh
cp ./sh/real.js ./config/index.js
cp ./sh/global_real.js ./src/global.js
npm run build

cp ./sh/test.js ./config/index.js
cp ./sh/global_test.js ./src/global.js
npm run build

cp ./MP_verify_6G7F1qk1MDTxj0qo.txt ./release/production/MP_verify_6G7F1qk1MDTxj0qo.txt
cp ./MP_verify_6G7F1qk1MDTxj0qo.txt ./release/debug/MP_verify_6G7F1qk1MDTxj0qo.txt
