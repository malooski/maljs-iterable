export function* zip<T, U>(
    items: Iterator<T>,
    other: Iterator<U>
): Iterator<[T | undefined, U | undefined, number]> {
    let it = items.next();
    let ot = other.next();
    let idx = 0;
    while (!it.done || !ot.done) {
        yield [it.value, ot.value, idx];

        it = items.next();
        ot = other.next();
        idx++;
    }
}

export function* innerZip<T, U>(items: Iterator<T>, other: Iterator<U>): Iterator<[T, U, number]> {
    let it = items.next();
    let ot = other.next();
    let idx = 0;
    while (!it.done && !ot.done) {
        yield [it.value, ot.value, idx];

        it = items.next();
        ot = other.next();
        idx++;
    }
}
