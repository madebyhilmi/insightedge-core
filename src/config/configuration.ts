export default () => ({
  riotApiKey: process.env.RIOT_API_KEY || 'your_development_api_key_here',
  port: process.env.PORT || '3000',
});
