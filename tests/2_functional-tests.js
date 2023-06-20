const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.isStatus(res, 200);
          assert.isText(res, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .get('/hello')
        .end(function (err, res) {
          // Update the assertion to use isNotNull instead of assert.fail
          assert.isNotNull(res.status);
          assert.fail(res.text, 'hello Guest');
          done();
        });
    });
    
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        //.keepOpen()
        .put('/travellers')
        .send({surname: 'Colombo'})
        .end(function (err, res) {
         // assert.fail();
          done();
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      // assert.fail();
      chai
      .request(server)
      .put('/travellers')
      // instance.send({surname: 'da Verrazzano'})
      .send({surname: 'da Verrazzano'})
      .end(function (err, res) {
      done();})
    });
  });
});

const Browser = require('zombie');

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);

 let browser;
  suiteSetup(function (done) {
    browser = new Browser();
    // GET: browser.visit('http://localhost:3000')
    browser.visit('http://localhost:3000', done);
  });


  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
     
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('Submit the surname "Colombo" in the HTML form', function (done) {
      browser.fill('surname', 'Colombo');
      browser.pressButton('submit', done);

      done();
    });
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      browser.fill('surname', 'Vespucci');
      browser.pressButton('submit', done);

      done();
    });
  });
});
