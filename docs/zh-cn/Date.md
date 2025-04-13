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

某些情况下，仅支持中英文语言可能不够用，此时你可以使用 `Date.addLocale()` 静态方法来新增语言。


```js
import { Date as SDate } from 'sober'

//新增朝鲜语支持
SDate.addLocale('ko', {
  display: (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
  displayMonth: (date) => `${date.getFullYear()}년`,
  displayWeeks: ['일', '월', '화', '수', '목', '금', '토']
})
//设置默认语言为朝鲜语，这将会影响页面中所有设置 locale 属性的日期组件。
SDate.setLocale('ko')
```