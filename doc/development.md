
Automated testing is done via [mocha](http://visionmedia.github.io/mocha/) and code quality is checked via [jshint](http://www.jshint.com/).

[gulp](http://gulpjs.com/) runs mocha and jshint watching for changes and re-running the tasks.

Install gulp globally:
```
npm install gulp -g
```

Install the npm packages locally:
```
npm install
```

Add some environment variables
```
export CJDNS_ADMIN_IP=127.0.0.1
export CJDNS_ADMIN_PORT=11234
export CJDNS_ADMIN_PASSWORD=get your password from your config file
```
Only the password variable is required for testing.

Run gulp:
```
gulp
```

## JavaScript Code Style
Using [idiomatic.js](https://github.com/rwaldron/idiomatic.js) we have a guide for how to write our JS. The goal is to write robust code which follows a consistent style.

JSHint will point out any instances where the code is confusing, buggy, or doesn't follow the style.
