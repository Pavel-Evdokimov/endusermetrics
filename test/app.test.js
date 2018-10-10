const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

describe("#api", () => {
  it("/", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        done();
      });
  });

  it("/metrics", done => {
    chai
      .request(app)
      .post("/metrics")
      .type("text")
      .send(JSON.stringify({ test: "" }))
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("/metrics/performance", done => {
    chai
      .request(app)
      .post("/metrics/performance")
      .type("text")
      .send(JSON.stringify({ test: "" }))
      .then(res => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
