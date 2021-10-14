# Gallery

[component-header:sl-gallery]

Responsive and flexible carousel component with thumbnail support .

```html preview
<sl-gallery id='galleryDiv' style='--thumb-image-size:100px;--sl-image-transition-time:340ms;' thumb-position='bottom'>
    <span >美好的一天</span>
</sl-gallery>
<sl-button-group id='groupDIV' style='margin:10 pax'>
    <sl-button type='primary' >bottom</sl-button>
    <sl-button  >top</sl-button>
    <sl-button  >left</sl-button>
    <sl-button  >right</sl-button>
</sl-button-group>
<script>
    let galleryDiv=document.querySelector('#galleryDiv');
    let groupDIV=document.querySelector('#groupDIV');
    const images=[];
    for(let i=0;i<11;i++){
        images.push(`https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria${i+1}.jpg`);
    }
   galleryDiv.images=images;
   const thumb_images=[];
   for(let i=0;i<11;i++){
       thumb_images.push(`https://primefaces.org/primeng/showcase/assets/showcase/images/galleria/galleria${i+1}s.jpg`);
   }
   galleryDiv.thumb_images=thumb_images;

    galleryDiv.image_datas=galleryDiv.images;
    // galleryDiv.imageRender=(image,index)=>{
    //     return html`<span> ${image} </span>`;
    // };
groupDIV.querySelectorAll('sl-button').forEach(item=>{
    item.addEventListener('click',(event)=>{
        galleryDiv.thumbPosition=event.target.textContent;
        groupDIV.querySelectorAll('sl-button').forEach((temp)=>{
            temp.type=temp==event.target?'primary':'default';
        })
    })
})


</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-gallery]
