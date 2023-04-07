import * as cget from "../../dist/cget";

const cache = new cget.Cache("http://google.com");

test("cache exists", () => {
  expect(typeof cache).toBe("object");
});

test("cache.fetch => 200", () => {
  expect.assertions(2);
  return cache.fetch("http://google.com/index.html").then(function (res) {
    expect(typeof res).toBe("object");
    expect(res.status).toBe(200);
  });
});
