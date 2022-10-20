export const getTime = () => +new Date();
export const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};
export const random = (min, max, float = false) => {
    const val = Math.random() * (max - min) + min;
    if (float) {
        return val;
    }
    return Math.floor(val);
};
//# sourceMappingURL=index.js.map