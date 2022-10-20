"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.degreesToRadians = exports.getTime = void 0;
const getTime = () => +new Date();
exports.getTime = getTime;
const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};
exports.degreesToRadians = degreesToRadians;
const random = (min, max, float = false) => {
    const val = Math.random() * (max - min) + min;
    if (float) {
        return val;
    }
    return Math.floor(val);
};
exports.random = random;
//# sourceMappingURL=index.js.map