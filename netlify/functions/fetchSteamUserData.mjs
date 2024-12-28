export const handler = async (req) => {
  const steamApiKey = process.env.STEAM_API_KEY;

  const params = new URL(req.rawUrl).searchParams;
  const steamUserId = params.get("steamUserId");

  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${steamApiKey}&steamid=${steamUserId}&format=json&include_appinfo=1`;

  try {
    console.log('url:', url);
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.error) {
      throw new Error('データを取得できませんでした');
    }

    const games = data.response.games.map(game => ({
      appid: game.appid,
      name: game.name,
      playtime: game.playtime_forever,
      img_icon_url: game.img_icon_url
    }));

    return {
      statusCode: 200, // 成功
      body: JSON.stringify(games),
    };
  } catch (error) {
    return {
      statusCode: 500, // エラー
      body: JSON.stringify({ error: error.message }),
    };
  }
};
