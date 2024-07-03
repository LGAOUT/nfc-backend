to lunch the project // npm i && npm start

ROUTES:
http://localhost:5000/api/auth/register // TO REGISTER A USER YOU need to send body like 
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "admin"
}
http://localhost:5000/api/auth/login/password
to connect a user with email and password you need to send a body like
{
  "email": "user@example.com",
  "password": "password123",
}
http://localhost:5000/api/auth/login/nfc
to connect a user with email and password you need to send a body like
{
    "email": "user@example.com", "hash": "068c88cb5872ad110d0fbc792c798652"
}
http://localhost:5000/api/auth/me
this route is used to get user information 
when you log a user, you get a JWT token
you need to set it in the headers of your request 
{Authorization: "Bearer JWT"}