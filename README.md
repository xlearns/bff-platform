# playground
```
 query {
    test
    status
    args(parse: "hello world")
 }

 mutation{
  createUser(parse:"1"){
    avatarUrl
  }
  deleteUser(parse:"1"){
    createdAt
    avatarUrl
  }
}

```