module.exports = {
  'extends': 'airbnb-base',
  'parserOptions': {
    'sourceType': 'script',
  },
  'rules': {
    'no-param-reassign': [
      2,
      {
        'props': false
      }
    ],
    'global-require': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    'consistent-return': 0,
    'no-trailing-spaces': 0,
    'object-curly-spacing': [2, 'never'],
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'func-names': 0,
    'no-console': 0,
    'no-plusplus': 0,
    'arrow-parens': ['error', 'always'],
    'no-restricted-syntax': 0,
    'object-shorthand': 0,
    'class-methods-use-this': 0,
    'prefer-destructuring': 0
  }
};
