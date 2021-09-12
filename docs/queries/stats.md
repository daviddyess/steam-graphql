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
