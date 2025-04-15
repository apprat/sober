# Pagination

分页组件

```html preview
<s-pagination total="200"></s-pagination>
```

使用边框样式

```html preview
<s-pagination total="200" type="outlined"></s-pagination>
```

---

## 属性

| 名称  | 类型                | 默认值   | 同步 | 介绍    |
| ----- | ------------------ | -------- | --- | ------- |
| value | number             | 1        | 否  | 当前页数 |
| total | number             | 20       | 否  | 数据总数 |
| count | number             | 20       | 否  | 每页数量 |
| type  | standard, outlined | standard | 否  | 样式类型 |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍          |
| ------ |------ |------|------ |-------------- |
| change | Event | 否   | 否     | 选中变更后触发 |