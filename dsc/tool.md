# DSC Normalization Tool

本文档描述数据库规范化工具的完整设计思路与实现细节

## 项目概述

数据库规范化工具是一款完全基于浏览器运行的单页面交互式应用，面向数据库课程学习者与从业者设计。它提供从基础的属性闭包计算到完整 3NF/BCNF 分解的全套规范化算法可视化与交互功能，无需任何后端服务或额外安装。

### 设计目标

- **交互性**：所有算法即时响应，逐步展示中间计算过程，而非仅输出最终结果；
- **自包含**：无需服务器、无需安装，单个 `.html` 文件即可在任意现代浏览器中运行；
- **教学友好**：清晰标注每个算法步骤名称与含义，彩色高亮区分属性角色（左侧、右侧、候选键、子模式）；
- **完整性**：覆盖数据库规范化理论所有核心算法，各模块共享同一份输入，联动无缝。

## 整体架构

### 页面布局结构

应用采用经典"侧边栏导航 + 主内容区"双栏布局：

```
+------------------------------------------------------+
| HEADER  数据库规范化工具  (标题栏，固定高度 89px)         |
+----------+-------------------------------------------+
|          |  各算法面板 (.panel，一次展示一个)            |
| 侧边栏   |                                            |
| 导航     |  +--------------------------------------+  |
|          |  |  result-box  (算法结果展示区)          |  |
| 220px    |  |  ├── result-header                   |  |
|          |  |  └── result-body                     |  |
|          |  |       └── result-step × N            |  |
|          |  +--------------------------------------+  |
+----------+-------------------------------------------+
```

### 全局状态管理

所有算法模块共享同一份顶层 JavaScript 状态变量，无需任何状态管理库：

```
let schemaStr = "ABCDE";     // 关系模式（字典序字符串）

let fds = [                  // 函数依赖数组
{
    left:  Set<char>,        // 左侧属性集
    right: Set<char>,        // 右侧属性集
    str:   string            // 显示用格式化字符串
},
...
];
```

> **状态共享机制**
用户在"输入模式 & FD"面板完成输入后，切换到任意算法面板时，面板顶部会自动显示当前 `R` 与 `|F|` 的摘要信息，确保用户始终清楚当前的计算上下文。

## 核心算法实现

### 属性集运算基础

所有算法均基于以下集合运算原语。每个函数返回新的 `Set`，不修改输入参数：

### 属性闭包（闭包算法）

#### 算法描述

给定属性集 `A` 与函数依赖集 `F`，计算 `closure(A)`（`A` 在 `F` 下能函数决定的所有属性集合）。

```
输入：属性集 A，函数依赖集 F
输出：A 在 F 下的闭包 closure(A)

result := A
while (result 有变化):
for each f in F:
if f.left 是 result 的子集:
result := result union f.right
return result
```

#### JavaScript 实现

```
function closure(attrs, fdList) {
    let result = new Set(attrs);
    let changed = true;
    while (changed) {
        changed = false;
        for (const fd of fdList) {
            if (isSubset(fd.left, result)) {
                const before = result.size;
                fd.right.forEach(c => result.add(c));
                if (result.size > before) changed = true;
            }
        }
    }
    return result;
}
```

#### UI 增强

前端实现额外记录每轮触发的 FD 及新增属性，逐步渲染到结果区，并自动判断结果是否等于 `R`（即是否构成超键）。

### 候选键枚举

按属性集大小从小到大枚举所有子集，利用**超集剪枝**减少不必要的闭包计算：

```
function findCandidateKeys(R, F):
keys = []
for size = 1 to |R|:
for each combo in C(R, size):          // 枚举 size 大小的子集
if 已存在 k in keys 且 k 是 combo 的子集: continue
if closure(combo, F) = R:
keys.push(combo)
return keys
```

时间复杂度为 `O(2^n * |F| * n)`，其中 `n = |R|`。对于 `n <= 15` 的常规场景性能良好。

### 正则覆盖（Canonical Cover）

#### 算法目标

构造与 `F` 等价的最小函数依赖集 `Fc`，满足：
- `Fc` 中没有无关属性（左侧或右侧）；
- `Fc` 中没有冗余的函数依赖；
- `Fc` 中每个 FD 右侧为单属性；
- `Fc+ = F+`（等价性）。

