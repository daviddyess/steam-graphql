# Statistics

## Top Players

```graphql
query players($count: Int, $page: Int) {
  players(count: $count, page: $page) {
    storage
    totalCount
    count
    nodes {
      id
      steam
      name
      score
      kills
      deaths
      connected
    }
  }
}
```

```json
{
  "count": 20,
  "page": 1
}
```

## Player

```graphql
query player($id: Int) {
  player(id: $id) {
    steam {
      steamid
      personaname
      profileurl
      avatar
      avatarmedium
      lastlogoff
      realname
      primaryclanid
      timecreated
      loccountrycode
      locstatecode
    }
    stats {
      id
      name
      steam
      lastip
      connected
      lastconnect
      deaths
      score
      kills
      shots
      hits
      headshots
      suicides
      tk
      rounds_tr
      rounds_ct
      knife
      glock
      usp
      p228
      deagle
      elite
      fiveseven
      m3
      xm1014
      mac10
      tmp
      mp5navy
      ump45
      p90
      galil
      ak47
      sg550
      famas
      m4a1
      aug
      scout
      sg552
      awp
      g3sg1
      m249
      hegrenade
      flashbang
      smokegrenade
      head
      chest
      stomach
      left_arm
      right_arm
      left_leg
      right_leg
      c4_planted
      c4_exploded
      c4_defused
      ct_win
      tr_win
      hostages_rescued
    }
  }
}
```

```json
{
  "id": 1
}
```
