"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Figure = exports.WebGLScene = exports.Application = void 0;
var Application_1 = require("./Application"); // 应用框架
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return __importDefault(Application_1).default; } });
var WebGLScene_1 = require("./WebGLScene"); // 场景基类
Object.defineProperty(exports, "WebGLScene", { enumerable: true, get: function () { return __importDefault(WebGLScene_1).default; } });
var figure_1 = require("./figures/figure");
Object.defineProperty(exports, "Figure", { enumerable: true, get: function () { return __importDefault(figure_1).default; } });
__exportStar(require("./utils"), exports);
__exportStar(require("./managers"), exports); // 各种控制器
//# sourceMappingURL=index.js.map