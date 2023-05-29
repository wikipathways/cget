import { dirname } from "path";
import { Cache } from "./Cache.js";
import { fileURLToPath } from "url";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 1000;

const sharedCache = new Cache("cache/xsd", {
  indexName: "_index.xsd"
});

describe.only("Cache", () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  test(`Cache instance is object`, () => {
    expect(typeof sharedCache).toBe("object");
  });

  const remoteFileUrl =
    "https://clinicaltrials.gov/ct2/html/images/info/public.xsd";
  const localFileUrl = `file://${__dirname}/../test/input/dir-example.xsd`;

  [remoteFileUrl, localFileUrl].forEach(function (urlRemote) {
    test(`cache.fetch: ${urlRemote} w/ allowLocal enabled`, async () => {
      const options = {
        allowLocal: true
      };

      const cached = await sharedCache.fetch(urlRemote, options);

      expect(typeof cached).toBe("object");
      expect(typeof cached.address).toBe("object");
      expect(typeof cached.headers).toBe("object");
      expect(typeof cached.stream).toBe("object");
    });
  });

  [remoteFileUrl].forEach(function (urlRemote) {
    test(`cache.fetch: ${urlRemote} w/ allowLocal disabled`, async () => {
      const cache = new Cache("cache/xsd", {
        indexName: "_index.xsd"
      });
      const options = {};

      const cached = await cache.fetch(urlRemote, options);

      expect(typeof cached).toBe("object");
      expect(typeof cached.address).toBe("object");
      expect(typeof cached.headers).toBe("object");
      expect(typeof cached.stream).toBe("object");
      expect(cached.status).toBe(200);
    });
  });

  [localFileUrl].forEach(function (urlRemote) {
    test(`cache.fetch: ${urlRemote} w/ allowLocal disabled`, async () => {
      expect.assertions(2);

      const cache = new Cache("cache/xsd", {
        indexName: "_index.xsd"
      });
      const options = {};

      try {
        return await cache.fetch(urlRemote, options);
      } catch (e) {
        const errorString = e?.toString() as string;
        const firstExpectedChunk = "Error: Access denied to url file://";
        const lastExpectedChunk = "/cget/test/input/dir-example.xsd";
        expect(errorString.substring(0, firstExpectedChunk.length)).toMatch(
          firstExpectedChunk
        );
        expect(errorString.substring(-1 * lastExpectedChunk.length)).toMatch(
          lastExpectedChunk
        );
      }
    });
  });
});
