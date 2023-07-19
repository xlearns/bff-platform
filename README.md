# features

- Data aggregation and clipping.
  - graphql
- SSR.
- Screenshots.
- Uploading and downloading.
- Interface forwarding.
- The backend will be refactored using the Go framework Gin.

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
