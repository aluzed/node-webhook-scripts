![Logo](https://github.com/aluzed/node-webhook-scripts/raw/master/logo.png "Node Webhook Scripts")

# Node Webhook Scripts

## Installation 

Run : 

```
git clone git@github.com:aluzed/node-webhook-scripts.git
```

Create a `hooks.js` and a `config.js` file.

## Create a hook 

In hooks.js : 

```js
module.exports = [
  {
    path: "/my_beautiful_hook",
    command: "sh /var/my/scripts/path/script.sh", 
    cwd: "/var/my/scripts/path",
    method: "post"
  }
]
```

By default, if you omit the `method` key, it will send a `GET` request. (uppercase or lowercase...)

You have to declare 4 keys : 
* Path for your HTTP server
* The route method
* The command to run
* The directory where you want to run the script

List of methods : 
* get
* post
* put 
* delete

## Configurations

In `config.js` you only need to export an object : 

```javascript
module.exports = {
  port: 8080, // <- listen port
  token: 'MySecurityT0k3n' // <- to inject in your headers
}
```

## Start server

You can create a service or simply run :

```
node index.js
```

To display webhook trigger you can run with VERBOSE=true in your environment.

```
VERBOSE=true node index.js
```

## Test Script

Let's make some test script `/var/www/scripts/test.sh`

```
#!/bin/bash

echo 'Hellooooooooo WOOOOOOOORLLLLLLD !'
```

With this hook configuration in `hooks.js` : 

```js
module.exports = [
  {
    path: "/hello_world",
    command: "sh /var/www/scripts/test.sh",
    cwd: "/var/www/scripts/",
    method: "post"
  }
]
```

## Use :

You can test your webhook server with curl or insomnia/postman/whatever...

```
curl -X POST http://localhost:8080/hello_world [-H 'token: MySecurityT0k3n']

-->

DONE : Hellooooooooo WOOOOOOOORLLLLLLD !
```

## Callback :

If you prefer use a normal Express callback, you just have to add a "func" key in your hooks.js, with request and result args. (see hooks.sample.js)

![License](https://i.creativecommons.org/l/by-nc-sa/3.0/fr/88x31.png "CC BY NC SA")