# auth-server

Auth-server is a small API project that handles user JWT authentication with Node, Express and TypeScript and runs on a Docker environment with a PostgreSQL database.

To test the application follow the next steps:

1) Clone the repository on your local machine
2) Run `npm install` in the folder with the application
3) Run `npm run docker:build` to create the containers and start the environment

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

In regards to finding the bug in the following code:

```
const fs = require('fs');

function readFile(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
}

function writeFile(path, data, callback) {
  fs.writeFile(path, data, 'utf8', err => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
}

readFile('input.txt', (err, data) => {
  if (err) throw new Error(err);
  const newData = data.toUpperCase();

  writeFile('output.txt', newData, () => {
    console.log('File written successfully');
  });
});
```

I've run the code and it worked well first try so I tried a case where the file path would be wrong and I would get an error about `data.toUpperCase not a being a function` and that wouldn't reflect the actual issue. So, I added to the readFile call the `err` parameter as well so I could throw the actual error in the `if` statement before the `newData` declaration.
