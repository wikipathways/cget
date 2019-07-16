import { FetchOptions, Cache, CacheResult } from "./Cache";
const path = require("path");

const PARENT_DIR = path.resolve("../");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;

const sharedCache = new Cache("cache/xsd", {
  indexName: "_index.xsd"
});

test(`Cache instance is object`, () => {
  expect(typeof sharedCache).toBe("object");
});

[
  "https://cdn.rawgit.com/ariutta/GPML/e869fe1dcd824348bc4e00ef283547ff8b7b371c/GPML2013a.xsd",
  `file://${__dirname}/../test/input/dir-example.xsd`
].forEach(function(urlRemote) {
  test(`cache.fetch: ${urlRemote} w/ allowLocal enabled`, done => {
    const options = {
      allowLocal: true
    };

    expect.assertions(4);
    sharedCache
      .fetch(urlRemote, options)
      .then((cached: CacheResult) => {
        expect(typeof cached).toBe("object");
        expect(typeof cached.address).toBe("object");
        expect(typeof cached.headers).toBe("object");
        expect(typeof cached.stream).toBe("object");
        done();
      })
      .catch(done);
  });
});

[
  "https://cdn.rawgit.com/ariutta/GPML/e869fe1dcd824348bc4e00ef283547ff8b7b371c/GPML2013a.xsd"
].forEach(function(urlRemote) {
  test(`cache.fetch: ${urlRemote} w/ allowLocal disabled`, done => {
    const cache = new Cache("cache/xsd", {
      indexName: "_index.xsd"
    });
    const options = {};

    expect.assertions(5);
    cache
      .fetch(urlRemote, options)
      .then((cached: CacheResult) => {
        expect(typeof cached).toBe("object");
        expect(typeof cached.address).toBe("object");
        expect(typeof cached.headers).toBe("object");
        expect(typeof cached.stream).toBe("object");
        expect(cached.status).toBe(200);
        done();
      })
      .catch(done);
  });
});

[`file://${__dirname}/../test/input/dir-example.xsd`].forEach(function(
  urlRemote
) {
  test(`cache.fetch: ${urlRemote} w/ allowLocal disabled`, () => {
    expect.assertions(1);

    const cache = new Cache("cache/xsd", {
      indexName: "_index.xsd"
    });
    const options = {};

    return cache.fetch(urlRemote, options).catch(e => {
      expect(e.toString()).toMatch(
        `Error: Access denied to url file://${PARENT_DIR}/cget/test/input/dir-example.xsd`
      );
    });
  });
});
