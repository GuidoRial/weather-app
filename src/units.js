export const KtoF = function (k) {
let number = 1.8 * (k - 273) + 32
    let f = Math.round(number * 10) / 10;
    return f;
};

export const KtoC = function (k) {
let number = k - 273
    let c = Math.round(number * 10) / 10;
    return c;
};