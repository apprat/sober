import { useElement } from './core/element.js'
import { dateFormat } from './core/utils/dateFormat.js'
import { Theme } from './core/theme.js'
import { Field } from './field.js'
import { Dialog } from './dialog.js'
import { Date as DateElement } from './date.js'
import { Ripple } from './ripple.js'

type Props = {
  value: string
  min: string
  max: string
  label: string
  positiveText: string
  negativeText: string
  format: string
  locale: string
}

const name = 's-date-picker'
const props: Props = {
  value: '',
  min: '',
  max: '',
  label: '',
  positiveText: '确定',
  negativeText: '取消',
  format: 'yyyy-MM-dd',
  locale: ''
}

const style = /*css*/`
:host{
  display: inline-block;
  vertical-align: middle;
  font-size: .875rem;
  --date-picker-border-radius: 4px;
  --date-picker-border-color: var(--s-color-outline, ${Theme.colorOutline});
  --date-picker-border-width: 1px;
  --date-picker-padding: 16px;
  --date-picker-height: 48px;
}
s-dialog{
  display: block;
}
.field{
  --field-border-radius: var(--date-picker-border-radius);
  --field-border-color: var(--date-picker-border-color);
  --field-border-width: var(--date-picker-border-width);
  --field-padding: var(--date-picker-padding);
  height: var(--date-picker-height);
  position: relative;
  cursor: pointer;
}
.view{
  width: 100%;
  padding-top: 0;
  padding-bottom: 0;
  padding: 0 var(--date-picker-padding);
}
svg{
  width: 24px;
  height: 24px;
  padding: 2px;
  box-sizing: border-box;
  flex-shrink: 0;
  margin-left: min(0px, calc((var(--date-picker-padding) * -1) + 12px));
  margin-right: max(0px, calc(var(--date-picker-padding) - 4px));
  fill: var(--s-color-on-surface-variant, ${Theme.colorOnSurfaceVariant});
}
.ripple{
  border-radius: var(--date-picker-border-radius);
}
.date{
  border: none;
  width: 360px;
  border-radius: 0;
}
.positive,
.negative{
  border-radius: 20px;
}
`
const template = /*html*/`
<s-dialog part="dialog">
  <slot name="trigger" slot="trigger">
    <s-field class="field" fixed="false" part="field">
      <div class="label" part="label" slot="label"></div>
      <div class="view"></div>
      <svg viewBox="0 -960 960 960" slot="end">
        <path d="M320-400q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm160 0q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm160 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"></path>
      </svg>
      <s-ripple slot="custom" class="ripple" attached="true"></s-ripple>
    </s-field>
  </slot>
  <s-date class="date" part="date"></s-date>
  <s-ripple class="negative" slot="action" part="negative">${props.negativeText}</s-ripple>
  <s-ripple class="positive" slot="action" part="positive">${props.positiveText}</s-ripple>
</s-dialog>
`

class DatePicker extends useElement({
  style, template, props,
  setup(shadowRoot) {
    const dialog = shadowRoot.querySelector<Dialog>('s-dialog')!
    const dateElement = shadowRoot.querySelector<DateElement>('s-date')!
    const negative = shadowRoot.querySelector<Ripple>('.negative')!
    const positive = shadowRoot.querySelector<Ripple>('.positive')!
    const field = shadowRoot.querySelector<Field>('s-field')!
    const label = shadowRoot.querySelector<HTMLDivElement>('.label')!
    const view = shadowRoot.querySelector<HTMLDivElement>('.view')!
    const state = { date: '' }
    dialog.addEventListener('show', () => {
      field.fixed = true
      field.focused = true
      if (!state.date) {
        view.textContent = this.label
        view.style.opacity = '0'
      }
    })
    dialog.onclose = () => {
      field.focused = false
      if (!state.date) {
        field.fixed = false
      }
    }
    positive.onclick = () => {
      this.value = dateElement.value
      view.style.removeProperty('opacity')
      this.dispatchEvent(new Event('change'))
    }
    return {
      value: {
        get: () => state.date,
        set: (value) => {
          state.date = value
          if (value === '') {
            dateElement.value = dateFormat(new Date())
            field.fixed = false
            view.textContent = ''
            return
          }
          field.fixed = true
          view.textContent = dateFormat(value, this.format)
          dateElement.value = value
        }
      },
      locale: {
        get: () => dateElement.locale,
        set: (value) => dateElement.locale = value
      },
      min: {
        get: () => dateElement.min,
        set: (value) => dateElement.min = value
      },
      max: {
        get: () => dateElement.max,
        set: (value) => dateElement.max = value
      },
      label: (value) => label.textContent = value,
      positiveText: (value) => positive.textContent = value,
      negativeText: (value) => negative.textContent = value,
    }
  }
}) { }

DatePicker.define(name)

export { DatePicker }

declare global {
  interface HTMLElementTagNameMap {
    [name]: DatePicker
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<Props>
      }
    }
  }
}

//@ts-ignore
declare module 'vue' {
  //@ts-ignore
  import { HTMLAttributes } from 'vue'
  interface GlobalComponents {
    [name]: new () => {
      /**
      * @deprecated
      **/
      $props: HTMLAttributes & Partial<Props>
    } & DatePicker
  }
}

//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<Props>
    }
  }
}