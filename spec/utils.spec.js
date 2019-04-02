const { expect } = require("chai");

const {
  timeStampJSConversion,
  createRefObj
} = require("../utils/utilsFunctions");

describe.only("timeStampJSConversion", () => {
  it("converts the timestamp from the created_at column of a single article object to a date", () => {
    let oldObj = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    let newObj = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2018-11-15",
        votes: 100
      }
    ];
    expect(timeStampJSConversion(oldObj)).to.eql(newObj);
  });
  it("converts each timestamp from the created_at column of multiples article object to dates", () => {
    const oldObjs = [
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
    const newObjs = [
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
    expect(timeStampJSConversion(oldObjs)).to.eql(newObjs);
  });
});
