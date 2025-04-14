// getDataAtPointer.spec.ts
import { test, expect } from '@playwright/test';
import { getDataAtPointer } from '../../src/lib/tools'; // Adjust the import path accordingly

const rootData = {
  number: 42,
  string: "hello",
  boolean: true,
  nullValue: null,
  object: {
    a: 1,
    b: "testStr",
    c: false,
    d: { nested: "deepNested" },
    empty: {}
  },
  array: [
    10,
    "arrItem",
    { key: "objKey" },
    [1, 2, 3],
    []
  ],
  nested: {
    level1: {
      level2: {
        level3: "deepValue",
        arr: [
          { sub: "subVal" },
          "arrayItem"
        ]
      }
    }
  },
  emptyArray: [],
  emptyObject: {}
};

test.describe('getDataAtPointer', () => {
  test('absolute pointer to primitive properties', () => {
    expect(getDataAtPointer(rootData, "", "/number")).toBe(42);
    expect(getDataAtPointer(rootData, "", "/string")).toBe("hello");
    expect(getDataAtPointer(rootData, "", "/boolean")).toBe(true);
    expect(getDataAtPointer(rootData, "", "/nullValue")).toBeNull();
  });

  test('absolute pointer to object properties', () => {
    expect(getDataAtPointer(rootData, "", "/object/a")).toBe(1);
    expect(getDataAtPointer(rootData, "", "/object/b")).toBe("testStr");
    expect(getDataAtPointer(rootData, "", "/object/d/nested")).toBe("deepNested");
  });

  test('absolute pointer to array elements', () => {
    expect(getDataAtPointer(rootData, "", "/array/0")).toBe(10);
    expect(getDataAtPointer(rootData, "", "/array/1")).toBe("arrItem");
    expect(getDataAtPointer(rootData, "", "/array/2/key")).toBe("objKey");
    expect(getDataAtPointer(rootData, "", "/array/3/1")).toBe(2);
    expect(getDataAtPointer(rootData, "", "/array/4")).toEqual([]);
  });

  test('relative pointer using "from" and "to"', () => {
    expect(getDataAtPointer(rootData, "/object", "b")).toBe("testStr");
    expect(getDataAtPointer(rootData, "/object/d", "nested")).toBe("deepNested");
    expect(getDataAtPointer(rootData, "/array/2", "key")).toBe("objKey");
    expect(getDataAtPointer(rootData, "/nested/level1", "level2/level3")).toBe("deepValue");
  });

  test('when "to" is not provided, use "from" pointer', () => {
    expect(getDataAtPointer(rootData, "/object/b")).toBe("testStr");
    expect(getDataAtPointer(rootData, "/array/0")).toBe(10);
  });

  // New test block for missing "to" argument:
  test('missing "to" arg returns data at the "from" pointer', () => {
    // Should return the object located at "/object".
    expect(getDataAtPointer(rootData, "/object")).toEqual({
      a: 1,
      b: "testStr",
      c: false,
      d: { nested: "deepNested" },
      empty: {}
    });
    // Should return the array element at "/array/3".
    expect(getDataAtPointer(rootData, "/array/3")).toEqual([1, 2, 3]);
    // Should return the object at "/nested/level1/level2".
    expect(getDataAtPointer(rootData, "/nested/level1/level2")).toEqual({
      level3: "deepValue",
      arr: [{ sub: "subVal" }, "arrayItem"]
    });
  });

  test('not found pointers return undefined', () => {
    expect(getDataAtPointer(rootData, "", "/nonexistent")).toBeUndefined();
    expect(getDataAtPointer(rootData, "/object", "z")).toBeUndefined();
    expect(getDataAtPointer(rootData, "/array", "10")).toBeUndefined();
  });

  test('edge cases: empty pointers', () => {
    // If both "from" and "to" are empty, the effective pointer is empty and should return root.
    expect(getDataAtPointer(rootData, "", "")).toEqual(rootData);
    // When "from" is empty and a relative pointer is used, it becomes "/<relative pointer>".
    expect(getDataAtPointer(rootData, "", "number")).toBe(42);
  });

  test('edge cases: empty arrays and empty objects', () => {
    expect(getDataAtPointer(rootData, "", "/emptyArray")).toEqual([]);
    expect(getDataAtPointer(rootData, "", "/emptyObject")).toEqual({});
  });

  test('nested combinations: object within array, array within object', () => {
    expect(getDataAtPointer(rootData, "", "/array/2/key")).toBe("objKey");
    const arr = getDataAtPointer(rootData, "", "/nested/level1/level2/arr");
    expect(Array.isArray(arr)).toBe(true);
    expect(arr[0].sub).toBe("subVal");
    expect(arr[1]).toBe("arrayItem");
    expect(getDataAtPointer(rootData, "/nested/level1/level2", "arr/1")).toBe("arrayItem");
  });
});