#### 算法步骤

- **右侧拆为单属性**：将 `X -> Y1Y2...` 拆分为 `X -> Y1`、`X -> Y2`、...

- **去左侧无关属性**：对每个 `X -> Y`，若存在属性 `A` 属于 `X`，且 `Y` 可由 `closure(X - {A}, F)` 推出，则从 `X` 中删除 `A`。

- **去冗余 FD**：若某 `X -> Y` 能被 `F - {X -> Y}` 中的其余 FD 推出，则删除该 FD。

- **合并同左侧**：将所有具有相同左侧 `X` 的 FD 合并右侧。

> **实现注意**
步骤 2 和步骤 3 在 `while (changed)` 大循环中**交替执行**——每次删除操作后重新扫描，直至达到不动点。这确保了删除某 FD 后不遗漏新的冗余情况。

#### JavaScript 核心实现

```
function computeCanonicalCover(fds) {
    // Step 1: 右侧拆单属性
    let F = [];
    for (const fd of fds)
    for (const c of fd.right)
    F.push({ left: new Set(fd.left), right: new Set([c]) });

    let changed = true;
    while (changed) {
        changed = false;

        // Step 2: 去左侧无关属性
        for (let fi = 0; fi < F.length; fi++) {
            const fd = F[fi];
            if (fd.left.size <= 1) continue;
            for (const c of [...fd.left]) {
                const newLeft = new Set([...fd.left].filter(x => x !== c));
                if (isSubset(fd.right, closure(newLeft, F))) {
                    fd.left = newLeft;
                    changed = true; break;
                }
            }
        }

        // Step 3: 去冗余 FD
        for (let i = F.length - 1; i >= 0; i--) {
            const rest = F.filter((_, j) => j !== i);
            if (isSubset(F[i].right, closure(F[i].left, rest))) {
                F.splice(i, 1); changed = true;
            }
        }
    }

    // Step 4: 合并同左侧
    const merged = new Map();
    for (const fd of F) {
        const key = setStr(fd.left);
        if (!merged.has(key))
        merged.set(key, { left: new Set(fd.left), right: new Set() });
        fd.right.forEach(c => merged.get(key).right.add(c));
    }
    return [...merged.values()];
}
```

### 3NF 分解

#### 理论保证

3NF 分解算法同时满足：
- **无损连接**（Lossless Join）：分解后的子模式可以通过自然连接无损地还原原始关系；
- **函数依赖保持**（Dependency Preservation）：原始 `F` 中的每个函数依赖都能在某个子模式中被保持。

#### 算法流程

```
输入：关系模式 R，函数依赖集 F
输出：R 的 3NF 分解结果

Step 1: Fc := canonicalCover(F)
Step 2: D  := { X union Y | X -> Y in Fc }   // 每个 FD 构造子模式
Step 3: if D 中没有任何 Ri 包含候选键:
D := D union { K }           // K 为 R 的某个候选键
Step 4: 删除 D 中被其他子模式严格包含的 Ri
return D
```

#### 示例

设 `R = ABCDE`，`F = {A -> BC, CD -> E, B -> D, E -> A}`。

正则覆盖 `Fc = {A -> BC, B -> D, CD -> E, E -> A}`，候选键为 `{A, E, BC, CD}`。

3NF 分解结果：`{R(ABC), R(BD), R(CDE), R(AE)}`。

### BCNF 分解

#### 理论保证

BCNF 分解算法保证**无损连接**，但**不保证函数依赖保持**（这是 BCNF 分解的理论局限）。

#### 算法流程（递归）

```
输入：关系模式 R，函数依赖集 F
输出：R 的 BCNF 分解结果

function bcnfDecomposeRec(R, F):
for each 非空真子集 X of R:
cl      := closure(X, F)
clInR   := cl intersect R
extra   := clInR - X          // 非平凡增量

if extra 为空: continue         // 平凡 FD，满足 BCNF
if clInR = R: continue          // X 是超键，满足 BCNF

// 违反 BCNF，执行分解：
R1 := clInR                    // closure(X) 与 R 的交集
R2 := X union (R - clInR)       // 保留 X 和 R 中未被覆盖部分
return bcnfDecomposeRec(R1, F) 加上 bcnfDecomposeRec(R2, F)

return { R }                     // R 本身满足 BCNF
```

