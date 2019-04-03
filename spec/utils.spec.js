const { expect } = require("chai");

const {
  timeStampJSConversion,
  createKeyPairs,
  createdByToAuth
} = require("../utils/utilsFunctions");

describe.only("utils function tests", () => {
  describe("timeStampJSConversion", () => {
    it("converts the timestamp from the created_at column of a single article object to a date", () => {
      const input = [
        {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: 1542284514171,
          votes: 100
        }
      ];
      const output = [
        {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2018-11-15",
          votes: 100
        }
      ];
      expect(timeStampJSConversion(input)).to.eql(output);
    });
    it("converts each timestamp from the created_at column of multiples article object to dates", () => {
      const input = [
        {
          title: "22 Amazing open source React projects",
          topic: "coding",
          author: "happyamy2016",
          body:
            "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
          created_at: "2017-07-21"
        },
        {
          title: "Making sense of Redux",
          topic: "coding",
          author: "jessjelly",
          body:
            "When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).",
          created_at: "2017-12-24"
        },
        {
          title: "Please stop worrying about Angular 3",
          topic: "coding",
          author: "jessjelly",
          body:
            "Another Angular version planned already? Whaaaat? Didn’t Angular 2 just ship? Why Angular 3? What? Why? First off, there is no massive rewrite, and won’t be for Angular 3. Secondly, let me explain the future of Angular 2 and what Angular 3, Angular 4 will mean for you.",
          created_at: "2016-10-24"
        }
      ];
      const output = [
        {
          title: "22 Amazing open source React projects",
          topic: "coding",
          author: "happyamy2016",
          body:
            "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.",
          created_at: "2017-07-21"
        },
        {
          title: "Making sense of Redux",
          topic: "coding",
          author: "jessjelly",
          body:
            "When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).",
          created_at: "2017-12-24"
        },
        {
          title: "Please stop worrying about Angular 3",
          topic: "coding",
          author: "jessjelly",
          body:
            "Another Angular version planned already? Whaaaat? Didn’t Angular 2 just ship? Why Angular 3? What? Why? First off, there is no massive rewrite, and won’t be for Angular 3. Secondly, let me explain the future of Angular 2 and what Angular 3, Angular 4 will mean for you.",
          created_at: "2016-10-24"
        }
      ];
      expect(timeStampJSConversion(input)).to.eql(output);
    });
  });
  describe("createKeyPairs", () => {
    it("returns a new reference object with the title and id as key-value pairs when passed one object in the array", () => {
      const input = [
        {
          article_id: 1,
          title: "First article",
          body: "Sample text"
        }
      ];
      const output = {
        "First article": 1
      };
      expect(createKeyPairs(input)).to.eql(output);
    });
    it("returns a new reference object with the title and id as key-value pairs when passed more than object in the array", () => {
      const input = [
        {
          article_id: 1,
          title: "First article",
          body: "Sample text"
        },
        {
          article_id: 2,
          title: "Second article",
          body: "Sample text Two"
        }
      ];
      const output = {
        "First article": 1,
        "Second article": 2
      };
      expect(createKeyPairs(input)).to.eql(output);
      const input2 = [
        {
          article_id: 1,
          title: "They're not exactly dogs, are they?",
          topic: "mitch",
          author: "butter_bridge",
          body: "Well? Think about it.",
          created_at: 533132514171
        },
        {
          article_id: 2,
          title: "Seven inspirational thought leaders from Manchester UK",
          topic: "mitch",
          author: "rogersop",
          body: "Who are we kidding, there is only one, and it's Mitch!",
          created_at: 406988514171
        },
        {
          article_id: 3,
          title: "Am I a cat?",
          topic: "mitch",
          author: "icellusedkars",
          body:
            "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
          created_at: 280844514171
        },
        {
          article_id: 4,
          title: "Moustache",
          topic: "mitch",
          author: "butter_bridge",
          body: "Have you seen the size of that thing?",
          created_at: 154700514171
        }
      ];
      const output2 = {
        "They're not exactly dogs, are they?": 1,
        "Seven inspirational thought leaders from Manchester UK": 2,
        "Am I a cat?": 3,
        Moustache: 4
      };
      expect(createKeyPairs(input2)).to.eql(output2);
    });
    describe("createdByToAuth", () => {
      it("converts the column name created by to author for an object with one comment", () => {
        const input = [
          {
            body: "sample text",
            belongs_to:
              "The People Tracking Every Touch, Pass And Tackle in the World Cup",
            created_by: "tickle122"
          }
        ];
        const output = [
          {
            body: "sample text",
            belongs_to:
              "The People Tracking Every Touch, Pass And Tackle in the World Cup",
            author: "tickle122"
          }
        ];
        expect(createdByToAuth(input)).to.eql(output);
      });
    });
  });
});
