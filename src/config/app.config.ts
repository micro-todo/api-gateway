const appConfig = () => ({
  port: process.env.PORT ?? 8000,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET ?? '',
  userServiceHost: process.env.USER_SERVICE_HOST ?? '',
  userServicePort: parseInt(process.env.USER_SERVICE_PORT ?? '0'),
  tasksServiceHost: process.env.TASKS_SERVICE_HOST ?? '',
  tasksServicePort: parseInt(process.env.TASKS_SERVICE_PORT ?? '0'),
});

export type AppConfig = typeof appConfig;

export default appConfig;