#### 示例

同上例 `R = ABCDE`，`F = {A -> BC, CD -> E, B -> D, E -> A}`：

- 发现 `B -> D` 违反 BCNF（`B` 不是超键），分解为 `R1(BD)`、`R2(ABCE)`；
- `R1(BD)`：`B` 是超键（`B+` 覆盖 `BD`），满足 BCNF；
- `R2(ABCE)`：无违反，满足 BCNF。

最终 BCNF 分解：`{R(BD), R(ABCE)}`。

> **与3NF分解的对比**
同一输入下，3NF 分解得到 `{ABC, BD, CDE, AE}`（4个子模式，保持所有 FD），而 BCNF 分解得到 `{BD, ABCE}`（2个子模式，丢失了 `CD -> E`）。这体现了两种范式在依赖保持能力上的本质差异。

### BCNF 判定

#### 算法

对关系模式 `R` 的每个非空真子集 `X`，计算 `closure(X)`。若 `closure(X)` 在 `R` 内的部分不等于 `R`（`X` 不是超键），且还能推出 `X` 之外的新属性（非平凡），则 `R` 违反 BCNF。

```
function bcnfCheck(R, fds) {
    const attrs = [...R].sort();
    const n = attrs.length;
    const violations = [];
    for (let mask = 1; mask < (1 << n); mask++) {
        const alpha   = new Set(attrs.filter((_, j) => mask >> j & 1));
        const cl      = closure(alpha, fds);
        const cl_in_R = setIntersect(cl, R);
        const extra   = setDiff(cl_in_R, alpha);
        if (extra.size === 0)       continue;  // 平凡FD
        if (setsEqual(cl_in_R, R)) continue;  // 超键
        violations.push({ alpha, extra });
    }
    return violations;  // 空数组表示满足BCNF
}
```

> **理论说明**
分解后判定使用**原始** `F` 计算闭包（而非投影到子模式上的 `Fi`）。这是标准教材（Ramakrishnan & Gehrke）中的算法，适用于判断分解是否保持了规范化性质。

### 函数依赖保持检验

#### 算法

对每个待测 FD `X -> Y`，使用分解后的子模式集合 `RS` 模拟闭包计算（无需显式求完整的依赖闭包）：

```
输入：FD X -> Y，子模式集合 RS，函数依赖集 F
输出：X -> Y 是否被 RS 保持

result := X
repeat:
for each Ri in RS:
t := closure(result intersect Ri, F) intersect Ri
result := result union t
until result 不变
return Y 是 result 的子集
```

若返回 `true`，则该 FD 在分解后被保持；否则不被保持。
整个 `F` 被保持当且仅当 `F` 中每个 FD 均通过检验。

## 界面设计

### 视觉风格

应用采用**深色科技风格（Dark Theme）**，与数据库/终端工具的专业气质契合。

### 交互流程

典型用户操作流程如下：

- 在"输入模式 & FD"面板输入关系模式 `R`（大写字母串）；
- 逐条添加函数依赖，或点击内置示例快速加载；
- 页面自动计算并展示候选键；
- 切换左侧导航到目标算法面板；
- 点击"执行"按钮，结果区即时渲染逐步过程；
- 对于 BCNF 判定，可在"简单判定"与"分解后判定"标签页间切换；
- 对于依赖保持检验，在文本框输入分解后的子模式（每行一个）后执行。

### 结果展示组件

所有算法结果通过统一的 `result-box` 组件呈现，由若干 `result-step` 构成，结构如下：

```
<div class="result-box">
<div class="result-header">算法名称</div>
<div class="result-body">
<div class="result-step">
<div class="step-label">步骤标签（如：Step 1）</div>
<div class="step-content">
<!-- 带 <span class="hl-*"> 高亮的内容 -->
</div>
</div>
<!-- 更多 result-step... -->
</div>
</div>
```

## 数据流与模块依赖

### 函数调用依赖图

