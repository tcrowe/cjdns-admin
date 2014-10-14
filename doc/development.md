
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
