module.exports = {
  apps: [
    {
      name: 'v6y-bfb-frontend-auditor',
      script: './src/index.js',
      watch: true,
      // disable pm2 default logs
      out_file: '/dev/null',
      error_file: '/dev/null'
    },
  ],
};