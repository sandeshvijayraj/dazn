# Movies
The project is a demo application that showcases movies api as per DAZN Interview request

## Pre requisites
* Docker - You need to have docker service running locally
* Docker-compose - We use Docker compose to run multiple container

## How to run
* Clone the complete project using `git clone`
* Execute command `docker-compose up --build`
* Api will be hosted on `http://localhost:3000`
* You will nead bearer token to be able to make API call

### Bearer token
```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImVtYWlsIjoic2FuZGVzaC5iYWZuYThAZ21haWwuY29tIiwiaWF0IjoxNzAwMDQ1MDY2fQ.erRD4WQ329VdNELKoY8nRpN-NlbDxmsbopth0jDfMys
```
* The above bearer token is a token of Admin user with email `sandesh.bafna8@gmail.com`
* You can also create new Token using HS256 for test purpose

### Testing
* GET http://localhost:3000/movies
* POST http://localhost:3000/movies
* PUT http://localhost:3000/movies/{movieId}
    * body 
    ```
    {
      "title": "Movie 1",
      "genre": "Action + not",
      "rating": 8.5,
      "streamingLink": "https://example.com/movie1"
    }
    ```

### Missing feature
* Unique Id in MangoDB - Timeout in Implementation
* Caching
* Avoiding _id and __v in response
* Adding new admin user
* Proper datamodel in MongoDB