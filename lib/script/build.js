"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
process.env.NODE_ENV = "production";
const webpack_config_1 = __importDefault(require("../config/webpack.config"));
let compiler;
let buildTask = ora_1.default(`${chalk_1.default.bold("Rscrit 正在构建项目")}`).start();
try {
    buildTask.color = "green";
    compiler = webpack_1.default(webpack_config_1.default);
}
catch (error) {
    buildTask.color = "red";
    buildTask.fail(error.message);
    process.exit(1);
}
// 执行编译操作
compiler.run((err, stats) => {
    if (err) {
        console.error("编译错误:", err.stack || err);
        return;
    }
    const statsInfoJson = {
        colors: true,
        version: true,
        hash: true,
        warningsCount: true,
        outputPath: true,
        errorsCount: true,
        env: true,
        publicPath: true,
        builtAt: true,
    };
    if (stats === null || stats === void 0 ? void 0 : stats.hasErrors()) {
        console.error(stats.toString(Object.assign(Object.assign({}, statsInfoJson), { logging: "error" })));
        return;
    }
    buildTask.succeed("项目构建成功");
    process.exit();
});
