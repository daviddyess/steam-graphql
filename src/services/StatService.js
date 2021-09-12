import database from './../models';

class StatService {
  static async getAllStats() {
    return await database.Rankme.findAll();
  }

  static async getAllPlayers(limit, offset) {
    return await database.Rankme.findAll({
      attributes: [
        'id',
        'steam',
        'name',
        'score',
        'kills',
        'deaths',
        'connected'
      ],
      order: [['score', 'DESC']],
      offset,
      limit
    });
  }

  static async getAStat(id) {
    const theStat = await database.Rankme.findOne({
      where: { id: Number(id) }
    });

    return theStat;
  }

  static async count() {
    return await database.Rankme.count();
  }
}

export default StatService;
