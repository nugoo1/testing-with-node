# Testing Express Applications

## Supertest
Supertest was made by the developers of Express. We use this in conjunction with expect.

`npm i supertest@2.0.0`

In server.js

```
app.get('/users', (req, res) => {
        res.status(200).send([
            {
                name: 'Andrew Mead',
                age: 26
            }, {
                name: 'Nuwan Goonewardena',
                age: 25
            },{
                name: 'Alex Gordon',
                age: 23
            }
        ]);
    });
```

### In server.test.js, we use (done) as it is an asynchronous function.


```
it('should return correct response', (done) => {
    request(app)
        .get('/users')
        .expect(200)
        .expect((res) => {
            expect(res.body).toInclude({
                name: 'Nuwan Goonewardena',
                age: 25
            })
        })
        .end(done);     
});
```

## Using describe()
We use describe and pass in an arrow function with all our tests. 
This let's us categorize our tests to keep our test suite clean & organized.

```
describe('Utils', () => {
    it('should add two numbers', () => {
        var res = utils.add(33,11);
        expect(res).toBe(44).toBeA('number');
    });
```

### We can nest describe functions to make it more scannable.

![Nested describe() functions](https://github.com/nugoo1/testing-with-node/blob/master/nested-describe-functions.PNG)

```
describe('Utils', () => {
    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(33,11);
            expect(res).toBe(44).toBeA('number');
        });
        
        it('should async add two numbers', (done) => {
            utils.asyncAdd(4, 3, (sum) => {
                expect(sum).toBe(7).toBeA('number')
                done();
            });
        });
    });
```


### Test Spies
Spies let you swap out a real function for a testing utility. When that test function gets called, we can make assertions about it, like being called with certain arguments.

```
const expect = require('expect');

describe('App', () => {
    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy();
        expect(spy).toHaveBeenCalled();
    });
});
```

You can also assert whether the spy() function was called with certain arguments:

```
    spy('Nuwan', 25);
    expect(spy).toHaveBeenCalledWith('Nuwan', 25);
```

### Simulating functions
Replace function with spies, so that when a function gets called, it is called with the spy.
This lets us assert that the spy function was called with certain arguments.

`npm i rewire@2.5.2 --save-dev`

```
const rewire = require('rewire');
```

rewire is used instead of require when you're loading in the file you want to mock out.

```
var app = rewire('./app');
```

This loads your file through require but it also adds two functions to to app.js.
These methods are:

```
app.__set__
app.__get__
```

We use these to mock out various data inside of app.js. Inside of the describe function;

```
    var db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);
  
    it('should call saveUser with user object', () => {
        var email = 'nuwan@example.com';
        var password = '123abc'

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password})
    });
});
```


