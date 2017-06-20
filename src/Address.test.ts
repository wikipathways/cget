import { sanitizeUrl, sanitizePath, Address } from "./Address";

[
  {
    input: "http://www.wikipathways.org",
    expected: "http://www.wikipathways.org/"
  },
  {
    input: "http://www.wikipathways.org/",
    expected: "http://www.wikipathways.org/"
  },
  {
    input: "http://www.w3.org/2001/XMLSchema",
    expected: "http://www.w3.org/2001/XMLSchema"
  },
  {
    input: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    expected: "http://www.w3.org/1999/02/22-rdf-syntax-ns"
  },
  {
    input: "http://www.w3.org/2002/07/owl#",
    expected: "http://www.w3.org/2002/07/owl"
  },
  {
    input: "http://www.biopax.org/release/biopax-level3.owl#",
    expected: "http://www.biopax.org/release/biopax-level3.owl"
  },
  {
    input: "http://pathvisio.org/GPML/2013a",
    expected: "http://pathvisio.org/GPML/2013a"
  }
].forEach(function({ input, expected }) {
  test(`sanitizeUrl: ${input}`, () => {
    expect(sanitizeUrl(input)).toBe(expected);
  });
});

[
  {
    input: "../package.json",
    expected: "package.json"
  },
  {
    input: "file://../package.json",
    expected: "file/package.json"
  },
  {
    input: "urn://package.json",
    expected: "urn/package.json"
  },
  {
    input: "http://www.wikipathways.org",
    expected: "http/www.wikipathways.org"
  },
  {
    input: "http://www.wikipathways.org/",
    expected: "http/www.wikipathways.org"
  },
  {
    input: "http://www.w3.org/2001/XMLSchema",
    expected: "http/www.w3.org/2001/XMLSchema"
  },
  {
    input: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    expected: "http/www.w3.org/1999/02/22-rdf-syntax-ns"
  },
  {
    input: "http://www.w3.org/2002/07/owl#",
    expected: "http/www.w3.org/2002/07/owl"
  },
  {
    input: "http://www.biopax.org/release/biopax-level3.owl#",
    expected: "http/www.biopax.org/release/biopax-level3.owl"
  },
  {
    input: "http://pathvisio.org/GPML/2013a",
    expected: "http/pathvisio.org/GPML/2013a"
  }
].forEach(function({ input, expected }) {
  test(`sanitizePath: ${input}`, () => {
    expect(sanitizePath(input)).toBe(expected);
  });
});

[
  {
    input: "../package.json",
    expected: {
      isLocal: true,
      path: "/Users/andersriutta/Documents/package.json",
      uri: "file:///Users/andersriutta/Documents/package.json",
      url: "file:///Users/andersriutta/Documents/package.json",
      urn: null
    }
  },
  {
    input: "file://../package.json",
    expected: {
      isLocal: true,
      path: "/package.json",
      uri: "file:///package.json",
      url: "file:///package.json",
      urn: null
    }
  },
  {
    input: "urn://package.json",
    expected: {
      isLocal: false,
      path: "package.json",
      uri: "urn://package.json",
      url: null,
      urn: "urn://package.json"
    }
  },
  {
    input: "http://www.wikipathways.org",
    expected: {
      isLocal: false,
      path: "www.wikipathways.org",
      uri: "http://www.wikipathways.org/",
      url: "http://www.wikipathways.org/",
      urn: null
    }
  },
  {
    input: "http://www.wikipathways.org/",
    expected: {
      isLocal: false,
      path: "www.wikipathways.org",
      uri: "http://www.wikipathways.org/",
      url: "http://www.wikipathways.org/",
      urn: null
    }
  },
  {
    input: "http://www.w3.org/2001/XMLSchema",
    expected: {
      isLocal: false,
      path: "www.w3.org/2001/XMLSchema",
      uri: "http://www.w3.org/2001/XMLSchema",
      url: "http://www.w3.org/2001/XMLSchema",
      urn: null
    }
  },
  {
    input: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    expected: {
      isLocal: false,
      path: "www.w3.org/1999/02/22-rdf-syntax-ns",
      uri: "http://www.w3.org/1999/02/22-rdf-syntax-ns",
      url: "http://www.w3.org/1999/02/22-rdf-syntax-ns",
      urn: null
    }
  },
  {
    input: "http://www.w3.org/2002/07/owl#",
    expected: {
      isLocal: false,
      path: "www.w3.org/2002/07/owl",
      uri: "http://www.w3.org/2002/07/owl",
      url: "http://www.w3.org/2002/07/owl",
      urn: null
    }
  },
  {
    input: "http://www.biopax.org/release/biopax-level3.owl#",
    expected: {
      isLocal: false,
      path: "www.biopax.org/release/biopax-level3.owl",
      uri: "http://www.biopax.org/release/biopax-level3.owl",
      url: "http://www.biopax.org/release/biopax-level3.owl",
      urn: null
    }
  },
  {
    input: "http://pathvisio.org/GPML/2013a",
    expected: {
      isLocal: false,
      path: "pathvisio.org/GPML/2013a",
      uri: "http://pathvisio.org/GPML/2013a",
      url: "http://pathvisio.org/GPML/2013a",
      urn: null
    }
  }
].forEach(function({ input, expected }) {
  test(`Address for ${input}`, () => {
    expect(new Address(input)).toEqual(expected);
  });
});

