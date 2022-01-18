import { html, ReactiveElement } from "lit";
import { emitEvent } from "../../internal/event";
import { getCssValue } from "../../utilities/common";
import { dragOnHandler, Poniter } from "../../utilities/dragHelper";
import { DisposeObject } from "../../utilities/resize.util";

const parseAsNumber=(value:string)=>{
    let v=parseInt(value);
    if(isNaN(v)){
        v=0;
    }
    return v;
}

const resizeHelper={
    top:(div:HTMLElement,pos:Poniter)=>{
        pos.y=0-pos.y;
        resizeHelper.bottom(div,pos);
    },
    bottom:(div:HTMLElement,pos:Poniter)=>{
        let height=parseAsNumber(getCssValue(div,'height'));
        height+=pos.y;
        div.style.height=height+'px';
    },
    left:(div:HTMLElement,pos:Poniter)=>{
        pos.x=0-pos.x;
        resizeHelper.right(div,pos);
    },
    right:(div:HTMLElement,pos:Poniter)=>{
        let width=parseAsNumber(getCssValue(div,'width'));
        width+=pos.x;
        div.style.width=width+'px';
    },
    'left-top':(div :HTMLElement,pos:Poniter)=>{
        resizeHelper.left(div,pos);
        resizeHelper.top(div,pos);
    },
    'left-bottom':(div :HTMLElement,pos:Poniter)=>{
        resizeHelper.left(div,pos);
        resizeHelper.bottom(div,pos);
    },
    'right-top':(div :HTMLElement,pos:Poniter)=>{
        resizeHelper.right(div,pos);
        resizeHelper.top(div,pos);
    },
    'right-bottom':(div :HTMLElement,pos:Poniter)=>{
        resizeHelper.right(div,pos);
        resizeHelper.bottom(div,pos);
    }
}
export const renderResizeAble=()=>{
    const array=[];
    for(const key in resizeHelper){
        array.push(html`<div class='resize_heler' pos='${key}'></div>`);
    }
    return array;
}

export const dragResizeController=(el:ReactiveElement)=>{
    let drag_dispose:DisposeObject;
    let move_dispose:DisposeObject;
    el.addController({
        hostUpdated(){
            if(drag_dispose){
                drag_dispose.dispose();
            }
            if(move_dispose){
                move_dispose.dispose();
            }
            const div=el.renderRoot.querySelector('div.dialog__panel') as HTMLElement;
            drag_dispose=  dragOnHandler(div,'div.resize_heler',(pointer:Poniter,event:MouseEvent)=>{
                const el=event.delegateTarget;
                const pos=el.getAttribute('pos') as 'top' ;
                const hander=resizeHelper[pos];
                if(hander!=undefined){
                    const event=emitEvent(el,'sl-resize-position-before',{
                        cancelable:true,
                        detail: {
                            pos:pos,
                            pointer,
                        },
                    });
                    if(!event.defaultPrevented){
                        hander(div,pointer);
                        emitEvent(el,'sl-resize-position',{
                            detail: {
                                pos:pos,
                                pointer,
                            }
                        })
                    }
                   
                }
            });
            move_dispose=dragOnHandler(div,'span.dialog__title',(pointer:Poniter)=>{
                let top=parseAsNumber(getCssValue(div,'top'));
                let left=parseAsNumber(getCssValue(div,'left'));
                top+=pointer.y;
                left+=pointer.x;
                div.style.left=left+'px';
                div.style.top=top+'px';
                
            })
        },
        hostDisconnected(){
            if(drag_dispose){
                drag_dispose.dispose();
            }
        }
    })
}