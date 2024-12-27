const steamApiKey = process.env.STEAM_API_KEY;

export const handler = async (steamUserId) => {
  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${steamApiKey}&steamid=${steamUserId}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.error) {
      throw new Error('データを取得できませんでした');
    }

    const games = data.response.games.map(game => ({
      appid: game.appid,
      name: game.name,
      playtime: game.playtime_forever,
      img_logo_url: game.img_logo_url
    }));

    return games;
  } catch (error) {
    throw error;
  }
};
