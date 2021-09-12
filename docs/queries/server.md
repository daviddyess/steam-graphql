# Server

## Server Info

```graphql
query server($type: String, $host: String) {
  server(type: $type, host: $host) {
    name
    map
    password
    maxplayers
    connect
    ping
    raw {
      game
      numplayers
      numbots
      secure
      tags {
        tag
      }
      rules {
        bot_quota
        gungame_enabled
        mp_friendlyfire
        sm_nextmap
      }
    }
    players {
      name
      raw {
        score
        time
      }
    }
    bots {
      name
      raw {
        score
        time
      }
    }
  }
}
```

```json
{
  "type": "css",
  "host": "css.moodycrew.us"
}
```
