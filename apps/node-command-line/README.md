# Package<node-command-line>

---

## NodeCommandLineParser

### Properties

- \#rawArgs 原始命令行参数数据。

- \#parsedArgs 解析命令行参数之后的数据。与 minimist 解析之后的数据结构一致
  但是仍然需要优化解析方法，支持 -- 参数的解析

### Methods

- parser 用于解析命令行参数，收集用户的输入

---

## ActionBase

### Properties

- actionName 操作名称。

- hook action 中的 hook，SyncHook 的实例对象。

### Methods

- initializeHook 初始化 action 中的 hook 属性

---

## CommandLineTool

继承自 NodeCommandLineParser

### Properties

-- actions 这个属性用于存储注册的 action 操作。

-- actionsByName 通过操作名称建立一个 hashmap 来方便寻找 action

### Methods

-- addAction 动态地添加 action

-- getAction 获取指定名称的 action
