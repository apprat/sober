import { useElement, useProps, focusKeydownClick } from '../core/elements.js'
import * as scheme from '../core/scheme.js'
import { FieldSet } from './field-set.js'
import './ripple.js'

const props = useProps({
  disabled: false,
  readOnly: false,
  showError: false,
  showSearch: false,
  showClear: false,
  showNumberSpin: false,
  showCount: false,
  showPasswordToggle: false,
  showMic: false,
  micLang: '',
  name: '',
  $autoComplete: 'off',
  $value: '',
  $defaultValue: '',
  $label: '',
  $placeholder: '',
  maxLength: -1,
  type: ['text', 'password', 'number', 'email', 'tel', 'search', 'multiline'],
  $inputMode: ['', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'],
  size: ['medium', 'small', 'large'],
})
const events = {
  search: Event
}

const style = /*css*/`
:host{
  display: flex;
  flex-direction: column;
  min-height: 48px;
  font-size: calc(var(--s-font-size) * 16px);
  line-height: calc(100% + 8px);
  color: ${scheme.color.onSurface};
  caret-color: currentColor;
  transition-timing-function: ${scheme.motion.easing.standardDecelerate};
  transition-duration: ${scheme.motion.duration.short4};
}
.wrap{
  all: inherit;
  display: contents;
  --s_text-field-padding: var(--s-text-field-padding);
  --s_text-field-padding-top: var(--s-text-field-padding-top, var(--s-text-field-padding, 12px));
  --s_text-field-padding-bottom: var(--s-text-field-padding-bottom, var(--s-text-field-padding, 12px));
  --s_text-field-padding-right: var(--s-text-field-padding-right, var(--s-text-field-padding, 16px));
  --s_text-field-padding-left: var(--s-text-field-padding-left, var(--s-text-field-padding, 16px));
  --s_text-field-border-color: var(--s-text-field-border-color, ${scheme.color.outline});
  --s_text-field-border-color-focused: var(--s-text-field-border-color-focused, ${scheme.color.primary});
  --s_text-field-border-width: var(--s-text-field-border-width, 1px);
  --s_text-field-border-focused-width: var(--s-text-field-border-focused-width, 2px);
  --s_text-field-border-radius: var(--s-text-field-border-radius);
  --s_text-field-border-top-left-radius: var(--s-text-field-border-top-left-radius, var(--s-text-field-border-radius, 4px));
  --s_text-field-border-top-right-radius: var(--s-text-field-border-top-right-radius, var(--s-text-field-border-radius, 4px));
  --s_text-field-border-bottom-left-radius: var(--s-text-field-border-bottom-left-radius, var(--s-text-field-border-radius, 4px));
  --s_text-field-border-bottom-right-radius: var(--s-text-field-border-bottom-right-radius, var(--s-text-field-border-radius, 4px));
  --s_text-field-label-gap: var(--s-text-field-label-gap, 4px);
}
.field-set{
  line-height: inherit;
  font-size: inherit;
  min-height: inherit;
  max-height: inherit;
  transition-timing-function: inherit;
  transition-duration: inherit;
  --s-field-set-padding-top: var(--s_text-field-padding-top);
  --s-field-set-padding-bottom: var(--s_text-field-padding-bottom);
  --s-field-set-padding-right: var(--s_text-field-padding-right);
  --s-field-set-padding-left: var(--s_text-field-padding-left);
  --s-field-set-border-color: var(--s_text-field-border-color);
  --s-field-set-border-color-focused: var(--s_text-field-border-color-focused);
  --s-field-set-border-width: var(--s_text-field-border-width);
  --s-field-set-border-focused-width: var(--s_text-field-border-focused-width);
  --s-field-set-border-radius: var(--s_text-field-border-radius);
  --s-field-set-border-top-left-radius: var(--s_text-field-border-top-left-radius);
  --s-field-set-border-top-right-radius: var(--s_text-field-border-top-right-radius);
  --s-field-set-border-bottom-left-radius: var(--s_text-field-border-bottom-left-radius);
  --s-field-set-border-bottom-right-radius: var(--s_text-field-border-bottom-right-radius);
  --s-field-set-title-gap: var(--s_text-field-label-gap);
  &.multi-line{
    input{
      display: none;
    }
    .layout{
      display: grid;
    }
    .actions{
      flex-direction: column;
    }
  }
  &:not(.multi-line){
    .label{
      padding-top: 0;
      padding-bottom: 0;
      height: 50%;
      display: flex;
      align-items: center;
      line-height: 1;
    }
  }
}
.label{
  display: block;
  &[data-label='']{
    display: none !important;
  }
  &::before{
    content: attr(data-label);
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: normal;
  }
}
.layout{
  padding: 0;
  max-height: inherit;
  height: 100%;
  display: none;
}
input{
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
}
input,
textarea,
.shadow{
  outline: none;
  border: none;
  background: transparent;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  width: 100%;
  height: 100%;
  resize: none;
  padding: 0;
  margin: 0;
  padding-left: var(--s_text-field-padding-left);
  padding-right: var(--s_text-field-padding-right);
  box-sizing: border-box;
  caret-color: inherit;
  &::placeholder{
    color: ${scheme.color.outline};
    line-height: inherit;
  }
}
textarea,
.shadow{
  grid-area: 1 / 1 / 2 / 2;
  overflow: auto;
  padding-top: var(--s_text-field-padding-top);
  padding-bottom: var(--s_text-field-padding-bottom);
  max-width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-height: inherit;
  field-sizing: content;
}
.shadow{
  opacity: 0;
  pointer-events: none;
  &::after{
    content: '\u200B';
  }
}
.start,
.actions{
  display: flex;
  align-items: center;
  height: 100%;
  padding: 4px 0;
}
.start{
  margin: 0 -8px 0 4px;
}
.actions{
  margin: 0 4px 0 -8px;
}
.action{
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 50%;
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline-color: currentColor;
  &[pressed]{
    border-radius: 8px;
  }
  &.password-toggle .on{
    display: none;
  }
  &.mic.supported{
    &.monitoring{
      .on{
        display: none;
      }
      .off{
        display: block;
        animation: scaleLoop 1.5s ease-in-out infinite;
      }
    }
    .off{
      display: none;
    }
  }
}
@keyframes scaleLoop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
.supporting{
  display: flex;
  align-items: center;
  gap: 4px;
  justify-content: flex-end;
  font-size: calc(var(--s-font-size) * 12px);
  line-height: 1;
  padding-left: var(--s_text-field-padding-left);
  padding-right: var(--s_text-field-padding-right);
  color: ${scheme.color.onSurfaceVariant};
  .count{
    margin-top: 8px;
    &:not(.enabled){
      display: none;
    }
  }
}
svg,
::slotted(:is(svg, s-icon)){
  width: 24px;
  height: 24px;
  font-size: 24px;
  color: ${scheme.color.onSurfaceVariant};
  fill: currentColor;
  flex-shrink: 0;
}
::slotted(:is(svg, s-icon)){
  margin: 0 8px;
}
::slotted([slot=helper]){
  margin-top: 8px;
  flex-grow: 1;
}
:host(:focus-visible){
  outline: none;
}
:host([size=small]){
  font-size: calc(var(--s-font-size) * 14px);
  min-height: 40px;
  .wrap{
    --s_text-field-padding-top: var(--s-text-field-padding-top, var(--s-text-field-padding, 8px));
    --s_text-field-padding-bottom: var(--s-text-field-padding-bottom, var(--s-text-field-padding, 8px));
    --s_text-field-padding-left: var(--s-text-field-padding-left, var(--s-text-field-padding, 12px));
    --s_text-field-padding-right: var(--s-text-field-padding-right, var(--s-text-field-padding, 12px));
  }
  .actions{
    margin: 0 0 0 -8px;
  }
}
:host([size=large]){
  font-size: calc(var(--s-font-size) * 18px);
  min-height: 56px;
  .wrap{
    --s_text-field-padding-top: var(--s-text-field-padding-top, var(--s-text-field-padding, 16px));
    --s_text-field-padding-bottom: var(--s-text-field-padding-bottom, var(--s-text-field-padding, 16px));
    --s_text-field-padding-left: var(--s-text-field-padding-left, var(--s-text-field-padding, 20px));
    --s_text-field-padding-right: var(--s-text-field-padding-right, var(--s-text-field-padding, 20px));
  }
  .start{
    margin: 0 -8px 0 8px;
  }
  .actions{
    margin: 0 8px 0 -8px;
  }
}
:host([type=number][showNumberSpin]){
  .number-spin{
    display: flex;
  }
}
:host([type=password][showPasswordToggle]){
  .password-toggle{
    display: flex;
  }
  input[type=password]+.actions>.password-toggle{
    .off{
      display: none;
    }
    .on{
      display: block;
    }
  }
}
:host([type=search][showSearch]){
  .search{
    display: flex;
  }
}
:host([showClear]){
  .field-set.no-empty .clear{
    display: flex;
  }
}
:host([showMic]){
  .mic.supported{
    display: flex;
  }
}
:host([showError]){
  .wrap{
    --s_text-field-border-color: var(--s-text-field-border-color, ${scheme.color.error});
    --s_text-field-border-color-focused: var(--s-text-field-border-color-focused, ${scheme.color.error});
    --s_text-field-border-width: var(--s-text-field-border-width, 2px);
  }
  .supporting{
    color: ${scheme.color.error};
  }
}
:host([readOnly]){
  pointer-events: none;
}
:host([disabled]){
  pointer-events: none;
  color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  .wrap{
    --s_text-field-border-color: color-mix(in srgb, ${scheme.color.onSurface} 38%, transparent) !important;
  }
}
`
const template = /*html*/`
<div class="wrap" part="wrap">
  <s-field-set class="field-set" floating>
    <div class="start" part="start" slot="start">
      <slot name="start"></slot>
    </div>
    <div slot="title" class="label" part="label" data-label=""></div>
    <div class="layout" part="layout">
      <textarea name="textarea" part="textarea" rows="1" autocomplete="${props.values.autoComplete}" tabindex="-1"></textarea>
    </div>
    <input type="text" part="input" name="input" autocomplete="${props.values.autoComplete}" tabindex="-1">
    <div slot="end" class="actions" part="actions">
      <div class="action clear" tabindex="0" part="action">
        <svg viewBox="0 -960 960 960"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"></path></svg>
        <s-ripple></s-ripple>
      </div>
      <div class="action mic" tabindex="0" part="action">
        <svg viewBox="0 -960 960 960" class="on"><path d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm0-240Zm-40 520v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Zm40-360q17 0 28.5-11.5T520-520v-240q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760v240q0 17 11.5 28.5T480-480Z"></path></svg>
        <svg viewBox="0 -960 960 960" class="off"><path d="M680-80q-62 0-101.5-31T518-202q-17-50-32.5-70T414-336q-62-50-98-113t-36-151q0-119 80.5-199.5T560-880q119 0 199.5 80.5T840-600h-80q0-85-57.5-142.5T560-800q-85 0-142.5 57.5T360-600q0 68 27 116t77 86q52 38 81 74t43 78q14 44 33.5 65t58.5 21q33 0 56.5-23.5T760-240h80q0 66-47 113T680-80ZM248-290q-59-60-93.5-139.5T120-600q0-92 34.5-172T248-912l58 56q-50 50-78 115.5T200-600q0 74 28 139t78 115l-58 56Zm312-210q-42 0-71-29.5T460-600q0-42 29-71t71-29q42 0 71 29t29 71q0 41-29 70.5T560-500Z"></path></svg>
        <s-ripple></s-ripple>
      </div>
      <div class="action password-toggle" tabindex="0" part="action">
        <svg viewBox="0 -960 960 960" class="on"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"></path></svg>
        <svg viewBox="0 -960 960 960" class="off"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"></path></svg>
        <s-ripple></s-ripple>
      </div>
      <div class="action search" tabindex="0" part="action">
      <svg viewBox="0 -960 960 960"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"></path></svg>
        <s-ripple></s-ripple>
      </div>
      <slot name="end"></slot>
    </div>
  </s-field-set>
  <div class="supporting" part="supporting">
    <slot name="helper"></slot>
    <div class="count">20/16</div>
  </div>
</div>
`
//@ts-ignore
const SpeechRecognition = (window.SpeechRecognition || window.webkitSpeechRecognition)

const support = {
  fieldSizing: CSS.supports('field-sizing: content'),
  //@ts-ignore
  speechRecognition: !!SpeechRecognition
}

class Recognition {
  private recognition: any
  constructor() {
    this.recognition = new SpeechRecognition()
    this.recognition.interimResults = true
    this.recognition.continuous = true
  }
  start(options: { lang?: string, onResult: (res: SpeechRecognitionResult) => void, onError: (err: any) => void }) {
    this.recognition.lang = options.lang ?? navigator.language
    this.recognition.onresult = (e: SpeechRecognitionEvent) => options.onResult(e.results[e.results.length - 1])
    this.recognition.onerror = (e: any) => {
      this.recognition.stop()
      options.onError(e)
    }
    try {
      this.recognition.start()
    } catch (e) { }
  }
  stop() {
    this.recognition.stop()
  }
}

export class TextField extends useElement({
  style, template, props, events,
  states: ['focusableOnly', 'formable'],
  setup(shadowRoot) {
    const fieldSet = shadowRoot.querySelector<FieldSet>('.field-set')!
    const label = shadowRoot.querySelector<HTMLSpanElement>('.label')!
    const input = shadowRoot.querySelector('input')!
    const textarea = shadowRoot.querySelector('textarea')!
    const actions = shadowRoot.querySelector<HTMLDivElement>('.actions')!
    const clearAction = shadowRoot.querySelector<HTMLDivElement>('.action.clear')!
    const pwdToggleAction = shadowRoot.querySelector<HTMLDivElement>('.action.password-toggle')!
    const searchAction = shadowRoot.querySelector<HTMLDivElement>('.action.search')!
    const micAction = shadowRoot.querySelector<HTMLDivElement>('.action.mic')!
    const count = shadowRoot.querySelector<HTMLDivElement>('.count')!
    const getEditor = () => this.type === 'multiline' ? textarea : input
    const setAttribute = (name: string, value?: string) => {
      if (value === undefined) {
        input.removeAttribute(name)
        textarea.removeAttribute(name)
        return
      }
      input.setAttribute(name, value)
      textarea.setAttribute(name, value)
    }
    const shadow = document.createElement('div')
    const setValue = (v: string, dispatched?: true) => {
      fieldSet.classList.toggle('no-empty', v !== '')
      const editor = getEditor()
      editor.value = v
      fieldSet.floating = v === '' && !this.showError && editor.validity.valid && !this.matches(':focus')
      setCount()
      if (dispatched) {
        this.dispatchEvent(new InputEvent('input'))
        this.dispatchEvent(new Event('change'))
      }
    }
    const focus = () => {
      const editor = getEditor()
      fieldSet.floating = false
      fieldSet.focused = true
      editor.focus()
    }
    const blur = () => {
      const editor = getEditor()
      if (!this.showError && editor.value === '' && editor.validity.valid) fieldSet.floating = true
      fieldSet.focused = false
    }
    const setCount = () => {
      if (this.showCount && this.maxLength > -1) count.textContent = `${getEditor().value.length}/${this.maxLength}`
    }
    input.onfocus = textarea.onfocus = focus
    input.onblur = textarea.onblur = blur
    input.oninput = textarea.oninput = (e) => {
      e.stopPropagation()
      fieldSet.classList.toggle('no-empty', this.value !== '')
      setCount()
      this.dispatchEvent(new InputEvent('input'))
    }
    input.onchange = textarea.onchange = (e) => {
      e.stopPropagation()
      this.dispatchEvent(new Event('change'))
    }
    this.addEventListener('focus', focus)
    this.addEventListener('blur', blur)
    actions.onpointerdown = (e) => e.preventDefault()
    clearAction.onclick = () => {
      if (this.type === 'number') setValue('0')
      setValue('', true)
    }
    pwdToggleAction.onclick = () => input.type = input.type === 'password' ? 'text' : 'password'
    searchAction.onclick = () => this.dispatchEvent(new Event('search'))
    if (support.speechRecognition) {
      micAction.classList.add('supported')
      const rec = new Recognition()
      micAction.onclick = () => {
        const is = micAction.classList.toggle('monitoring')
        if (!is) return rec.stop()
        const texts: string[] = []
        rec.start({
          lang: this.micLang,
          onResult: (res) => {
            const text = res[0].transcript
            if (res.isFinal) return texts.push(text)
            setValue(texts.join('') + text, true)
          },
          onError: () => {
            micAction.classList.remove('monitoring')
          }
        })
      }
    }
    const showCount = () => {
      const is = this.maxLength > -1 && this.showCount
      count.classList.toggle('enabled', is)
      setCount()
    }
    focusKeydownClick(clearAction, pwdToggleAction, searchAction, micAction)
    if (!support.fieldSizing) {
      shadow.className = 'shadow'
      shadow.part = 'textarea-shadow'
      textarea.before(shadow)
      textarea.addEventListener('input', () => shadow.textContent = textarea.value)
    }
    return {
      expose: {
        getEditor,
        get value() {
          return getEditor().value
        }
      },
      label: (v) => label.setAttribute('data-label', v),
      type: (v, old) => {
        input.type = v
        const multi = 'multiline'
        fieldSet.classList.toggle('multi-line', v === multi)
        if (v === multi) textarea.value = input.value
        if (old === multi) input.value = textarea.value
      },
      value: (v) => setValue(v),
      placeholder: (v) => setAttribute('placeholder', v),
      autoComplete: (v) => setAttribute('autocomplete', v),
      inputMode: (v) => setAttribute('inputmode', v),
      maxLength: (v) => {
        setAttribute('maxlength', v < 0 ? undefined : String(v))
        showCount()
      },
      showCount: showCount,
      showError: (v) => {
        fieldSet.floating = false
      },
      showPasswordToggle: (v) => {
        if (!v && this.type === 'password') input.type = 'password'
      }
    }
  }
}) { }

const name = TextField.define('s-text-field')

declare global {
  interface HTMLElementTagNameMap {
    [name]: TextField
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        //@ts-ignore
        [name]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Partial<typeof props.values>
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
      $props: HTMLAttributes & Partial<typeof props.values>
    } & TextField
  }
}
//@ts-ignore
declare module 'vue/jsx-runtime' {
  namespace JSX {
    export interface IntrinsicElements {
      //@ts-ignore
      [name]: IntrinsicElements['div'] & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSX.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}

//@ts-ignore
declare module 'preact' {
  namespace JSX {
    interface IntrinsicElements {
      //@ts-ignore
      [name]: JSXInternal.HTMLAttributes<HTMLElement> & Partial<typeof props.values>
    }
  }
}