const fs = require('fs');
const path = require('path');
const { transformFromAst } = require('@babel/core');
const parser = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');

function getAst(path) {
  const content = fs.readFileSync(path, 'utf-8');
  // 将文件内容转为 AST
  return parser.parse(content, {
    sourceType: 'module',
  });
}

function getDependencyMap(ast, filename) {
  const dependencyMap = {};
  // 遍历所有 import 的模块，存入 dependencyMap
  traverse(ast, {
    // 类型为 ImportDeclaration 的 AST 节点（即 import 语句）
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filename);
      // 保存依赖模块路径，用于之后生成依赖关系图
      const filepath = './' + path.join(dirname, node.source.value);
      dependencyMap[node.source.value] = filepath;
    },
  });
  return dependencyMap;
}

function getCode(ast) {
  // 将 AST 转换成 code
  const { code } = transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],
  });
  return code;
}

exports.getAst = getAst;
exports.getDependencyMap = getDependencyMap;
exports.getCode = getCode;
