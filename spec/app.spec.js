process.env.NODE_ENV = "test";
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");
const knexConnection = require("../db/connection");
const request = supertest(app);

describe.only("/", () => {
  beforeEach(() => knexConnection.seed.run());
  after(() => {
    knexConnection.destroy();
  });

  describe("/api", () => {
    it("GET status:200", () => {
      return request
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
  });
  describe("/topics", () => {
    describe("DEFAULT BEHAVIOUR", () => {
      it("GET status:200", () => {
        return request.get("/api/topics").expect(200);
      });
      it("checks whether each topic object contains properties slug and description", () => {
        return request.get("/api/topics").then(res => {
          res.body.topics.forEach(topic => {
            expect(topic).to.contain.keys("slug", "description");
          });
        });
      });
      it("responds with an array of the topic objects", () => {
        return request
          .get("/api/topics")
          .expect(200)
          .then(res => {
            expect(res.body.topics).to.eql([
              {
                description: "The man, the Mitch, the legend",
                slug: "mitch"
              },
              {
                description: "Not dogs",
                slug: "cats"
              }
            ]);
          });
      });
    });
  });
  describe("/articles", () => {
    describe("DEFAULT BEHAVIOUR", () => {
      it("GET status:200", () => {
        return request.get("/api/articles").expect(200);
      });
      it("checks whether each article object contains properties author, title, article_id, topic, created_at, votes and comment_count", () => {
        return request.get("/api/articles").then(res => {
          res.body.articles.forEach(article => {
            expect(article).to.contain.keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
        });
      });
    });
  });
});
