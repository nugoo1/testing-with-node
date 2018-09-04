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