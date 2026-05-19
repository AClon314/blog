/**
在 TypeScript 中，`satisfies`、`as` 和 `as unknown as` 是处理类型系统的三个重要关键字/操作符。它们的目的各不相同：`satisfies` 用于**类型检查同时保留推导**，`as` 用于**类型断言**，而 `as unknown as` 是为了**绕过 TS 的安全检查进行强制断言**。
下面为你详细拆解它们的用法和适用场景。

| 关键字/操作符 | 主要作用 | 是否保留原类型推导 | 类型兼容性要求 | 危险等级 |
| :--- | :--- | :--- | :--- | :--- |
| `satisfies` | 校验结构是否符合目标类型 | **是**（最大优势） | 必须结构兼容 | 🟢 安全 |
| `as` | 手动覆盖类型推导 | 否（类型被覆盖） | 必须存在类型重叠 | 🟡 中等 |
| `as unknown as`| 强行绕过 TS 检查转换类型 | 否（类型被强行篡改）| 无要求（任何类型互转）| 🔴 危险 |
 */
type Colors = "red" | "green" | "blue";
type RGB = [number, number, number];

const palette1: Record<Colors, string | RGB> = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255],
};

// ❌ 报错！因为 palette1 的类型被拓宽为 Record<Colors, string | RGB>
// TS 不知道 red 一定是数组，它只知道 red 是 string | RGB
palette1.red.map(console.log);

// ============================================

const palette2 = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255],
} satisfies Record<Colors, string | RGB>;

// ✅ 不报错！palette2 通过 satisfies 校验了结构符合要求，
// 但 TS 依然推导出 red 是 [number, number, number]，green 是 string
palette2.red.map(console.log); 
