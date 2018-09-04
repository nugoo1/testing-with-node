const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {
    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(33, 11);
            expect(res).toBe(44).toBeA('number');
        });

        it('should async add two numbers', (done) => {
            utils.asyncAdd(4, 3, (sum) => {
                expect(sum).toBe(7).toBeA('number')
                done();
            });
        });
    });
    describe('#square', () => {
        it('should square a number', () => {
            var res = utils.square(3);
            expect(res).toBe(9).toBeA('number');
        });

        it('should square a number', (done) => {
            utils.asyncSquare(5, (sum) => {
                expect(sum).toBe(25).toBeA('number');
                done();
            });
        });
    });
    describe('#response body', () => {
        it('should verify first and last names are set', () => {
            var user = { age: 25, location: 'Colombo' };
            var res = utils.setName(user, 'Nuwan Goonewardena');
        
            expect(res).toBeAn('object');
            expect(res).toInclude({
                firstName: 'Nuwan',
                lastName: 'Goonewardena'
            });
        });
    });
});

