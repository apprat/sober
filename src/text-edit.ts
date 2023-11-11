import { defineElement, html, ref } from './core/element'

const style = /*css*/`
:host{
  position: relative;
  outline: solid 1px var(--s-color-outline-variant);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--s-color-on-surface);
  box-sizing: border-box;
  padding: 12px;
  display: block;
}
:host([mode=multiLine]){
  min-height: 96px;
  line-height: 1.5;
}
.fill{
  visibility: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
.fill::after{
  content: ' ';
}
.box{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: none;
  border: none;
  outline: none;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  padding: inherit;
  box-sizing: border-box;
  caret-color: inherit;
  color: inherit;
}
.box::placeholder{
  color: var(--placeholder-color,color-mix(in srgb ,currentColor 38%, transparent));
}
.box::selection{
  color: var(--selection-color, var(--s-color-on-primary));
  background: var(--selection-background-color, var(--s-color-primary));
}
:host([mode=multiLine]) .single{
  display: none;
}
.text{
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
.multi{
  resize: none;
  overflow: hidden;
  display: none;
}
:host([mode=multiLine]) .multi{
  display: block;
}
`

const name = 's-text-edit'
const props = {
  mode: 'singleLine' as 'singleLine' | 'multiLine' | 'password',
  placeholder: '',
  value: '',
}

export default class Component extends defineElement({
  name, props, propSyncs: ['mode'],
  setup() {
    const fill = ref<HTMLDivElement>()
    const single = ref<HTMLInputElement>()
    const multi = ref<HTMLTextAreaElement>()
    const setValue = (value: string) => {
      fill.target.textContent = value
      if (value !== single.target.value) single.target.value = value
      if (value !== multi.target.value) multi.target.value = value
    }
    const onInputSingle = () => {
      fill.target.textContent = multi.target.value
    }
    const onInputMulti = () => {
      fill.target.textContent = multi.target.value
    }
    const onFocus = () => this.setAttribute('focus', '')
    const onBlur = () => this.removeAttribute('focus')
    return {
      watches: {
        placeholder: (value) => {
          single.target.placeholder = value
          multi.target.placeholder = value
        },
        value: setValue
      },
      render: () => html`
        <style>${style}</style>
        <div class="text fill" ref="${fill}"></div>
        <input type="text" class="single box" ref="${single}" value="${this.value}" placeholder="${this.placeholder}" @input="${onInputSingle}" @focus="${onFocus}" @blur="${onBlur}">
        <textarea class="text multi box" rows="1" ref="${multi}" placeholder="${this.placeholder}" @input="${onInputMulti}" @focus="${onFocus}" @blur="${onBlur}">${this.value}</textarea>
      `
    }
  }
}) { }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [name]: Partial<typeof props> & { [name: string]: unknown }
    }
  }
  interface HTMLElementTagNameMap {
    [name]: Component
  }
}

//@ts-ignore
declare module 'vue' {
  export interface GlobalComponents {
    [name]: typeof props
  }
}