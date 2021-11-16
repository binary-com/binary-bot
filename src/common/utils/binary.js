export function getLast(arr) {
    return arr && (arr.length === 0 ? undefined : arr[arr.length - 1]);
}

export function historyToTicks(history) {
    return history.times.map((t, idx) => ({
        epoch: +t,
        quote: +history.prices[idx],
    }));
}
