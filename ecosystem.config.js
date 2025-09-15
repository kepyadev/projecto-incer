module.exports = {
  apps: [
    {
      name: 'incer-api',
      script: './api/dist/js/index.js',
      cwd: '/Users/marciozebedeu/Documents/github/projecto-incer',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'incer-frontend',
      script: 'serve',
      args: '-s build -l 3000',
      cwd: '/Users/marciozebedeu/Documents/github/projecto-incer/incer',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};