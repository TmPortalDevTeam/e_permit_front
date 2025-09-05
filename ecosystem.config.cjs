module.exports = {
  apps: [
    {
      name: 'e-permit-admin',
      script: 'npm',
      args: ['run', 'preview'],
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};