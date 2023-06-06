# features
- Data aggregation and clipping
- SSR
- Screenshots
- Uploading and downloading
- Interface forwarding


# playground
```
query{
  getAllStatus{
    code
  }
  getStatusById(id:1){
    code
  }
  getAllUsers{
    name
  }
  getUserById(id:1){
    name
  }
}

```