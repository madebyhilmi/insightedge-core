export default () => ({
  riotApiKey: process.env.RIOT_API_KEY || 'RGAPI-1179848f-b349-49c8-9233-7b8349d334c2',
  port: process.env.PORT || '3000',
});
async function fetchData(){
  const apiUrl='http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/item.json';
  try {
    const response = await axios.get(apiUrl);
    const data =response.data;
    console.log(data);

  } catch (error){
    console.error('Error:', error);
  }
}
fetchData(total){

  if 'total'>= 500,

      }
}