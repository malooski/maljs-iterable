import { forEach, map, filter, toIt, collect, take, toSet, uniq } from "./base";

describe("forEach", () => {
    it("should call the given function for each item in the iterator", () => {
        const items = toIt([1, 2, 3]);
        const fn = jest.fn();

        forEach(items, fn);

        expect(fn).toHaveBeenCalledTimes(3);
        expect(fn).toHaveBeenNthCalledWith(1, 1, 0);
        expect(fn).toHaveBeenNthCalledWith(2, 2, 1);
        expect(fn).toHaveBeenNthCalledWith(3, 3, 2);
    });
});

describe("map", () => {
    it("should map iterator items using the given function", () => {
        const items = toIt([1, 2, 3]);
        const mapped = collect(map(items, (x) => x * 2));

        expect(mapped).toEqual([2, 4, 6]);
    });
});

describe("filter", () => {
    it("should filter iterator items using the given function", () => {
        const items = toIt([1, 2, 3, 4]);
        const filtered = collect(filter(items, (x) => x % 2 === 0));

        expect(filtered).toEqual([2, 4]);
    });
});

describe("toIt", () => {
    it("should convert an array to an iterator", () => {
        const items = [1, 2, 3];
        const iterator = toIt(items);

        expect(typeof iterator.next).toBe("function");
    });
});

describe("collect", () => {
    it("should collect iterator items into an array", () => {
        const iterator = toIt([1, 2, 3]);
        const result = collect(iterator);

        expect(result).toEqual([1, 2, 3]);
    });
});

describe("take", () => {
    it("should take the first n items from the iterator", () => {
        const items = toIt([1, 2, 3, 4, 5]);
        const taken = collect(take(items, 3));

        expect(taken).toEqual([1, 2, 3]);
    });
});

describe("toSet", () => {
    it("should convert an iterator to a set", () => {
        const items = toIt([1, 2, 3, 3, 2, 1]);
        const set = toSet(items);

        expect(set).toEqual(new Set([1, 2, 3]));
    });
});

describe("uniq", () => {
    it("should remove duplicate items from the iterator", () => {
        const items = toIt([1, 2, 3, 3, 2, 1]);
        const unique = collect(uniq(items));

        expect(unique).toEqual([1, 2, 3]);
    });
});
