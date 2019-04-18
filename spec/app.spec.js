process.env.NODE_ENV = "test";
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");
const knexConnection = require("../db/connection");
const request = supertest(app);

describe("/", () => {
  beforeEach(() => knexConnection.seed.run());
  after(() => {
    knexConnection.destroy();
  });

  describe("/api", () => {
    describe("/topics", () => {
      describe("DEFAULT BEHAVIOR", () => {
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
      describe("ERROR HANDLING", () => {
        it("BAD METHOD status:405, returns error message when using a method not allowed", () => {
          return request
            .delete("/api/topics")
            .expect(405)
            .then(res => {
              expect(res.body.msg).to.equal("Method Not Allowed");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("DEFAULT BEHAVIOR", () => {
        it("GET status:200", () => {
          return request.get("/api/articles").expect(200);
        });
        it("checks whether each article object contains properties author, title, article_id, topic, created_at, votes and comment_count", () => {
          return request.get("/api/articles").then(res => {
            res.body.articles.forEach(article => {
              expect(article).to.contain.keys(
                "username",
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
            .then(res => {
              expect(res.body.articles.length).to.equal(3);
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
                username: "icellusedkars",
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
                username: "butter_bridge",
                created_at: "2018-11-15T00:00:00.000Z",
                comment_count: "13"
              });
            });
        });

        describe("/:article_id", () => {
          describe("DEFAULT BEHAVIOURS", () => {
            it("GET status:200 returns a single article object specified by article_id", () => {
              return request
                .get("/api/articles/1")
                .expect(200)
                .then(({ body }) => {
                  expect(body[0]).to.eql({
                    author: "butter_bridge",
                    title: "Living in the shadow of a great man",
                    article_id: 1,
                    topic: "mitch",
                    created_at: "2018-11-15T00:00:00.000Z",
                    votes: 100,
                    body: "I find this existence challenging",
                    comment_count: "13"
                  });
                });
            });
            it("PATCH status:200 returns a single article object with a new vote value", () => {
              const input = { inc_votes: 1 };
              return request
                .patch("/api/articles/1")
                .send(input)
                .expect(200);
            });
            it("PATCH status:200 and returns a single article object with an increased vote value when passed an object with positive inc_votes value", () => {
              const input = { inc_votes: 1 };
              return request
                .patch("/api/articles/1")
                .send(input)
                .expect(200)
                .then(({ body }) => {
                  expect(body.updatedArticle[0]).to.eql({
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
            it("PATCH status:200 and returns a single article object with a decreased vote value when passed an object with positive inc_votes value", () => {
              const input = { inc_votes: -50 };
              return request
                .patch("/api/articles/1")
                .send(input)
                .expect(200)
                .then(({ body }) => {
                  expect(body.updatedArticle[0]).to.eql({
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
            it("DELETE status:204, deletes the article and returns status 204 only", () => {
              return request
                .delete("/api/articles/4")
                .expect(204)
                .then(({ body }) => {
                  expect(body).to.eql({});
                });
            });
            it("GET status:200", () => {
              return request.get("/api/articles/5/comments").expect(200);
            });
            it("GET status:200 and returns comments for a single article object specified by article_id", () => {
              return request
                .get("/api/articles/5/comments")
                .expect(200)
                .then(({ body }) => {
                  expect(body.comments).to.eql([
                    {
                      comment_id: 14,
                      votes: 16,
                      created_at: "2004-11-25T00:00:00.000Z",
                      author: "icellusedkars",
                      body:
                        "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge."
                    },
                    {
                      comment_id: 15,
                      votes: 1,
                      created_at: "2003-11-26T00:00:00.000Z",
                      author: "butter_bridge",
                      body: "I am 100% sure that we're not completely sure."
                    }
                  ]);
                });
            });
            it("POST status:201", () => {
              const input = {
                author: "butter_bridge",
                body: "test for posting to /api/articles/5/comments"
              };
              return request
                .post("/api/articles/5/comments")
                .send(input)
                .expect(201)
                .then(res => {
                  expect(res.body.comment.body).to.eql(
                    "test for posting to /api/articles/5/comments"
                  );
                });
            });
          });
          it("GET status:400 responds with error message when request is made with an invalid article ID", () => {
            return request
              .get("/api/articles/abc")
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("Bad Request");
              });
          });
        });
        describe("QUERIES", () => {
          it("GET status:200 and returns comments for a single article object specified by article_id and sorted by a specified column", () => {
            return request
              .get("/api/articles/1/comments?sort_by=votes")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments[0]).to.eql({
                  comment_id: 3,
                  votes: 100,
                  created_at: "2015-11-23T00:00:00.000Z",
                  author: "icellusedkars",
                  body:
                    "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
                });
              });
          });
          it("GET status: 200 and returns array of comments in a specified order", () => {
            return request
              .get("/api/articles/1/comments?order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments[0]).to.eql({
                  comment_id: 18,
                  votes: 16,
                  created_at: "2000-11-26T00:00:00.000Z",
                  author: "butter_bridge",
                  body: "This morning, I showered for nine minutes."
                });
              });
          });
          it("GET status:200 and returns comments for a single article object specified by article_id", () => {
            return request
              .get("/api/articles/5/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.eql([
                  {
                    comment_id: 14,
                    votes: 16,
                    created_at: "2004-11-25T00:00:00.000Z",
                    author: "icellusedkars",
                    body:
                      "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge."
                  },
                  {
                    comment_id: 15,
                    votes: 1,
                    created_at: "2003-11-26T00:00:00.000Z",
                    author: "butter_bridge",
                    body: "I am 100% sure that we're not completely sure."
                  }
                ]);
              });
          });
        });
      });
      describe("ERROR HANDLING", () => {
        it("BAD METHOD status:405, returns error message when using a method not allowed", () => {
          return request
            .delete("/api/articles")
            .expect(405)
            .then(res => {
              expect(res.body.msg).to.equal("Method Not Allowed");
            });
        });
        it("NOT FOUND status 404, returns an error when cannot find specific author", () => {
          return request
            .get("/api/articles?articles.author=bal_shergill")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Resource Not Found");
            });
        });
        it("NOT FOUND status 404, returns an error message when cannot find specific article", () => {
          return request
            .get("/api/articles/80")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Resource Not Found");
            });
        });
        it("BAD REQUEST status 400, returns an error message when trying to sort by a column which doesn't exist", () => {
          return request
            .get("/api/articles?sort_by=votess")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
        it("NOT FOUND status:404, returns error when trying to get comments by non-existent article ID", () => {
          return request
            .get("/api/articles/300/comments")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Resource Not Found");
            });
        });
        it("NOT FOUND status:404, returns error when trying to post a comment by non-existent article ID", () => {
          const input = {
            author: "butter_bridge",
            body: "hello"
          };
          return request
            .post("/api/articles/300/comments")
            .send(input)
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Resource Not Found");
            });
        });
        it("NOT FOUND status 404, returns an error message when post request does not contain enough data", () => {
          const input = {
            comment: "test for posting to /api/articles/10/comments"
          };
          return request
            .post("/api/articles/10/comments")
            .send(input)
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Resource Not Found");
            });
        });
        it("BAD REQUEST status:400, returns error when post request has right data but lengths of 0", () => {
          const input = {
            author: "butter_bridge",
            body: ""
          };
          return request
            .post("/api/articles/10/comments")
            .send(input)
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Resource Not Found");
            });
        });

        it("NOT FOUND status 404, returns an error message when cannot find specific article to patch", () => {
          const input = { inc_votes: 1 };
          return request
            .patch("/api/articles/200")
            .send(input)
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("Resource Not Found");
            });
        });
        it("BAD REQUEST status:400, returns error when trying to patch anything but the votes", () => {
          const input = { inc_votes: 1, body: "should fail" };
          return request
            .patch("/api/articles/1")
            .send(input)
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });

        it("BAD REQUEST status:400, returns error vote value is not a type of number", () => {
          const input = {
            inc_votes: "one"
          };
          return request
            .patch("/api/articles/1")
            .send(input)
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });

        it("METHOD NOT ALLOWED status:405, returns error message when trying to patch, put or delete all articles", () => {
          const input = {
            inc_votes: "1"
          };
          return request
            .patch("/api/articles")
            .send(input)
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).to.equal("Method Not Allowed");
            });
        });
        it("BAD REQUEST status 400, returns an error message when trying to get comments but article id is not correct format", () => {
          return request
            .get("/api/articles/one/comments")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
        it("NOT FOUND status:404, returns error when trying to get comments by non-existent article ID", () =>
          request
            .get("/api/articles/300/comments")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Resource Not Found");
            }));
        it("BAD REQUEST status:400, returns error when trying to sort by nonexistent column", () =>
          request
            .get("/api/articles/1/comments?sort_by=size")
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            }));
      });
    });
    describe("/comments", () => {
      describe("DEFAULT BEHAVIOR", () => {
        it("PATCH status:200", () => {
          const input = { inc_votes: 1 };
          return request
            .patch("/api/comments/1")
            .send(input)
            .expect(200);
        });
        it("PATCH status:200 and returns a single article object with an increased vote value when passed an objet with positive inc_votes value", () => {
          const input = { inc_votes: 1 };
          return request
            .patch("/api/comments/1")
            .send(input)
            .expect(200)
            .then(({ body }) => {
              expect(body.updatedComment).to.eql({
                comment_id: 1,
                author: "butter_bridge",
                article_id: 9,
                votes: 17,
                created_at: "2017-11-22T00:00:00.000Z",
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
              });
            });
        });
        it("DELETE status:204, deletes the comment, and returns status 204 only", () => {
          return request
            .delete("/api/comments/4")
            .expect(204)
            .then(({ body }) => {
              expect(body).to.eql({});
            });
        });
      });
      describe("ERROR HANDLING", () => {
        it("NOT FOUND status:404, returns error when specific comment cannot be found to patch", () => {
          return request
            .patch("/api/comments/300")
            .send({ inc_votes: 1 })
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Resource Not Found");
            });
        });
        it("BAD REQUEST status:400, returns error when trying to patch anything but the votes", () => {
          return request
            .patch("/api/comments/1")
            .send({ inc_votes: 1, body: "should fail" })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
        it("BAD REQUEST status:400, returns error vote value is not a type of number", () => {
          const input = {
            inc_votes: "one"
          };
          return request
            .patch("/api/comments/1")
            .send(input)
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal("Bad Request");
            });
        });
        it("NOT FOUND status:404, returns error when specific comment cannot be found to be deleted", () => {
          return request
            .delete("/api/comments/100")
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).to.equal("Resource Not Found");
            });
        });
      });
    });
    describe("/users", () => {
      describe("DEFAULT BEHAVIOR", () => {
        it("GET status:200 and returns a single user object specified by username", () => {
          return request
            .get("/api/users/icellusedkars")
            .expect(200)
            .then(({ body }) => {
              expect(body.user).to.eql({
                avatar_url:
                  "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
                name: "sam",
                username: "icellusedkars"
              });
            });
        });
      });
    });
  });
});
