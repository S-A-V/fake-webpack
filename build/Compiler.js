const fs = require('fs');
const path = require('path');
const { getAst, getDependencyMap, getCode } = require('./parser');

class Compiler {
  constructor(options) {
    // webpack 配置
    const { entry, output } = options;
    // 入口
    this.entry = entry;
    // 出口
    this.output = output;
    // 模块
    this.modules = [];
  }

  // 启动
  run() {
    // 解析入口文件
    const info = this.build(this.entry);
    this.modules.push(info);

    for (const { dependencyMap } of this.modules) {
      // 递归解析所有依赖项
      if (dependencyMap) {
        for (const dependency in dependencyMap) {
          if (Object.hasOwnProperty.call(dependencyMap, dependency)) {
            this.modules.push(this.build(dependencyMap[dependency]));
          }
        }
      }
    }

    // 生成依赖关系图
    const dependencyGraph = this.modules.reduce((graph, module) => {
      const { dependencyMap, code } = module;
      return {
        ...graph,
        // 使用文件路径作为每个模块的唯一标识符，保存对应模块的依赖对象和文件内容
        [module.filename]: { dependencyMap, code },
      };
    }, {});
    this.generate(dependencyGraph);
  }

  // 构建
  build(filename) {
    const ast = getAst(filename);
    const dependencyMap = getDependencyMap(ast, filename);
    const code = getCode(ast);
    return {
      // 文件路径，可以作为每个模块的唯一标识符
      filename,
      // 依赖对象，保存着依赖模块路径
      dependencyMap,
      // 文件内容
      code,
    };
  }

  // 重写 require 函数（浏览器无法识别 commonjs 语法），输出 bundle
  generate(code) {
    // 输出文件路径
    const filePath = path.join(this.output.path, this.output.filename);
    const bundle = `
      (function (graph) {
        function require(moduleId) {
          function localRequire(relativePath) {
            return require(graph[moduleId].dependencyMap[relativePath]);
          }
          var exports = {};
          (function (require, exports, code) {
            eval(code);
          })(localRequire, exports, graph[moduleId].code);
          return exports;
        }
        require('${this.entry}');
      })(${JSON.stringify(code)});
    `;
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
}

module.exports = Compiler;
