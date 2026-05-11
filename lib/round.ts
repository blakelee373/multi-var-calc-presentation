// Rounds to 3 decimal places so trig-derived SVG coordinates serialize
// to the exact same string on server and client. Without this, React
// hydration sees y2={42.396562111205874} on the client vs the
// server-truncated "42.39656211120588" and complains.
export const r3 = (n: number) => Math.round(n * 1000) / 1000;
