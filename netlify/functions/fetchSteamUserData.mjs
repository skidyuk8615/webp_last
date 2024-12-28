export const handler = async (req) => {
  const steamApiKey = process.env.STEAM_API_KEY;

  const params = new URL(req.rawUrl).searchParams;
  const steamUserId = params.get("steamUserId");

  const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${steamApiKey}&steamid=${steamUserId}&format=json&include_appinfo=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || data.error) {
      throw new Error('データを取得できませんでした');
    }

    const games = data.response.games;

    // プレイ時間でソートして、上位10個を抽出
    const topGames = games
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .slice(0, 10);


    const mappedGames = topGames.map((game) => ({
      appid: game.appid,
      name: game.name,
      playtime: game.playtime_forever,
      img_icon_url: game.img_icon_url
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ games: mappedGames }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
