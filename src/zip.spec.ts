import { collect, toIt } from "./index";
import { innerZip, zip } from "./zip";

describe("zip", () => {
    it("should zip two iterators together", () => {
        const items1 = toIt([1, 2, 3]);
        const items2 = toIt(["a", "b", "c", "d"]);
        const zipped = collect(zip(items1, items2));

        expect(zipped).toEqual([
            [1, "a", 0],
            [2, "b", 1],
            [3, "c", 2],
            [undefined, "d", 3],
        ]);
    });
});

describe("innerZip", () => {
    it("should zip two iterators together", () => {
        const items1 = toIt([1, 2, 3]);
        const items2 = toIt(["a", "b", "c", "d"]);
        const zipped = collect(innerZip(items1, items2));

        expect(zipped).toEqual([
            [1, "a", 0],
            [2, "b", 1],
            [3, "c", 2],
        ]);
    });
});
