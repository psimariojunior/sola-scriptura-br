module.exports = {
  apps: [
    {
      name: 'sola-backend',
      script: './dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      min_uptime: '10s',
      max_restarts: 50,
      restart_delay: 3000,
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: 'production',
      },
      error_file: '/dev/null',
      out_file: '/dev/null',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Graceful shutdown
      kill_timeout: 10000,
      listen_timeout: 10000,
      // Hooks
      hooks: {
        on_restart: function() {
          console.log('[PM2] Process restarting...');
        },
        after_restart: function() {
          console.log('[PM2] Process restarted successfully');
        },
      },
    },
  ],
};
