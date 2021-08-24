# Date Panel

[component-header:sl-date-panel]

A description of the component goes here.

```html preview
<sl-button-group id='groupDIV'>
    <sl-button type='primary'>date</sl-button>
    <sl-button >month</sl-button>
    <sl-button >year</sl-button>
</sl-button-group>
<sl-date-panel id='datePenl'></sl-date-panel>
<script>
    let datePenl=document.querySelector('#datePenl');
    let groupDIV=document.querySelector('#groupDIV');
    groupDIV.querySelectorAll('sl-button').forEach(item=>{
        item.addEventListener('click',(event)=>{
            var target=event.target;
             groupDIV.querySelectorAll('sl-button').forEach(temp=>{
                 temp.type=target==temp?'primary':'default';
             })
            datePenl.mode=target.textContent;
        });
    })

</script>
```

## Examples

### First Example

TODO

### Second Example

TODO

[component-metadata:sl-date-panel]
