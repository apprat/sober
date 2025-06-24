# 日期

大多数情况下你可能并不需要使用该组件，而是采用 [DatePicker](/component/date-picker) 来选择日期。

```html preview
<s-date></s-date>
```

该组件默认支持简体中文和英文，并跟随系统语言显示，你可以使用 `locale` 属性来强制设定显示语言。

```html preview
<s-date locale="en"></s-date>
```

---

## 自定义语言

某些情况下，仅支持中英文语言可能不够用，此时你可以使用 `.addLocale()` 静态方法来新增语言。


```js
import { Date as SDate } from 'sober'

//新增朝鲜语支持
SDate.addLocale('ko', {
  display: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
  displayMonth: (date) => `${date.getFullYear()}년`,
  displayWeeks: ['일', '월', '화', '수', '목', '금', '토']
})
//设置默认语言为朝鲜语，这将会更新页面上所有未设置 locale 属性的日期组件。
SDate.setLocale('ko')
```

---

## 属性 Props

| 名称   | 类型    | 默认值     | 同步 | 介绍                                                                                     |
| ------ | ------ | ---------- | --- | ---------------------------------------------------------------------------------------- |
| value  | string | 当前日期    | 否  | 日期，一个可以供 new Date() 解析的日期字符串                                                |
| max    | string | 2099-12-31 | 否  | 最大日期，一个可以供 new Date() 解析的日期字符串                                             |
| min    | string | 1900-01-01 | 否  | 最小日期，一个可以供 new Date() 解析的日期字符串                                             |
| locale | string |            | 否  | 地区语言，为空的情况下为跟随系统，有效的语言代码示例包括“en”、“en-US”、“fr”、“fr-FR”、“es-ES”等 |

---

## 事件

| 名称   | 参数   | 冒泡 | 可取消 | 介绍         |
| ------ |------ |------|------ |------------- |
| change | Event | 否   | 否    | 选中变化后触发 |

---

## 插槽

| 名称     | 介绍  |
| -------- | ---- |
| headline | 头部 |

---

## 原型

```ts
type Locale = {
  display: (date: Date) => string
  displayMonth: (date: Date) => string
  displayWeeks: string[]
}

class Date extends HTMLElement implements Props {
  //添加地区语言
  static addLocale(name: string, locale: Locale): void
  //设置地区语言，name 为空时跟随系统（默认值）
  static setLocale(name?: string): void
} 
```

## 依赖

该组件被导入时会自动导入以下组件：

- [Ripple](./ripple)
- [ScrollView](./scroll-view)