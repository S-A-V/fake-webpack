# fake webpack

## webpack 构建流程

- 初始化参数。从配置文件和 shell 语句中读取后合并参数，得到最终的参数。
- 开始编译。将得到的参数初始化 Compiler 对象，加载配置的插件，执行 run 方法开始编译。
- 确定入口文件。根据配置的 entry 找到所有的入口文件。
- 编译模块。从入口文件出发，调用配置的 loader 对模块进行翻译。再找出该模块依赖的模块，递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
- 完成模块编译。在 loader 翻译完所有模块后，得到每个模块翻译后的内容以及它们之间的依赖关系。
- 输出资源。根据入口和模块间的依赖关系，组装成一个个包含多个模块的 chunk。把每个 chunk 转换成单独的文件加入到输出列表（这里是可以修改输出内容的最后机会）。
- 输出完成。在确定好输出内容后，根据配置确定输出的路径和文件名，将文件内容写入文件系统。

在以上过程中，webpack 会在特定的时间点广播特定的事件。插件在监听到感兴趣的事件后会执行特定的逻辑，并且可以调用 webpack 提供的 API 改变 webpack 运行的结果。

## 实现一个精简版 webpack

核心代码在 `./build` 文件夹下。

执行以下命令，编译 `./src` 文件夹下的代码。

```bash
yarn build
```

编译后的代码会输出至 `./dist` 文件夹下。
