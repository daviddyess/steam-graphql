/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
import Steam from 'steam-web-async';
import Steamid from 'steamid';
import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import StatService from 'services/StatService';
import config from 'modules/config';
import { getLogger } from 'modules/logging';
/* Import Types as Fields */
import {
  id,
  name,
  steam,
  lastip,
  connected,
  lastconnect,
  deaths,
  score,
  kills,
  shots,
  hits,
  headshots,
  suicides,
  tk,
  rounds_tr,
  rounds_ct,
  knife,
  glock,
  usp,
  p228,
  deagle,
  elite,
  fiveseven,
  m3,
  xm1014,
  mac10,
  tmp,
  mp5navy,
  ump45,
  p90,
  galil,
  ak47,
  sg550,
  famas,
  m4a1,
  aug,
  scout,
  sg552,
  awp,
  g3sg1,
  m249,
  hegrenade,
  flashbang,
  smokegrenade,
  head,
  chest,
  stomach,
  left_arm,
  right_arm,
  left_leg,
  right_leg,
  c4_planted,
  c4_exploded,
  c4_defused,
  ct_win,
  tr_win,
  hostages_rescued,
  storage,
  totalCount,
  count,
  search,
  field,
  order,
  Int as page,
  String as steamid,
  String as personaname,
  String as profileurl,
  String as avatar,
  String as avatarmedium,
  Int as lastlogoff,
  String as realname,
  String as primaryclanid,
  Int as timecreated,
  String as loccountrycode,
  String as locstatecode
} from 'modules/graphQLTypes';

const fields = {
  id,
  name,
  steam,
  lastip,
  connected,
  lastconnect,
  deaths,
  score,
  kills,
  shots,
  hits,
  headshots,
  suicides,
  tk,
  rounds_tr,
  rounds_ct,
  knife,
  glock,
  usp,
  p228,
  deagle,
  elite,
  fiveseven,
  m3,
  xm1014,
  mac10,
  tmp,
  mp5navy,
  ump45,
  p90,
  galil,
  ak47,
  sg550,
  famas,
  m4a1,
  aug,
  scout,
  sg552,
  awp,
  g3sg1,
  m249,
  hegrenade,
  flashbang,
  smokegrenade,
  head,
  chest,
  stomach,
  left_arm,
  right_arm,
  left_leg,
  right_leg,
  c4_planted,
  c4_exploded,
  c4_defused,
  ct_win,
  tr_win,
  hostages_rescued
};
const log = getLogger('Statistics');

/**
 * Steam Definition
 */
export const SteamPlayerDef = new GraphQLObjectType({
  name: 'SteamPlayer',
  description: 'Steam Player definition',
  fields: () => ({
    steamid,
    personaname,
    profileurl,
    avatar,
    avatarmedium,
    lastlogoff,
    realname,
    primaryclanid,
    timecreated,
    loccountrycode,
    locstatecode
  })
});
/**
 * Player Stats Definition
 */
export const PlayerStatsDef = new GraphQLObjectType({
  name: 'PlayerStats',
  description: 'Player Stats definition',
  fields: () => ({
    ...fields
  })
});
/**
 * Player Definition
 */
export const PlayerDef = new GraphQLObjectType({
  name: 'PlayerStatistics',
  description: 'Player Statistics definition',
  fields: () => ({
    steam: { type: SteamPlayerDef },
    stats: { type: PlayerStatsDef }
  })
});
/**
 * Statistics Definition
 */
export const StatDef = new GraphQLObjectType({
  name: 'Statistics',
  description: 'Statistics definition',
  fields: () => ({
    id,
    steam,
    name,
    score,
    kills,
    deaths,
    connected
  })
});
/**
 * Statistics Node
 *
 * List definition for requesting Statisticss
 */
export const StatNode = new GraphQLObjectType({
  name: 'StatNode',
  description: 'Statistics Node',
  fields: () => ({
    storage,
    totalCount,
    count,
    nodes: { type: new GraphQLList(StatDef) }
  })
});

/**
 * Statistics Filter [Input]
 */
const StatFilter = new GraphQLInputObjectType({
  name: 'StatFilter',
  description: 'Statistic Filters',
  fields: () => ({
    search
  })
});
/**
 * Statistic Sort [Input]
 */
const StatSort = new GraphQLInputObjectType({
  name: 'StatSort',
  description: 'Statistic Sort',
  fields: () => ({
    field,
    order
  })
});
/**
 * Get a Player's Stats [Query]
 */

export const getPlayer = {
  type: PlayerDef,
  args: {
    id
  },
  resolve: async (_, { id }) => {
    if (!Number(id)) {
      throw new Error('Please input a valid numeric value');
    }

    try {
      const s = new Steam({
        apiKey: config.steam.steamAPIKey,
        format: 'json' // optional ['json', 'xml', 'vdf']
      });

      const stats = await StatService.getAStat(id);

      if (!stats) {
        throw new Error('Player ID Not Found');
      } else {
        const sid = new Steamid(stats.steam);

        const steam = await s.getPlayerSummaries({
          steamids: [sid.getSteamID64()]
        });

        return await { steam: steam?.response?.players[0], stats };
      }
    } catch (error) {
      log.error(error.message);
      log.error(error.stack);
    }
  }
};
/**
 * Get Stats [Query]
 */
export const getPlayers = {
  type: StatNode,
  args: {
    count,
    page,
    filter: { type: StatFilter }, // Input Type
    sort: { type: StatSort } // Input Type
  },
  resolve: async (_, { count, page }) => {
    try {
      if (!count || Number(count) > 20) {
        count = 20;
      } else {
        count = Number(count);
      }
      if (!page) {
        page = 1;
      } else {
        page = Number(page);
      }
      const nodes = await StatService.getAllPlayers(count, (page - 1) * count);

      return {
        totalCount: await StatService.count(),
        count,
        nodes
      };
    } catch (error) {
      log.error(error.message);
      log.error(error.stack);
    }
  }
};

const Statistics = {
  getPlayer,
  getPlayers,
  StatDef,
  StatNode
};

export default Statistics;
