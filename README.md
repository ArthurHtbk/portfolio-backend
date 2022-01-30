# Portfolio (back end)

Welcome to the back-end repository of my portfolio!

## How to use

Please ignore all routes that are not listed below, they are for maintenance only.

### /skills (GET)

Get a list of skills. No query/param needed.

### /resume/download (GET)

Download my resume, in English or in French.

| Query     | Type    | Required | Description                      |
| --------- | ------- | -------- | -------------------------------- |
| `english` | Boolean | Yes      | English if true, French if false |


### /projects (GET)

Get a list of projects. No query/param needed.

### /contact (POST)

Send a message to my email address.

| Body        | Required | Description            |
| ----------- | -------- | ---------------------- |
| `firstname` | Yes      | User's first name      |
| `lastname`  | Yes      | User's last name       |
| `email`     | Yes      | User's email address   |
| `subject`   | Yes      | Subject of the message |
| `message`   | Yes      | Body of the message    |


## Packages & dependencies

- [Axios](https://www.npmjs.com/package/axios)
- [Cloudinary](https://www.npmjs.com/package/cloudinary)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Express](https://www.npmjs.com/package/express)
- [Express-formidable](https://www.npmjs.com/package/express-formidable)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Nodemailer](https://www.npmjs.com/package/nodemailer)

## Check this out!

- **[My portfolio](https://arthur-heurtebise.netlify.app/)**
- **The corresponding [front-end repository](https://github.com/ArthurHtbk/my-portfolio)**