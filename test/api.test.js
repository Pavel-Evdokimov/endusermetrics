const request = require("supertest");
const expect = require("chai").expect();
const app = require("../app");

describe("#api test", () => {
    it("/", done => {
        request(app)
            .get("/")
            .expect(200)
            .end((err, res) => {
                done(err);
            });
    });

    it("/404", done => {
        request(app)
            .get("/404")
            .expect(404)
            .end((err, res) => {
                done(err);
            });
    });

    it("/metrics", done => {
        request(app)
            .post("/metrics")
            .send(JSON.stringify({ test: "john" }))
            .expect(200)
            .end((err, res) => {
                done(err);
            });
    });
    // TODO: Разобраться, как передавать аналог sendBeacon через post
    it.skip("/metrics/performance", done => {
        request(app)
            .post("/metrics/performance")
            .set('Content-Type', 'text/html')
            .send(JSON.stringify({ test: "john" }))
            .expect(200)
            .end((err, res) => {
                done(err);
            });
    });

    it("/metrics/errors", done => {
        request(app)
            .post("/errors")
            .send(JSON.stringify({ test: "error" }))
            .expect(200)
            .end((err, res) => {
                done(err);
            });
    });
});
