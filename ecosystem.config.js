module.exports = {
  apps: [
    {
      name: "ppob-dashboard",
      script: "dist/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        X_API_KEY: "yourSecureApiKey"
      },
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "500M",
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}; 