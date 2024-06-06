module.exports = {
  apps: [
    {
      name: "bfb-app",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
