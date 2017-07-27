export default function roundBalance({ currency, balance }) {
    const point = currency === 'BTC' ? 8 : 2;
    return Number(balance).toFixed(point);
}
