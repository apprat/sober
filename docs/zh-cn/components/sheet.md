# sheet

```html preview
<s-sheet>
  <div slot="legend">大江东去，浪淘尽，千古风流人物</div>
  <div slot="body">
    大江东去，浪淘尽，千古风流人物。<br>
    故垒西边，人道是，三国周郎赤壁。<br>
    乱石穿空，惊涛拍岸，卷起千堆雪。(穿空 一作：崩云)<br>
    江山如画，一时多少豪杰。
  </div>
</s-sheet>
<hr>
<s-sheet focused>
  <div slot="legend">大江东去，浪淘尽，千古风流人物</div>
  <s-icon slot="start"></s-icon>
  <div slot="body">
    大江东去，浪淘尽，千古风流人物。<br>
    故垒西边，人道是，三国周郎赤壁。<br>
    乱石穿空，惊涛拍岸，卷起千堆雪。(穿空 一作：崩云)<br>
    江山如画，一时多少豪杰。
  </div>
  <s-icon slot="end"></s-icon>
</s-sheet>
<hr>
<s-sheet floating>
  <div slot="legend">大江东去，浪淘尽，千古风流人物</div>
  <div slot="body">
    大江东去，浪淘尽，千古风流人物
  </div>
</s-sheet>
<hr>
<s-sheet style="--s-field-set-border-radius: 24px">
  <div slot="legend">大江东去，浪淘尽，千古风流人物</div>
  <div slot="body">
    大江东去，浪淘尽，千古风流人物
  </div>
</s-sheet>
<hr>
<s-sheet style="--s-field-set-border-radius: 24px" floating>
  <div slot="legend">大江东去，浪淘尽，千古风流人物</div>
</s-sheet>
<hr>
<s-sheet style="--s-field-set-border-radius: 24px;--s-field-set-legend-gap: 8px" floating>
  <div slot="legend">大江东去，浪淘尽，千古风流人物x</div>
</s-sheet>
<s-button onclick="document.querySelectorAll('s-sheet').forEach(item=>item.floating=!item.floating)">切换</s-button>
```
