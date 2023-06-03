import { defineElement, IntrinsicElement } from './base/core'

const render = function (this: { onThumbPress: Function }) {
  return <>
    <style jsx>{`
    :host{
      -webkit-user-select: none;
      user-select: none;
      display: block;
      color: var(--s-color-primary);
      height: 40px;
      cursor: pointer;
      background: rgba(0,0,0,.04);
    }
    :host([disabled=true]){
      pointer-events: none !important;
      filter: grayscale(.8) opacity(.6) !important;
    }
    .wrapper{
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
    }
    .track{
      width: 100%;
      height: 4px;
      padding: 0 10px;
    }
    .track>.block{
      height: 100%;
      background: var(--s-color-on-surface-variant);
      border-radius: 2px;
      opacity: .38;
    }
    .track>.active{
      position: absolute;
      left: 0;
      background: currentColor;
      height: 4px;
      border-radius: 2px;
    }
    .thumb{
      position: absolute;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .thumb>div{
      position: absolute;
      border-radius: 50%;
      background: currentColor;
    }
    .thumb>.state{
      filter: opacity(.24);
      pointer-events: none;
      transition: filter .2s;
      width: 100%;
      height: 100%;
    }
    .thumb>.active{
      width: 20px;
      height: 20px;
    }
    `}</style>
    <div class="wrapper" ref="wrapper">
      <div class="track">
        <div class="block"></div>
        <div class="active" ref="track"></div>
      </div>
      <div class="thumb" onMousedown={(e: MouseEvent) => this.onThumbPress(e)} ref="thumb">
        <div class="state"></div>
        <div class="active"></div>
      </div>
      <div class="label"></div>
    </div>
  </>
}

const name = 's-slider'
const props = {
  type: 'continuous' as 'continuous' | 'discrete',
  disabled: false,
  labeled: false,
  orientation: 'horizontal' as 'horizontal' | 'vertical',
  max: 1000,
  min: 0,
  step: 100,
  value: 0
}

export default defineElement({
  name, props, render,
  created() {
    //
  }
})

declare global {
  namespace JSX {
    interface IntrinsicElements extends IntrinsicElement<typeof name, typeof props> { }
  }
}

// export interface Property {
//   disabled: boolean
//   labeled: boolean
//   type: 'continuous' | 'discrete'
//   orientation: 'horizontal' | 'vertical',
//   max: number
//   min: number
//   step: number
//   value: number
// }

// class Constructor extends Component<Property> {
//   property: Property = {
//     type: 'continuous',
//     disabled: false,
//     labeled: false,
//     orientation: 'horizontal',
//     max: 1000,
//     min: 0,
//     step: 100,
//     value: 0
//   }
//   state = { pressed: false, moved: false }
//   refs = { wrapper: new Ref(), track: new Ref(), thumb: new Ref() }
//   onThumbPress(event: MouseEvent) {
//     const rect = this.element.getBoundingClientRect()
//     const state = {
//       pageX: event.pageX,
//       stepWidth: rect.width / (this.property.max / this.property.step),
//     }
//     const correction = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))
//     const onMove = (event: MouseEvent) => {
//       const diff = event.pageX - state.pageX //距离
//       const decrease = correction(diff / (rect.width / 40), 0, 40) //thumb width
//       const percentage = correction(((diff + decrease) * 100) / rect.width, 0, 100)
//       this.refs.thumb.value!.style.left = `calc(${percentage}% - ${percentage * 0.4}px)`
//       const value = parseInt(String(this.property.max * (percentage / 100)))
//       console.log(value)
//     }
//     const onRelease = () => {
//       document.removeEventListener('mousemove', onMove)
//       document.removeEventListener('mouseup', onRelease)
//     }
//     document.addEventListener('mousemove', onMove)
//     document.addEventListener('mouseup', onRelease)
//   }
//   setValue() {
//   }
//   onPropertyChanged(name: keyof Property) {
//     switch (name) {
//       case 'value':
//         // const percentage = ((this.property.value - this.property.min) * 100) / (this.property.max - this.property.min)
//         // this.refs.track.value!.style.width = `${percentage}%`
//         // this.refs.thumb.value!.style.left = `calc(${percentage}% - ${percentage * 0.2}px)`
//         break
//     }
//   }
//   render() {
//     return <>
//       <style jsx>{`
//         :host{
//           -webkit-user-select: none;
//           user-select: none;
//           display: block;
//           color: var(--s-color-primary);
//           height: 40px;
//           cursor: pointer;
//           background: rgba(0,0,0,.04);
//         }
//         :host([disabled=true]){
//           pointer-events: none !important;
//           filter: grayscale(.8) opacity(.6) !important;
//         }
//         .wrapper{
//           position: relative;
//           height: 100%;
//           display: flex;
//           align-items: center;
//         }
//         .track{
//           width: 100%;
//           height: 4px;
//           padding: 0 10px;
//         }
//         .track>.block{
//           height: 100%;
//           background: var(--s-color-on-surface-variant);
//           border-radius: 2px;
//           opacity: .38;
//         }
//         .track>.active{
//           position: absolute;
//           left: 0;
//           background: currentColor;
//           height: 4px;
//           border-radius: 2px;
//         }
//         .thumb{
//           position: absolute;
//           width: 40px;
//           height: 40px;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         .thumb>div{
//           position: absolute;
//           border-radius: 50%;
//           background: currentColor;
//         }
//         .thumb>.state{
//           filter: opacity(.24);
//           pointer-events: none;
//           transition: filter .2s;
//           width: 100%;
//           height: 100%;
//         }
//         .thumb>.active{
//           width: 20px;
//           height: 20px;
//         }
//       `}</style>
//       <div class="wrapper" ref={this.refs.wrapper}>
//         <div class="track">
//           <div class="block"></div>
//           <div class="active" ref={this.refs.track}></div>
//         </div>
//         <div class="thumb" onmousedown={(ev: MouseEvent) => this.onThumbPress(ev)} ref={this.refs.thumb}>
//           <div class="state"></div>
//           <div class="active"></div>
//         </div>
//         <div class="label"></div>
//       </div>
//     </>
//   }
// }

// const name = 's-slider'
// export default define(name, Constructor)

// declare global {
//   namespace JSX {
//     interface IntrinsicElements extends IntrinsicElement<typeof name, Property> { }
//   }
// }