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
    describe("DEFAULT BEHAVIOURS", () => {
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
    describe("QUERIES", () => {
      it("GET status: 200 and returns an array of articles written by a specific author", () => {
        return request
          .get("/api/articles?articles.author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).to.equal(3);
          });
      });
      it("GET status: 200 and returns an array of articles which have a specific topic", () => {
        return request
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.have.lengthOf(11);
          });
      });
      it("GET status: 200 and returns an array of articles sorted by a specified column", () => {
        return request
          .get("/api/articles?sort_by=title")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.eql({
              title: "Z",
              topic: "mitch",
              body: "I was hungry.",
              article_id: 7,
              author: "icellusedkars",
              created_at: "1994-11-21T00:00:00.000Z",
              votes: 0,
              comment_count: "0"
            });
          });
      });
      it("GET status: 200 returns array of articles in a specified order", () => {
        return request
          .get("/api/articles?order=desc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.eql({
              article_id: 1,
              title: "Living in the shadow of a great man",
              body: "I find this existence challenging",
              votes: 100,
              topic: "mitch",
              author: "butter_bridge",
              created_at: "2018-11-15T00:00:00.000Z",
              comment_count: "13"
            });
          });
      });
    });
    describe("/:article_id", () => {
      describe("DEFAULT BEHAVIOURS", () => {
        it("GET status:200 returns a single article object specified by article_id", () => {
          return request
            .get("/api/articles/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.eql({
                title: "Living in the shadow of a great man",
                topic: "mitch",
                body: "I find this existence challenging",
                article_id: 1,
                author: "butter_bridge",
                comment_count: "13",
                created_at: "2018-11-15T00:00:00.000Z",
                votes: 100
              });
            });
        });
        it("PATCH status:200 returns a single article object with a new vote value", () => {
          const input = { inc_votes: 1 };
          return request
            .patch("/api/articles//articles/1")
            .send(input)
            .expect(200);
        });
        it("PATCH status:200 and returns a single article object with an increased vote value when passed an objet with positive inc_votes value", () => {
          const input = { inc_votes: 1 };
          return request
            .patch("/api/articles//articles/1")
            .send(input)
            .expect(200)
            .then(({ body }) => {
              expect(body.updatedArticle).to.eql({
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 101,
                topic: "mitch",
                author: "butter_bridge",
                created_at: "2018-11-15T00:00:00.000Z"
              });
            });
        });
        it("PATCH status:200 and returns a single article object with a decreased vote value when passed an objet with positive inc_votes value", () => {
          const input = { inc_votes: -50 };
          return request
            .patch("/api/articles//articles/1")
            .send(input)
            .expect(200)
            .then(({ body }) => {
              expect(body.updatedArticle).to.eql({
                article_id: 1,
                title: "Living in the shadow of a great man",
                body: "I find this existence challenging",
                votes: 50,
                topic: "mitch",
                author: "butter_bridge",
                created_at: "2018-11-15T00:00:00.000Z"
              });
            });
        });
      });
    });
  });
});
