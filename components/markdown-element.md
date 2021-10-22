# Markdown Element

[component-header:sl-markdown-element]

A description of the component goes here.


```html preview
<sl-select id='selectSelct' label='选择markdown 文件'>
</sl-select>
<sl-markdown-element  id='markObj'></sl-markdown-element>
<script>
    let markObj=document.querySelector('#markObj');
    let selectSelct=document.querySelector('#selectSelct');
    markObj.mdsrc='/assets/prism-themes/vditor.md';
    const array=['vditor.md','components.md','More Documents.md','Change Log.md','Markdown Reference.md','README.md'];
    let str='';
    for(let file of array){
        var d=`<sl-menu-item value='${file}'>${file}</sl-menu-item>`;
        str+=d;
    }
    selectSelct.innerHTML=str;
    selectSelct.value='vditor.md';
    selectSelct.addEventListener('sl-change',(event)=>{
        markObj.mdsrc=`/assets/prism-themes/${event.target.value}`;
    });
</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-markdown-element]
