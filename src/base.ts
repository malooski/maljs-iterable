export function forEach<T>(items: Iterator<T>, fn: (item: T, idx: number) => void): void {
    let idx = 0;
    let it = items.next();
    while (!it.done) {
        fn(it.value, idx);

        idx++;
        it = items.next();
    }
}

/**
 * Maps an iterator to another iterator.
 * @param items
 * @param fn The mapping function.
 *
 * @param T_Input The type of the input iterator.
 * @param T_Output The type of the output iterator.
 *
 * @example
 * const input = toIt([1, 2, 3]);
 * const output = map(input, x => x * 2);
 * expectEqual(output, [2, 4, 6]);
 */
export function* map<T_Input, T_Output>(
    items: Iterator<T_Input>,
    fn: (item: T_Input, idx: number) => T_Output
): Iterator<T_Output> {
    let idx = 0;
    let it = items.next();
    while (!it.done) {
        yield fn(it.value, idx);

        idx++;
        it = items.next();
    }
}

export function* filter<T>(items: Iterator<T>, fn: (item: T, idx: number) => boolean): Iterator<T> {
    let idx = 0;
    let it = items.next();
    while (!it.done) {
        if (fn(it.value, idx)) {
            yield it.value;
        }

        idx++;
        it = items.next();
    }
}

/**
 * Converts an array into an iterator.
 * @param items
 * @returns
 */
export function toIt<T>(items: T[]): Iterator<T> {
    return items[Symbol.iterator]();
}

/**
 * Collects all items from an iterator into an array.
 * @param items
 * @returns
 */
export function collect<T>(items: Iterator<T>): T[] {
    const result: T[] = [];
    let it = items.next();
    while (!it.done) {
        result.push(it.value);

        it = items.next();
    }

    return result;
}

/**
 * Takes the first n items from an iterator.
 * @param items
 * @param count
 */
export function* take<T>(items: Iterator<T>, count: number): Iterator<T> {
    let idx = 0;
    let it = items.next();
    while (!it.done && idx < count) {
        yield it.value;

        it = items.next();
        idx++;
    }
}

export function toSet<T>(items: Iterator<T>): Set<T> {
    const result = new Set<T>();
    forEach(items, (item) => result.add(item));
    return result;
}

export function* uniq<T>(items: Iterator<T>): Iterator<T> {
    const seen = new Set();
    let it = items.next();

    while (!it.done) {
        if (!seen.has(it.value)) {
            yield it.value;
            seen.add(it.value);
        }

        it = items.next();
    }
}
