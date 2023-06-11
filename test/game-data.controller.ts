export default () => ({
  riotApiKey:
    process.env.RIOT_API_KEY || 'RGAPI-1179848f-b349-49c8-9233-7b8349d334c2',
  port: process.env.PORT || '3000',
});

async function fetchData() {
  const apiUrl =
    'http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/item.json';
  try {
    const response = await (apiUrl);
    const data = response.data;
    const total = 550;

    if (total >= 500) {
      const item = data.item;
      console.log(item.name);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();