```
输入管理 (setup)
|-- findCandidateKeys()        [输入变更时即时调用]
`-- fds[] / schemaStr          [全局状态，所有模块共享]

closure(attrs, fdList)           [属性闭包，被所有算法调用]

computeCanonicalCover(fds)       [正则覆盖]
├─ 调用 closure()
├─ 被 decompose3NF() 调用
└─ 被 runCanonical() 直接调用

findCandidateKeys(R, fds)        [候选键枚举]
├─ 调用 closure()
└─ 被 decompose3NF() 调用

decompose3NF(R, fds)             [3NF 分解]
├─ 调用 computeCanonicalCover()
└─ 调用 findCandidateKeys()

bcnfDecomposeRec(R, fds, log)    [BCNF 分解]
└─ 调用 closure()

checkPreserve(X, Y, RS, fds)     [依赖保持]
└─ 调用 closure()
```

## 文件结构

### 单文件组织

整个工具压缩为单个 `.html` 文件，代码按功能区块垂直组织：

```
db_normalization_tool.html                         (~970 行)
│
├── <style>                    CSS 样式            (~280 行)
│     ├── 全局重置 & 变量定义
│     ├── Header / Layout 布局
│     ├── Sidebar 侧边栏导航
│     ├── Input / Textarea 输入组件
│     ├── FD List 函数依赖列表
│     ├── Result Box 结果展示组件
│     └── Badge / Tab 标签组件
│
├── <body>                     HTML 结构           (~220 行)
│     ├── .header              顶部标题栏
│     ├── .sidebar             7 个导航按钮
│     └── .main                7 个 .panel（单次展示一个）
│           ├── #panel-setup
│           ├── #panel-closure
│           ├── #panel-canonical
│           ├── #panel-bcnf_check
│           ├── #panel-threenf
│           ├── #panel-bcnf_decomp
│           └── #panel-preserve
│
└── <script>                   JavaScript 逻辑     (~470 行)
├── 全局状态变量 (schemaStr, fds)
├── 导航 / 共享信息更新
├── 输入管理（addFD, deleteFD, loadExample）
├── 集合运算基础（6个原语函数）
├── 算法核心实现（7个算法函数）
└── UI 渲染函数（7个渲染函数）
```

## 使用说明

### 运行方式

无需安装任何依赖，直接在浏览器中打开即可：

- **方式一**：双击 `.html` 文件，使用系统默认浏览器打开；
- **方式二**：终端执行 `open db_normalization_tool.html`（macOS）；
- **方式三**：启动本地服务器 `python3 -m http.server 8080`，访问 `localhost:8080`。

> **浏览器兼容性**
推荐 Chrome 90+ / Firefox 88+ / Safari 14+，需支持 ES6 `Set`、展开运算符及 CSS Custom Properties。无需网络连接，完全离线可用。

### 输入规范

- **属性**：仅使用大写英文字母 A-Z，每个字母表示一个不同属性；
- **函数依赖**：左侧和右侧均为不含重复字母的大写字母串，例如 `AB->C`；
- **子模式**（分解后判定 / 依赖保持）：每行输入一个子模式，例如 `ABC`；
- **属性集**（闭包查询）：直接输入大写字母串，结果实时计算。

## 局限性与扩展方向

### 当前局限性

- **属性规模**：属性数超过约 15 个时，全子集枚举（`2^n`）会在浏览器中产生明显卡顿，建议属性数 `<= 10`；
- **FD 数量**：最多支持 30 个函数依赖（与题目输入规模对齐）；
- **无持久化**：页面刷新后数据丢失，未实现 `localStorage` 持久化；
- **BCNF 分解顺序**：分解顺序依赖枚举顺序，不同枚举顺序可能产生不同的合法分解（均正确）。

### 可扩展方向

- 增加数据导入/导出（JSON 格式）功能，支持保存和恢复工作状态；
- 支持函数依赖集的 `F+` 完整枚举展示（指数级，需加警告）；
- 增加无损连接检验（Chase 算法）模块；
- 支持 2NF 判定与分解；
- 增加算法动画演示模式（逐步高亮触发 FD）；
- 支持多语言界面（英文模式）。