[
  {
    input: "../package.json",
    expected: {
      isLocal: true,
      path: "/Users/me/package.json",
      uri: "file:///Users/me/package.json",
      url: "file:///Users/me/package.json",
      urn: null
    }
  },
  {
    input: "file://../package.json",
    expected: {
      isLocal: true,
      path: "/package.json",
      uri: "file:///package.json",
      url: "file:///package.json",
      urn: null
    }
  },
  {
    input: "urn://package.json",
    expected: {
      isLocal: false,
      path: "package.json",
      uri: "urn://package.json",
      url: null,
      urn: "urn://package.json"
    }
  },
  {
    input: "http://www.wikipathways.org",
    expected: {
      isLocal: false,
      path: "www.wikipathways.org",
      uri: "http://www.wikipathways.org/",
      url: "http://www.wikipathways.org/",
      urn: null
    }
  },
  {
    input: "http://www.wikipathways.org/",
    expected: {
      isLocal: false,
      path: "www.wikipathways.org",
      uri: "http://www.wikipathways.org/",
      url: "http://www.wikipathways.org/",
      urn: null
    }
  },
  {
    input: "http://www.w3.org/2001/XMLSchema",
    expected: {
      isLocal: false,
      path: "www.w3.org/2001/XMLSchema",
      uri: "http://www.w3.org/2001/XMLSchema",
      url: "http://www.w3.org/2001/XMLSchema",
      urn: null
    }
  },
  {
    input: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    expected: {
      isLocal: false,
      path: "www.w3.org/1999/02/22-rdf-syntax-ns",
      uri: "http://www.w3.org/1999/02/22-rdf-syntax-ns",
      url: "http://www.w3.org/1999/02/22-rdf-syntax-ns",
      urn: null
    }
  },
  {
    input: "http://www.w3.org/2002/07/owl#",
    expected: {
      isLocal: false,
      path: "www.w3.org/2002/07/owl",
      uri: "http://www.w3.org/2002/07/owl",
      url: "http://www.w3.org/2002/07/owl",
      urn: null
    }
  },
  {
    input: "http://www.biopax.org/release/biopax-level3.owl#",
    expected: {
      isLocal: false,
      path: "www.biopax.org/release/biopax-level3.owl",
      uri: "http://www.biopax.org/release/biopax-level3.owl",
      url: "http://www.biopax.org/release/biopax-level3.owl",
      urn: null
    }
  },
  {
    input: "http://pathvisio.org/GPML/2013a",
    expected: {
      isLocal: false,
      path: "pathvisio.org/GPML/2013a",
      uri: "http://pathvisio.org/GPML/2013a",
      url: "http://pathvisio.org/GPML/2013a",
      urn: null
    }
  }
].forEach(function({ input, expected }) {
  const cwd = "/Users/me/Documents";
  test(`Address for ${input} & ${cwd}`, () => {
    expect(new Address(input, cwd)).toEqual(expected);
  });
});
