import { builder, html } from './core/element.js';
import { device } from './core/utils.js';
const style = /*css*/ `
:host{
  display: block;
  color: var(--s-color-primary, #006495);
  height: 40px;
  cursor: pointer;
  position: relative;
}
:host([disabled=true]){
  pointer-events: none;
  opacity: .38;
}
.wrapper{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  pointer-events: none;
}
.track{
  width: calc(100% - 20px);
  height: 4px;
  overflow: hidden;
  position: relative;
  background: var(--s-color-surface-container-highest, #e2e2e5);
}
:host([disabled=true]) .track{
  background: color-mix(in srgb, var(--s-color-on-surface, #1a1c1e) 31.57894736842105%, transparent);
}
.track>.active-track{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: currentColor;
  transform: translateX(-50%);
}
:host([disabled=true]) .track>.active-track{
  background: var(--s-color-on-surface, #1a1c1e);
}
.container{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transform: translateX(calc(-50% + 20px));
}
.container::before{
  content:'';
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: currentColor;
  filter: opacity(0);
  transition: filter .2s;
}
.active.container::before{
  filter: opacity(.12);
}
.handle{
  width: 20px;
  height: 20px;
  background: currentColor;
  border-radius: 50%;
  box-shadow: var(--s-elevation-level1, 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12));
  margin: 10px;
}
:host([disabled=true]) .handle{
  background: var(--s-color-on-surface, #1a1c1e);
  box-shadow: none;
}
.label{
  position: absolute;
  right: 6px;
  margin-bottom: 28px;
  width: 28px;
  height: 28px;
  filter: opacity(0);
  transition: filter .2s,transform .2s;
  transform: scale(.5) translateY(100%);
  transform-origin: center;
  display: none;
}
:host([labeled=true]) .label{
  display: block;
}
.active>.label{
  filter: opacity(1);
  transform: scale(1) translateY(0%);
}
.label::before{
  content: '';
  position: absolute;
  background: currentColor;
  bottom: 23px;
  left: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.label::after{
  content: '';
  width: 0;
  display: block;
  border-color: currentColor;
  border-top: 14px solid currentColor;
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  margin-left: 3px;
}
.label>span{
  position: absolute;
  color: var(--s-color-on-primary, #ffffff);
  font-size: .625rem;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -22px;
}
.native{
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
}
.native>input{
  margin: 0;
  height: 100%;
  width: calc(100% - 20px);
  cursor: inherit;
}
`;
const name = 's-slider';
const props = {
    disabled: false,
    labeled: false,
    max: 100,
    min: 0,
    step: 1,
    value: 50,
};
export default class Component extends builder({
    name, style, props, propSyncs: ['disabled', 'labeled'],
    setup() {
        let activeTrack;
        let container;
        let slider;
        let label;
        const render = () => {
            if (!this.isConnected)
                return;
            const value = Number(slider.value);
            const percentage = ((value - this.min) * 100) / this.max - this.min;
            const remain = 100 - percentage;
            activeTrack.style.transform = `translateX(-${remain}%)`;
            container.style.transform = `translateX(calc(-${remain}% + ${remain * 0.4}px))`;
            this.value = Number(slider.value);
            label.textContent = slider.value;
        };
        return {
            created: () => {
                slider.addEventListener('change', () => this.dispatchEvent(new Event('change')));
                slider.addEventListener('input', () => {
                    render();
                    this.dispatchEvent(new Event('input'));
                });
                slider.addEventListener('mousedown', (event) => event.button === 0 && !device.touched && container.classList.add('active'));
                slider.addEventListener('mouseup', () => !device.touched && container.classList.remove('active'));
                slider.addEventListener('touchstart', () => device.touched && container.classList.add('active'), { passive: true });
                slider.addEventListener('touchend', () => device.touched && container.classList.remove('active'), { passive: true });
                slider.addEventListener('touchcancel', () => device.touched && container.classList.remove('active'), { passive: true });
            },
            watches: {
                max: (value) => {
                    const val = String(value);
                    if (slider.max === val)
                        return;
                    slider.max = val;
                    render();
                },
                min: (value) => {
                    const val = String(value);
                    if (slider.min === val)
                        return;
                    slider.min = val;
                    render();
                },
                step: (value) => {
                    const val = String(value);
                    if (slider.step === val)
                        return;
                    slider.step = val;
                    render();
                },
                value: (value) => {
                    const val = String(value);
                    if (slider.value === val)
                        return;
                    slider.value = val;
                    render();
                }
            },
            render: () => html `
        <div class="wrapper">
          <div class="track">
            <div class="active-track" ref="${(el) => activeTrack = el}"></div>
          </div>
          <div class="container labeled" ref="${(el) => container = el}">
            <div class="handle"></div>
            <div class="label">
              <span ref="${(el) => label = el}">${this.value}</span>
            </div>
          </div>
        </div>
        <div class="native">
          <input ref="${(el) => slider = el}" type="range" max="${this.max}" min="${this.min}" step="${this.step}" value="${this.value}" />
        </div>
      `
        };
    }
}) {
}
Component.define();
