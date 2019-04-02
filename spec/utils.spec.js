const { expect } = require("chai");

const {
  timeStampJSConversion,
  createRefObj
} = require("../utils/utilsFunctions");

describe.only("timeStampJSConversion", () => {
  it("converts the created_at column of a single article object to a date from timestamp", () => {
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
});
