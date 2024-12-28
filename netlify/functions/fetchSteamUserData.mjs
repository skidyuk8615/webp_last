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
      //img_logo_url: game.img_logo_url
    }));

    return new Response(JSON.stringify(games), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
