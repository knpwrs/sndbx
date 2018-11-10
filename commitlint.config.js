const sndbxs = [
  'css',
  'js',
  'rust',
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [...sndbxs, 'chore']],
  },
};
