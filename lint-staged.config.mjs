export default {
  "*.{js,cjs,mjs,ts,cts,mts}": ["oxlint --fix"],
  "*.{js,cjs,mjs,ts,cts,mts,json,jsonc,md}": ["oxfmt --write"]
};
