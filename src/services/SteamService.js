import Steamid from 'steamid';

class SteamService {
  static async getSteamId(id) {
    const sid = new Steamid(id);
    const steam = {
      ...sid,
      steam2Id: id,
      steam3Id: sid.getSteam3RenderedID(),
      steamId: sid.getSteamID64()
    };

    return steam;
  }
}

export default SteamService;
