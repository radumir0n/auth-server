# auth-server

Auth-server is a small API project that handles user JWT authentication with Node, Express and TypeScript and runs on a Docker environment with a PostgreSQL database.

To test the application follow the next steps:

1) Clone the repository on your local machine
2) Run `npm install` in the folder with the application
3) Run `npm run docker:build" to create the containers and start the environment

Endpoints for testing:

- GET: http://localhost:5050/users
- GET: http://localhost:5050/users/{id}
- POST: http://localhost:5050/users/register

json body ex: {
	"email": "test44@test.com",
	"username": "radu_test44",
	"password": "password"
}

- POST: http://localhost:5050/users/login

json body ex: {
	"username": "radu_test44",
	"password": "password"
}

- PATCH: http://localhost:5050/users/{id}

json body ex: {
	"email": "test55@test.com",
	"username": "radu_test55"
}

- DELETE: http://localhost:5050/users/{id}
