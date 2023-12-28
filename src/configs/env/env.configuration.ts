export const EnvConfiguration = () => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 4001,
  mongodbDebug: process.env.MONGODB_DEBUG == 'true' || false,
});
