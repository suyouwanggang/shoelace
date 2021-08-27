# sl-ac-panel

## Properties

| Property         | Attribute | Modifiers | Type                 | Default |
|------------------|-----------|-----------|----------------------|---------|
| `active`         | `active`  |           | `boolean`            | false   |
| `collapsePane`   |           | readonly  | `SlCollapse \| null` |         |
| `contentElement` |           | readonly  | `HTMLElement`        |         |
| `header`         | `header`  |           | `string`             |         |
| `key`            | `key`     |           | `string`             |         |

## Methods

| Method         | Type                    |
|----------------|-------------------------|
| `renderHeader` | `(): TemplateResult<1>` |

## Slots

| Name           | Description                                  |
|----------------|----------------------------------------------|
|                | The content slot.                            |
| `header`       | header title slot                            |
| `header-extra` | header-extra slot ,use for header right icon |
| `trigger-icon` | slot used  before title                      |

## CSS Shadow Parts

| Part           | Description                   |
|----------------|-------------------------------|
| `base`         | The component's base wrapper. |
| `content`      | The component content div.    |
| `trigger-icon` | The header icon part.         |

## CSS Custom Properties

| Property                           | Description                               |
|------------------------------------|-------------------------------------------|
| `--ac-content-padding`             | the component content  container padding. |
| `--ac-header-color`                | header font color.                        |
| `--ac-header-font-size`            | header font size.                         |
| `--ac-header-padding`              | header padding.                           |
| `--ac-tab-active-background-color` | header active background-color.           |


# sl-alert

## Properties

| Property   | Attribute  | Type                                             | Default    | Description                                      |
|------------|------------|--------------------------------------------------|------------|--------------------------------------------------|
| `base`     |            | `HTMLElement`                                    |            |                                                  |
| `closable` | `closable` | `boolean`                                        | false      | Makes the alert closable.                        |
| `duration` | `duration` | `number`                                         | "Infinity" | The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with<br />the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`. |
| `open`     | `open`     | `boolean`                                        | false      | Indicates whether or not the alert is open. You can use this in lieu of the show/hide methods. |
| `type`     | `type`     | `"primary" \| "success" \| "neutral" \| "warning" \| "danger"` | "primary"  | The type of alert.                               |

## Methods

| Method                 | Type                | Description                                      |
|------------------------|---------------------|--------------------------------------------------|
| `handleCloseClick`     | `(): void`          |                                                  |
| `handleDurationChange` | `(): void`          |                                                  |
| `handleMouseMove`      | `(): void`          |                                                  |
| `handleOpenChange`     | `(): Promise<void>` |                                                  |
| `hide`                 | `(): Promise<void>` | Hides the alert                                  |
| `restartAutoHide`      | `(): void`          |                                                  |
| `show`                 | `(): Promise<void>` | Shows the alert.                                 |
| `toast`                | `(): Promise<void>` | Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when<br />dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by<br />calling this method again. The returned promise will resolve after the alert is hidden. |

## Events

| Event           | Description                                      |
|-----------------|--------------------------------------------------|
| `sl-after-hide` | Emitted after the alert closes and all transitions are complete. |
| `sl-after-show` | Emitted after the alert opens and all transitions are complete. |
| `sl-hide`       | Emitted when the alert closes.                   |
| `sl-show`       | Emitted when the alert opens.                    |

## Slots

| Name   | Description                   |
|--------|-------------------------------|
|        | The alert's content.          |
| `icon` | An icon to show in the alert. |

## CSS Shadow Parts

| Part           | Description                              |
|----------------|------------------------------------------|
| `base`         | The component's base wrapper.            |
| `close-button` | The close button.                        |
| `icon`         | The container that wraps the alert icon. |
| `message`      | The alert message.                       |

## CSS Custom Properties

| Property       | Description             |
|----------------|-------------------------|
| `--box-shadow` | The alert's box shadow. |


# sl-animation

## Properties

| Property         | Attribute         | Type                       | Default    | Description                                      |
|------------------|-------------------|----------------------------|------------|--------------------------------------------------|
| `currentTime`    |                   | `number`                   |            | Gets and sets the current animation time.        |
| `defaultSlot`    |                   | `Promise<HTMLSlotElement>` |            |                                                  |
| `delay`          | `delay`           | `number`                   | 0          | The number of milliseconds to delay the start of the animation. |
| `direction`      | `direction`       | `PlaybackDirection`        | "normal"   | Determines the direction of playback as well as the behavior when reaching the end of an iteration. |
| `duration`       | `duration`        | `number`                   | 1000       | The number of milliseconds each iteration of the animation takes to complete. |
| `easing`         | `easing`          | `string`                   | "linear"   | The easing function to use for the animation. This can be a Shoelace easing function or a custom easing function<br />such as `cubic-bezier(0, 1, .76, 1.14)`. |
| `endDelay`       | `end-delay`       | `number`                   | 0          | The number of milliseconds to delay after the active period of an animation sequence. |
| `fill`           | `fill`            | `FillMode`                 | "auto"     | Sets how the animation applies styles to its target before and after its execution. |
| `iterationStart` | `iteration-start` | `number`                   | 0          | The offset at which to start the animation, usually between 0 (start) and 1 (end). |
| `iterations`     | `iterations`      | `number`                   | "Infinity" | The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. |
| `keyframes`      |                   | `Keyframe[]`               |            | The keyframes to use for the animation. If this is set, `name` will be ignored. |
| `name`           | `name`            | `string`                   | "none"     | The name of the built-in animation to use. For custom animations, use the `keyframes` prop. |
| `play`           | `play`            | `boolean`                  | false      | Plays the animation. When omitted, the animation will be paused. This prop will be automatically removed when the<br />animation finishes or gets canceled. |
| `playbackRate`   | `playback-rate`   | `number`                   | 1          | Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this<br />to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This<br />value can be changed without causing the animation to restart. |

## Methods

| Method                     | Type                   | Description                                      |
|----------------------------|------------------------|--------------------------------------------------|
| `cancel`                   | `(): void`             | Clears all KeyframeEffects caused by this animation and aborts its playback. |
| `createAnimation`          | `(): Promise<boolean>` |                                                  |
| `destroyAnimation`         | `(): void`             |                                                  |
| `finish`                   | `(): void`             | Sets the playback time to the end of the animation corresponding to the current playback direction. |
| `handleAnimationCancel`    | `(): void`             |                                                  |
| `handleAnimationChange`    | `(): Promise<void>`    |                                                  |
| `handleAnimationFinish`    | `(): void`             |                                                  |
| `handlePlayChange`         | `(): boolean`          |                                                  |
| `handlePlaybackRateChange` | `(): void`             |                                                  |
| `handleSlotChange`         | `(): void`             |                                                  |

## Events

| Event       | Description                                    |
|-------------|------------------------------------------------|
| `sl-cancel` | Emitted when the animation is canceled.        |
| `sl-finish` | Emitted when the animation finishes.           |
| `sl-start`  | Emitted when the animation starts or restarts. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The element to animate. If multiple elements are to be animated, wrap them in a single container. |


# sl-avatar

## Properties

| Property   | Attribute  | Type                                | Default  | Description                                      |
|------------|------------|-------------------------------------|----------|--------------------------------------------------|
| `alt`      | `alt`      | `string`                            |          | Alternative text for the image.                  |
| `image`    | `image`    | `string`                            |          | The image source to use for the avatar.          |
| `initials` | `initials` | `string`                            |          | Initials to use as a fallback when no image is available (1-2 characters max recommended). |
| `shape`    | `shape`    | `"circle" \| "square" \| "rounded"` | "circle" | The shape of the avatar.                         |

## Slots

| Name   | Description                                      |
|--------|--------------------------------------------------|
| `icon` | The default icon to use when no image or initials are present. |

## CSS Shadow Parts

| Part       | Description                                   |
|------------|-----------------------------------------------|
| `base`     | The component's base wrapper.                 |
| `icon`     | The container that wraps the avatar icon.     |
| `image`    | The avatar image.                             |
| `initials` | The container that wraps the avatar initials. |

## CSS Custom Properties

| Property | Description             |
|----------|-------------------------|
| `--size` | The size of the avatar. |


# sl-badge

## Properties

| Property | Attribute | Type                                             | Default   | Description                                  |
|----------|-----------|--------------------------------------------------|-----------|----------------------------------------------|
| `pill`   | `pill`    | `boolean`                                        | false     | Draws a pill-style badge with rounded edges. |
| `pulse`  | `pulse`   | `boolean`                                        | false     | Makes the badge pulsate to draw attention.   |
| `type`   | `type`    | `"primary" \| "success" \| "neutral" \| "warning" \| "danger"` | "primary" | The badge's type.                            |

## Slots

| Name | Description          |
|------|----------------------|
|      | The badge's content. |

## CSS Shadow Parts

| Part   | Description      |
|--------|------------------|
| `base` | The base wrapper |


# sl-button-group

## Properties

| Property      | Attribute | Type              | Default | Description                                      |
|---------------|-----------|-------------------|---------|--------------------------------------------------|
| `defaultSlot` |           | `HTMLSlotElement` |         |                                                  |
| `label`       | `label`   | `string`          | ""      | A label to use for the button group's `aria-label` attribute. |

## Methods

| Method             | Type                              |
|--------------------|-----------------------------------|
| `handleBlur`       | `(event: CustomEvent<any>): void` |
| `handleFocus`      | `(event: CustomEvent<any>): void` |
| `handleMouseOut`   | `(event: CustomEvent<any>): void` |
| `handleMouseOver`  | `(event: CustomEvent<any>): void` |
| `handleSlotChange` | `(): void`                        |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | One or more `<sl-button>` elements to display in the button group. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-button

## Properties

| Property   | Attribute  | Type                                             | Default   | Description                                      |
|------------|------------|--------------------------------------------------|-----------|--------------------------------------------------|
| `button`   |            | `HTMLButtonElement \| HTMLLinkElement`           |           |                                                  |
| `caret`    | `caret`    | `boolean`                                        | false     | Draws the button with a caret for use with dropdowns, popovers, etc. |
| `circle`   | `circle`   | `boolean`                                        | false     | Draws a circle button.                           |
| `disabled` | `disabled` | `boolean`                                        | false     |                                                  |
| `download` | `download` | `string`                                         |           | Tells the browser to download the linked file as this filename. Only used when `href` is set. |
| `href`     | `href`     | `string`                                         |           | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. |
| `loading`  | `loading`  | `boolean`                                        | false     | Draws the button in a loading state.             |
| `name`     | `name`     | `string`                                         |           | An optional name for the button. Ignored when `href` is set. |
| `pill`     | `pill`     | `boolean`                                        | false     | Draws a pill-style button with rounded edges.    |
| `rippleed` | `rippleed` | `boolean`                                        | true      | default ripple animate enabled , false remove ripple animate |
| `size`     | `size`     | `"small" \| "medium" \| "large"`                 | "medium"  | The button's size.                               |
| `submit`   | `submit`   | `boolean`                                        | false     | Indicates if activating the button should submit the form. Ignored when `href` is set. |
| `target`   | `target`   | `"_blank" \| "_parent" \| "_self" \| "_top"`     |           | Tells the browser where to open the link. Only used when `href` is set. |
| `type`     | `type`     | `"primary" \| "success" \| "neutral" \| "warning" \| "danger" \| "default" \| "text"` | "default" | The button's type.                               |
| `value`    | `value`    | `string`                                         |           | An optional value for the button. Ignored when `href` is set. |

## Methods

| Method             | Type                                          | Description                      |
|--------------------|-----------------------------------------------|----------------------------------|
| `blur`             | `(): void`                                    | Removes focus from the button.   |
| `click`            | `(): void`                                    | Simulates a click on the button. |
| `focus`            | `(options?: FocusOptions \| undefined): void` | Sets focus on the button.        |
| `handleBlur`       | `(): void`                                    |                                  |
| `handleClick`      | `(event: MouseEvent): void`                   |                                  |
| `handleFocus`      | `(): void`                                    |                                  |
| `handleSlotChange` | `(): void`                                    |                                  |

## Events

| Event      | Description                          |
|------------|--------------------------------------|
| `sl-blur`  | Emitted when the button loses focus. |
| `sl-focus` | Emitted when the button gains focus. |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | The button's label.                              |
| `prefix` | Used to prepend an icon or similar element to the button. |
| `suffix` | Used to append an icon or similar element to the button. |

## CSS Shadow Parts

| Part     | Description                     |
|----------|---------------------------------|
| `base`   | The component's base wrapper.   |
| `caret`  | The button's caret.             |
| `label`  | The button's label.             |
| `prefix` | The prefix container.           |
| `ripple` | The component's ripple wrapper. |
| `suffix` | The suffix container.           |


# sl-card

## Methods

| Method             | Type       |
|--------------------|------------|
| `handleSlotChange` | `(): void` |

## Slots

| Name     | Description        |
|----------|--------------------|
|          | The card's body.   |
| `footer` | The card's footer. |
| `header` | The card's header. |
| `image`  | The card's image.  |

## CSS Shadow Parts

| Part     | Description                    |
|----------|--------------------------------|
| `base`   | The component's base wrapper.  |
| `body`   | The card's body.               |
| `footer` | The card's footer, if present. |
| `header` | The card's header, if present. |
| `image`  | The card's image, if present.  |

## CSS Custom Properties

| Property          | Description                                      |
|-------------------|--------------------------------------------------|
| `--border-color`  | The card's border color, including borders that occur inside the card. |
| `--border-radius` | The border radius for card edges.                |
| `--border-width`  | The width of card borders.                       |
| `--padding`       | The padding to use for card sections.*           |


# sl-checkbox

## Properties

| Property        | Attribute       | Type               | Default | Description                                      |
|-----------------|-----------------|--------------------|---------|--------------------------------------------------|
| `checked`       | `checked`       | `boolean`          | false   | Draws the checkbox in a checked state.           |
| `disabled`      | `disabled`      | `boolean`          | false   | Disables the checkbox.                           |
| `indeterminate` | `indeterminate` | `boolean`          | false   | Draws the checkbox in an indeterminate state.    |
| `input`         |                 | `HTMLInputElement` |         |                                                  |
| `invalid`       | `invalid`       | `boolean`          | false   | This will be true when the control is in an invalid state. Validity is determined by the `required` prop. |
| `name`          | `name`          | `string`           |         | The checkbox's name attribute.                   |
| `required`      | `required`      | `boolean`          | false   | Makes the checkbox a required field.             |
| `value`         | `value`         | `string`           |         | The checkbox's value attribute.                  |

## Methods

| Method                 | Type                                          | Description                                      |
|------------------------|-----------------------------------------------|--------------------------------------------------|
| `blur`                 | `(): void`                                    | Removes focus from the checkbox.                 |
| `click`                | `(): void`                                    | Simulates a click on the checkbox.               |
| `focus`                | `(options?: FocusOptions \| undefined): void` | Sets focus on the checkbox.                      |
| `handleBlur`           | `(): void`                                    |                                                  |
| `handleClick`          | `(): void`                                    |                                                  |
| `handleDisabledChange` | `(): void`                                    |                                                  |
| `handleFocus`          | `(): void`                                    |                                                  |
| `handleLabelMouseDown` | `(event: MouseEvent): void`                   |                                                  |
| `handleStateChange`    | `(): void`                                    |                                                  |
| `reportValidity`       | `(): boolean`                                 | Checks for validity and shows the browser's validation message if the control is invalid. |
| `setCustomValidity`    | `(message: string): void`                     | Sets a custom validation message. If `message` is not empty, the field will be considered invalid. |

## Events

| Event       | Description                                      |
|-------------|--------------------------------------------------|
| `sl-blur`   | Emitted when the control loses focus.            |
| `sl-change` | Emitted when the control's checked state changes. |
| `sl-focus`  | Emitted when the control gains focus.            |

## Slots

| Name | Description           |
|------|-----------------------|
|      | The checkbox's label. |

## CSS Shadow Parts

| Part                 | Description                                      |
|----------------------|--------------------------------------------------|
| `base`               | The component's base wrapper.                    |
| `checked-icon`       | The container the wraps the checked icon.        |
| `control`            | The checkbox control.                            |
| `indeterminate-icon` | The container that wraps the indeterminate icon. |
| `label`              | The checkbox label.                              |


# sl-collapse

## Properties

| Property        | Attribute | Modifiers | Type          | Default |
|-----------------|-----------|-----------|---------------|---------|
| `activeTab`     |           | readonly  | `SlAcPanel[]` |         |
| `childTabPanel` |           | readonly  | `SlAcPanel[]` |         |
| `multi`         | `multi`   |           | `boolean`     | false   |

## Methods

| Method           | Type                                       | Description           |
|------------------|--------------------------------------------|-----------------------|
| `findTab`        | `(key: string): SlAcPanel \| undefined`    | 根据key 查找 子sl-ac-panel |
| `findTabByIndex` | `(index: number): SlAcPanel \| null`       |                       |
| `getTabIndex`    | `(tab: SlAcPanel): number`                 | 获取 在父节点中的 index       |
| `setTabToActive` | `(tab: SlAcPanel, active?: boolean): void` |                       |

## Events

| Event                  | Type              | Description                           |
|------------------------|-------------------|---------------------------------------|
| `sl-before-tab-change` | `{tab:SlAcPanel}` | Emitted before a panel active change. |
| `sl-tab-change`        | `{tab:SlAcPanel}` | Emitted when a panel active changed.  |

## Slots

| Name | Description       |
|------|-------------------|
|      | The default slot. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |

## CSS Custom Properties

| Property                     | Description            |
|------------------------------|------------------------|
| `--sl-collapse-border-color` | collapse border color. |


# sl-color-picker

## Properties

| Property         | Attribute          | Type                             | Default                                          | Description                                      |
|------------------|--------------------|----------------------------------|--------------------------------------------------|--------------------------------------------------|
| `disabled`       | `disabled`         | `boolean`                        | false                                            | Disables the color picker.                       |
| `dropdown`       |                    | `SlDropdown`                     |                                                  |                                                  |
| `format`         | `format`           | `"hex" \| "rgb" \| "hsl"`        | "hex"                                            | The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA<br />respectively. The color picker will always accept user input in any format (including CSS color names) and convert<br />it to the desired format. |
| `hoist`          | `hoist`            | `boolean`                        | false                                            | Enable this option to prevent the panel from being clipped when the component is placed inside a container with<br />`overflow: auto\|scroll`. |
| `inline`         | `inline`           | `boolean`                        | false                                            | Renders the color picker inline rather than inside a dropdown. |
| `input`          |                    | `SlInput`                        |                                                  |                                                  |
| `invalid`        | `invalid`          | `boolean`                        | false                                            | This will be true when the control is in an invalid state. Validity is determined by the `setCustomValidity()`<br />method using the browser's constraint validation API. |
| `name`           | `name`             | `string`                         | ""                                               | The input's name attribute.                      |
| `noFormatToggle` | `no-format-toggle` | `boolean`                        | false                                            | Removes the format toggle.                       |
| `opacity`        | `opacity`          | `boolean`                        | false                                            | Whether to show the opacity slider.              |
| `previewButton`  |                    | `HTMLButtonElement`              |                                                  |                                                  |
| `size`           | `size`             | `"small" \| "medium" \| "large"` | "medium"                                         | Determines the size of the color picker's trigger. This has no effect on inline color pickers. |
| `swatches`       |                    | `string[]`                       | ["#d0021b","#f5a623","#f8e71c","#8b572a","#7ed321","#417505","#bd10e0","#9013fe","#4a90e2","#50e3c2","#b8e986","#000","#444","#888","#ccc","#fff"] | An array of predefined color swatches to display. Can include any format the color picker can parse, including<br />HEX(A), RGB(A), HSL(A), and CSS color names. |
| `uppercase`      | `uppercase`        | `boolean`                        | false                                            | By default, the value will be set in lowercase. Set this to true to set it in uppercase instead. |
| `value`          | `value`            | `string`                         | "#ffffff"                                        | The current color.                               |

## Methods

| Method                    | Type                                             | Description                                      |
|---------------------------|--------------------------------------------------|--------------------------------------------------|
| `getFormattedValue`       | `(format?: "hex" \| "rgb" \| "hsl" \| "hexa" \| "rgba" \| "hsla"): string` | Returns the current value as a string in the specified format. |
| `handleAlphaDrag`         | `(event: any): void`                             |                                                  |
| `handleAlphaKeyDown`      | `(event: KeyboardEvent): void`                   |                                                  |
| `handleCopy`              | `(): void`                                       |                                                  |
| `handleDrag`              | `(event: any, container: HTMLElement, onMove: (x: number, y: number): void) => void` |                                                  |
| `handleDropdownAfterHide` | `(): void`                                       |                                                  |
| `handleFormatChange`      | `(): void`                                       |                                                  |
| `handleFormatToggle`      | `(): void`                                       |                                                  |
| `handleGridDrag`          | `(event: any): void`                             |                                                  |
| `handleGridKeyDown`       | `(event: KeyboardEvent): void`                   |                                                  |
| `handleHueDrag`           | `(event: any): void`                             |                                                  |
| `handleHueKeyDown`        | `(event: KeyboardEvent): void`                   |                                                  |
| `handleInputChange`       | `(event: CustomEvent<any>): void`                |                                                  |
| `handleInputKeyDown`      | `(event: KeyboardEvent): void`                   |                                                  |
| `handleOpacityChange`     | `(): void`                                       |                                                  |
| `handleValueChange`       | `(oldValue: string, newValue: string): void`     |                                                  |
| `normalizeColorString`    | `(colorString: string): string`                  |                                                  |
| `parseColor`              | `(colorString: string): false \| { hsl: { h: any; s: any; l: any; string: string; }; hsla: { h: any; s: any; l: any; a: any; string: string; }; rgb: { r: any; g: any; b: any; string: string; }; rgba: { r: any; g: any; b: any; a: any; string: string; }; hex: string; hexa: string; }` |                                                  |
| `reportValidity`          | `(): boolean \| Promise<void>`                   | Checks for validity and shows the browser's validation message if the control is invalid. |
| `setColor`                | `(colorString: string): boolean`                 |                                                  |
| `setCustomValidity`       | `(message: string): void`                        | Sets a custom validation message. If `message` is not empty, the field will be considered invalid. |
| `setLetterCase`           | `(string: string): string`                       |                                                  |
| `syncValues`              | `(): Promise<void>`                              |                                                  |

## Events

| Event | Description                                      |
|-------|--------------------------------------------------|
| `sl`  | change Emitted when the color picker's value changes. |

## CSS Shadow Parts

| Part             | Description                          |
|------------------|--------------------------------------|
| `base`           | The component's base wrapper         |
| `format-button`  | The toggle format button's base.     |
| `grid`           | The color grid.                      |
| `grid-handle`    | The color grid's handle.             |
| `hue-slider`     | The hue slider.                      |
| `input`          | The text input.                      |
| `opacity-slider` | The opacity slider.                  |
| `preview`        | The preview color.                   |
| `slider`         | Hue and opacity sliders.             |
| `slider-handle`  | Hue and opacity slider handles.      |
| `swatch`         | Each individual swatch.              |
| `swatches`       | The container that holds swatches.   |
| `trigger`        | The color picker's dropdown trigger. |

## CSS Custom Properties

| Property               | Description                               |
|------------------------|-------------------------------------------|
| `--grid-handle-size`   | The size of the color grid's handle.      |
| `--grid-height`        | The height of the color grid.             |
| `--grid-width`         | The width of the color grid.              |
| `--slider-handle-size` | The diameter of the slider's handle.      |
| `--slider-height`      | The height of the hue and alpha sliders.  |
| `--swatch-size`        | The size of each predefined color swatch. |


# sl-date-panel

## Properties

| Property          | Attribute | Modifiers | Type                            | Default | Description                                      |
|-------------------|-----------|-----------|---------------------------------|---------|--------------------------------------------------|
| `max`             |           |           | `string \| number \| undefined` |         | 最大值                                              |
| `maxDate`         |           | readonly  | `Date \| null \| undefined`     |         |                                                  |
| `min`             |           |           | `string \| number \| undefined` |         | 最小值                                              |
| `minDate`         |           | readonly  | `Date \| null \| undefined`     |         |                                                  |
| `mode`            | `mode`    |           | `"year" \| "month" \| "date"`   | "date"  | 选择模式，年，月，日                                       |
| `value`           | `value`   |           | `string \| undefined`           |         | 选中日期 ,格式：2018，2018-02, 2018/01， 2018/02/02 ,2018-01-02 |
| `valueDate`       |           |           | `Date \| undefined`             |         | 内部 value 所对应的日期                                  |
| `valueDateString` |           | readonly  | `string`                        |         |                                                  |

## Methods

| Method                  | Type                         |
|-------------------------|------------------------------|
| `naviagtorByKeyCode`    | `(keyCode: string): boolean` |
| `watchSelectModeChange` | `(): void`                   |

## Events

| Event            | Description                 |
|------------------|-----------------------------|
| `sl-date-select` | Emitted when a date select. |

## CSS Shadow Parts

| Part         | Description                                   |
|--------------|-----------------------------------------------|
| `base`       | The component's base wrapper.                 |
| `date-date`  | The component's  select date panel.           |
| `date-month` | The component's  select month panel.          |
| `date-year`  | The component's  select year panel.           |
| `item-date`  | The component's day panel item: item day .    |
| `item-month` | The component's month panel item: item month. |
| `item-year`  | The component's year panel item: item year.   |
| `nextButton` | The component's prevButton .                  |
| `panel-base` | The component's  panel wrap select DIV.       |
| `prevButton` | The component's prevButton .                  |

## CSS Custom Properties

| Property    | Description                     |
|-------------|---------------------------------|
| `--example` | An example CSS custom property. |


# sl-date

## Properties

| Property          | Attribute   | Modifiers | Type                                             | Default        | Description                                      |
|-------------------|-------------|-----------|--------------------------------------------------|----------------|--------------------------------------------------|
| `block`           | `block`     |           | `boolean`                                        | false          | display  as  block div                           |
| `datePanel`       |             |           | `SlDatePanel`                                    |                |                                                  |
| `disabled`        | `disabled`  |           | `boolean`                                        | false          | Disables the input.                              |
| `distance`        |             |           | `number`                                         | 5              | set  dropDown distance for trigger.              |
| `dropDown`        |             |           | `SlDropdown`                                     |                |                                                  |
| `hoist`           |             |           | `boolean`                                        | true           | Makes  dropDown hoist.                           |
| `immediate`       | `immediate` |           | `boolean`                                        | true           | if true,  select a date ,close the dropDown      |
| `invalid`         | `invalid`   |           | `boolean`                                        | false          |                                                  |
| `max`             |             |           | `string \| number \| undefined`                  |                | 最大值                                              |
| `maxDate`         |             | readonly  | `Date \| null \| undefined`                      |                |                                                  |
| `min`             |             |           | `string \| number \| undefined`                  |                | 最小值                                              |
| `minDate`         |             | readonly  | `Date \| null \| undefined`                      |                |                                                  |
| `mode`            | `mode`      |           | `"year" \| "month" \| "date"`                    | "date"         | 选择模式，年，月，日                                       |
| `pill`            | `pill`      |           | `boolean`                                        | false          | Draws a pill-style button with rounded edges.    |
| `placement`       | `placement` |           | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "right" \| "right-start" \| "right-end" \| "left" \| "left-start" \| "left-end"` | "bottom-start" | The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel<br />inside of the viewport. |
| `readonly`        | `readonly`  |           | `boolean`                                        | false          | Makes the input readonly.                        |
| `size`            | `size`      |           | `"small" \| "medium" \| "large"`                 | "medium"       | set input size                                   |
| `value`           | `value`     |           | `string \| undefined`                            |                | 选中日期 ,格式：2018，2018-02, 2018/01， 2018/02/02 ,2018-01-02 |
| `valueDate`       |             |           | `Date \| undefined`                              |                | 内部 value 所对应的日期                                  |
| `valueDateString` |             | readonly  | `string`                                         |                | 获取 日期显示值                                         |

## Methods

| Method                  | Type       |
|-------------------------|------------|
| `watchDisabledPanel`    | `(): void` |
| `watchSelectModeChange` | `(): void` |

## Events

| Event            | Description                 |
|------------------|-----------------------------|
| `sl-date-change` | Emitted when date change  . |

## CSS Shadow Parts

| Part            | Description                   |
|-----------------|-------------------------------|
| `input`         | The input text.               |
| `sl-date-panel` | The component's base wrapper. |


# sl-details

## Properties

| Property   | Attribute  | Type          | Default | Description                                      |
|------------|------------|---------------|---------|--------------------------------------------------|
| `body`     |            | `HTMLElement` |         |                                                  |
| `details`  |            | `HTMLElement` |         |                                                  |
| `disabled` | `disabled` | `boolean`     | false   | Disables the details so it can't be toggled.     |
| `header`   |            | `HTMLElement` |         |                                                  |
| `open`     | `open`     | `boolean`     | false   | Indicates whether or not the details is open. You can use this in lieu of the show/hide methods. |
| `summary`  | `summary`  | `string`      |         | The summary to show in the details header. If you need to display HTML, use the `summary` slot instead. |

## Methods

| Method                 | Type                           | Description        |
|------------------------|--------------------------------|--------------------|
| `handleOpenChange`     | `(): Promise<void>`            |                    |
| `handleSummaryClick`   | `(): void`                     |                    |
| `handleSummaryKeyDown` | `(event: KeyboardEvent): void` |                    |
| `hide`                 | `(): Promise<void>`            | Hides the details  |
| `show`                 | `(): Promise<void>`            | Shows the details. |

## Events

| Event           | Description                                      |
|-----------------|--------------------------------------------------|
| `sl-after-hide` | Emitted after the details closes and all transitions are complete. |
| `sl-after-show` | Emitted after the details opens and all transitions are complete. |
| `sl-hide`       | Emitted when the details closes.                 |
| `sl-show`       | Emitted when the details opens.                  |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | The details' content.                            |
| `summary` | The details' summary. Alternatively, you can use the summary prop. |

## CSS Shadow Parts

| Part           | Description                       |
|----------------|-----------------------------------|
| `base`         | The component's base wrapper.     |
| `content`      | The details content.              |
| `header`       | The summary header.               |
| `summary`      | The details summary.              |
| `summary-icon` | The expand/collapse summary icon. |


# sl-dialog

## Properties

| Property   | Attribute   | Type          | Default | Description                                      |
|------------|-------------|---------------|---------|--------------------------------------------------|
| `dialog`   |             | `HTMLElement` |         |                                                  |
| `label`    | `label`     | `string`      | ""      | The dialog's label as displayed in the header. You should always include a relevant label even when using<br />`no-header`, as it is required for proper accessibility. |
| `noHeader` | `no-header` | `boolean`     | false   | Disables the header. This will also remove the default close button, so please ensure you provide an easy,<br />accessible way for users to dismiss the dialog. |
| `open`     | `open`      | `boolean`     | false   | Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. |
| `overlay`  |             | `HTMLElement` |         |                                                  |
| `panel`    |             | `HTMLElement` |         |                                                  |

## Methods

| Method             | Type                           | Description       |
|--------------------|--------------------------------|-------------------|
| `handleKeyDown`    | `(event: KeyboardEvent): void` |                   |
| `handleOpenChange` | `(): Promise<void>`            |                   |
| `handleSlotChange` | `(): void`                     |                   |
| `hide`             | `(): Promise<void>`            | Hides the dialog  |
| `show`             | `(): Promise<void>`            | Shows the dialog. |

## Events

| Event              | Description                                      |
|--------------------|--------------------------------------------------|
| `sl-after-hide`    | Emitted after the dialog closes and all transitions are complete. |
| `sl-after-show`    | Emitted after the dialog opens and all transitions are complete. |
| `sl-hide`          | Emitted when the dialog closes.                  |
| `sl-initial-focus` | Emitted when the dialog opens and the panel gains focus. Calling `event.preventDefault()`<br />will prevent focus and allow you to set it on a different element in the dialog, such as an input or button. |
| `sl-request-close` | Emitted when the user attempts to close the dialog by clicking the close button, clicking the<br />overlay, or pressing the escape key. Calling `event.preventDefault()` will prevent the dialog from closing. Avoid<br />using this unless closing the dialog will result in destructive behavior such as data loss. |
| `sl-show`          | Emitted when the dialog opens.                   |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | The dialog's content.                            |
| `footer` | The dialog's footer, usually one or more buttons representing various options. |
| `label`  | The dialog's label. Alternatively, you can use the label prop. |

## CSS Shadow Parts

| Part           | Description                                      |
|----------------|--------------------------------------------------|
| `base`         | The component's base wrapper.                    |
| `body`         | The dialog body.                                 |
| `close-button` | The close button.                                |
| `footer`       | The dialog footer.                               |
| `header`       | The dialog header.                               |
| `overlay`      | The overlay.                                     |
| `panel`        | The dialog panel (where the dialog and its content is rendered). |
| `title`        | The dialog title.                                |

## CSS Custom Properties

| Property           | Description                                      |
|--------------------|--------------------------------------------------|
| `--body-spacing`   | The amount of padding to use for the body.       |
| `--footer-spacing` | The amount of padding to use for the footer.     |
| `--header-spacing` | The amount of padding to use for the header.     |
| `--width`          | The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens. |


# sl-drawer

## Properties

| Property    | Attribute   | Type                                    | Default | Description                                      |
|-------------|-------------|-----------------------------------------|---------|--------------------------------------------------|
| `contained` | `contained` | `boolean`                               | false   | By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of<br />its parent element, set this prop and add `position: relative` to the parent. |
| `drawer`    |             | `HTMLElement`                           |         |                                                  |
| `label`     | `label`     | `string`                                | ""      | The drawer's label as displayed in the header. You should always include a relevant label even when using<br />`no-header`, as it is required for proper accessibility. |
| `noHeader`  | `no-header` | `boolean`                               | false   | Removes the header. This will also remove the default close button, so please ensure you provide an easy,<br />accessible way for users to dismiss the drawer. |
| `open`      | `open`      | `boolean`                               | false   | Indicates whether or not the drawer is open. You can use this in lieu of the show/hide methods. |
| `overlay`   |             | `HTMLElement`                           |         |                                                  |
| `panel`     |             | `HTMLElement`                           |         |                                                  |
| `placement` | `placement` | `"top" \| "bottom" \| "end" \| "start"` | "end"   | The direction from which the drawer will open.   |

## Methods

| Method             | Type                           | Description       |
|--------------------|--------------------------------|-------------------|
| `handleKeyDown`    | `(event: KeyboardEvent): void` |                   |
| `handleOpenChange` | `(): Promise<void>`            |                   |
| `handleSlotChange` | `(): void`                     |                   |
| `hide`             | `(): Promise<void>`            | Hides the drawer  |
| `show`             | `(): Promise<void>`            | Shows the drawer. |

## Events

| Event              | Description                                      |
|--------------------|--------------------------------------------------|
| `sl-after-hide`    | Emitted after the drawer closes and all transitions are complete. |
| `sl-after-show`    | Emitted after the drawer opens and all transitions are complete. |
| `sl-hide`          | Emitted when the drawer closes.                  |
| `sl-initial-focus` | Emitted when the drawer opens and the panel gains focus. Calling `event.preventDefault()` will<br />prevent focus and allow you to set it on a different element in the drawer, such as an input or button. |
| `sl-request-close` | Emitted when the user attempts to close the drawer by clicking the close button, clicking the<br />overlay, or pressing the escape key. Calling `event.preventDefault()` will prevent the drawer from closing. Avoid<br />using this unless closing the drawer will result in destructive behavior such as data loss. |
| `sl-show`          | Emitted when the drawer opens.                   |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | The drawer's content.                            |
| `footer` | The drawer's footer, usually one or more buttons representing various options. |
| `label`  | The drawer's label. Alternatively, you can use the label prop. |

## CSS Shadow Parts

| Part           | Description                                      |
|----------------|--------------------------------------------------|
| `base`         | The component's base wrapper.                    |
| `body`         | The drawer body.                                 |
| `close-button` | The close button.                                |
| `footer`       | The drawer footer.                               |
| `header`       | The drawer header.                               |
| `overlay`      | The overlay.                                     |
| `panel`        | The drawer panel (where the drawer and its content is rendered). |
| `title`        | The drawer title.                                |

## CSS Custom Properties

| Property           | Description                                      |
|--------------------|--------------------------------------------------|
| `--body-spacing`   | The amount of padding to use for the body.       |
| `--footer-spacing` | The amount of padding to use for the footer.     |
| `--header-spacing` | The amount of padding to use for the header.     |
| `--size`           | The preferred size of the drawer. This will be applied to the drawer's width or height<br />depending on its `placement`. Note that the drawer will shrink to accommodate smaller screens. |


# sl-dropdown

## Properties

| Property            | Attribute             | Type                                             | Default        | Description                                      |
|---------------------|-----------------------|--------------------------------------------------|----------------|--------------------------------------------------|
| `containingElement` |                       | `HTMLElement`                                    |                | The dropdown will close when the user interacts outside of this element (e.g. clicking). |
| `disabled`          | `disabled`            | `boolean`                                        | false          | Disables the dropdown so the panel will not open. |
| `distance`          | `distance`            | `number`                                         | 2              | The distance in pixels from which to offset the panel away from its trigger. |
| `hoist`             | `hoist`               | `boolean`                                        | false          | Enable this option to prevent the panel from being clipped when the component is placed inside a container with<br />`overflow: auto\|scroll`. |
| `open`              | `open`                | `boolean`                                        | false          | Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. |
| `panel`             |                       | `HTMLElement`                                    |                |                                                  |
| `placement`         | `placement`           | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "right" \| "right-start" \| "right-end" \| "left" \| "left-start" \| "left-end"` | "bottom-start" | The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel<br />inside of the viewport. |
| `positioner`        |                       | `HTMLElement`                                    |                |                                                  |
| `skidding`          | `skidding`            | `number`                                         | 0              | The distance in pixels from which to offset the panel along its trigger. |
| `stayOpenOnSelect`  | `stay-open-on-select` | `boolean`                                        | false          | By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for<br />controls that allow multiple selections. |
| `trigger`           |                       | `HTMLElement`                                    |                |                                                  |

## Methods

| Method                       | Type                              | Description                                      |
|------------------------------|-----------------------------------|--------------------------------------------------|
| `focusOnTrigger`             | `(): void`                        |                                                  |
| `getMenu`                    | `(): SlMenu`                      |                                                  |
| `handleDocumentKeyDown`      | `(event: KeyboardEvent): void`    |                                                  |
| `handleDocumentMouseDown`    | `(event: MouseEvent): void`       |                                                  |
| `handleMenuItemActivate`     | `(event: CustomEvent<any>): void` |                                                  |
| `handleOpenChange`           | `(): Promise<void>`               |                                                  |
| `handlePanelSelect`          | `(event: CustomEvent<any>): void` |                                                  |
| `handlePopoverOptionsChange` | `(): void`                        |                                                  |
| `handleTriggerClick`         | `(): void`                        |                                                  |
| `handleTriggerKeyDown`       | `(event: KeyboardEvent): void`    |                                                  |
| `handleTriggerKeyUp`         | `(event: KeyboardEvent): void`    |                                                  |
| `handleTriggerSlotChange`    | `(): void`                        |                                                  |
| `hide`                       | `(): Promise<void>`               | Hides the dropdown panel                         |
| `reposition`                 | `(): void`                        | Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu<br />is activated. |
| `show`                       | `(): Promise<void>`               | Shows the dropdown panel.                        |
| `updateAccessibleTrigger`    | `(): void`                        |                                                  |

## Events

| Event           | Description                                      |
|-----------------|--------------------------------------------------|
| `sl-after-hide` | Emitted after the dropdown closes and all animations are complete. |
| `sl-after-show` | Emitted after the dropdown opens and all animations are complete. |
| `sl-hide`       | Emitted when the dropdown closes.                |
| `sl-show`       | Emitted when the dropdown opens.                 |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | The dropdown's content.                          |
| `trigger` | The dropdown's trigger, usually a `<sl-button>` element. |

## CSS Shadow Parts

| Part      | Description                                      |
|-----------|--------------------------------------------------|
| `base`    | The component's base wrapper.                    |
| `panel`   | The panel that gets shown when the dropdown is open. |
| `trigger` | The container that wraps the trigger.            |


# sl-form

## Properties

| Property     | Attribute    | Type          | Default | Description                                      |
|--------------|--------------|---------------|---------|--------------------------------------------------|
| `form`       |              | `HTMLElement` |         |                                                  |
| `novalidate` | `novalidate` | `boolean`     | false   | Prevent the form from validating inputs before submitting. |

## Methods

| Method             | Type                                             | Description                                      |
|--------------------|--------------------------------------------------|--------------------------------------------------|
| `getFormControls`  | `(): HTMLElement[]`                              | Gets all form control elements (native and custom). |
| `getFormData`      | `(): FormData`                                   | Serializes all form controls elements and returns a `FormData` object. |
| `handleClick`      | `(event: MouseEvent): void`                      |                                                  |
| `handleKeyDown`    | `(event: KeyboardEvent): void`                   |                                                  |
| `serializeElement` | `(el: HTMLElement, formData: FormData): void \| null` |                                                  |
| `submit`           | `(): boolean`                                    | Submits the form. If all controls are valid, the `sl-submit` event will be emitted and the promise will resolve<br />with `true`. If any form control is invalid, the promise will resolve with `false` and no event will be emitted. |

## Events

| Event       | Type                                       | Description                                      |
|-------------|--------------------------------------------|--------------------------------------------------|
| `sl-submit` | `{ formData: FormData, formControls: [] }` | Emitted when the form is submitted. This event will not<br />be emitted if any form control inside of it is in an invalid state, unless the form has the `novalidate` attribute.<br />Note that there is never a need to prevent this event, since it doen't send a GET or POST request like native<br />forms. To "prevent" submission, use a conditional around the XHR request you use to submit the form's data with. |

## Slots

| Name | Description         |
|------|---------------------|
|      | The form's content. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-format-bytes

## Properties

| Property | Attribute | Type                | Default | Description                                   |
|----------|-----------|---------------------|---------|-----------------------------------------------|
| `locale` | `locale`  | `string`            |         | The locale to use when formatting the number. |
| `unit`   | `unit`    | `"bytes" \| "bits"` | "bytes" | The unit to display.                          |
| `value`  | `value`   | `number`            | 0       | The number to format in bytes.                |


# sl-format-date

## Properties

| Property       | Attribute        | Type                                             | Default      | Description                                      |
|----------------|------------------|--------------------------------------------------|--------------|--------------------------------------------------|
| `date`         | `date`           | `string \| Date`                                 | "new Date()" | The date/time to format. If not set, the current date and time will be used. |
| `day`          | `day`            | `"numeric" \| "2-digit"`                         |              | The format for displaying the day.               |
| `era`          | `era`            | `"narrow" \| "short" \| "long"`                  |              | The format for displaying the era.               |
| `hour`         | `hour`           | `"numeric" \| "2-digit"`                         |              | The format for displaying the hour.              |
| `hourFormat`   | `hour-format`    | `"auto" \| "12" \| "24"`                         | "auto"       | When set, 24 hour time will always be used.      |
| `locale`       | `locale`         | `string`                                         |              | The locale to use when formatting the date/time. |
| `minute`       | `minute`         | `"numeric" \| "2-digit"`                         |              | The format for displaying the minute.            |
| `month`        | `month`          | `"numeric" \| "2-digit" \| "narrow" \| "short" \| "long"` |              | The format for displaying the month.             |
| `second`       | `second`         | `"numeric" \| "2-digit"`                         |              | The format for displaying the second.            |
| `timeZone`     | `time-zone`      | `string`                                         |              | The time zone to express the time in.            |
| `timeZoneName` | `time-zone-name` | `"short" \| "long"`                              |              | The format for displaying the time.              |
| `weekday`      | `weekday`        | `"narrow" \| "short" \| "long"`                  |              | The format for displaying the weekday.           |
| `year`         | `year`           | `"numeric" \| "2-digit"`                         |              | The format for displaying the year.              |


# sl-format-number

## Properties

| Property                   | Attribute                    | Type                                             | Default   | Description                                      |
|----------------------------|------------------------------|--------------------------------------------------|-----------|--------------------------------------------------|
| `currency`                 | `currency`                   | `string`                                         | "USD"     | The currency to use when formatting. Must be an ISO 4217 currency code such as `USD` or `EUR`. |
| `currencyDisplay`          | `currency-display`           | `"symbol" \| "code" \| "narrowSymbol" \| "name"` | "symbol"  | How to display the currency.                     |
| `locale`                   | `locale`                     | `string`                                         |           | The locale to use when formatting the number.    |
| `maximumFractionDigits`    | `maximum-fraction-digits`    | `number`                                         |           | The maximum number of fraction digits to use. Possible values are 0 - 20. |
| `maximumSignificantDigits` | `maximum-significant-digits` | `number`                                         |           | The maximum number of significant digits to use,. Possible values are 1 - 21. |
| `minimumFractionDigits`    | `minimum-fraction-digits`    | `number`                                         |           | The minimum number of fraction digits to use. Possible values are 0 - 20. |
| `minimumIntegerDigits`     | `minimum-integer-digits`     | `number`                                         |           | The minimum number of integer digits to use. Possible values are 1 - 21. |
| `minimumSignificantDigits` | `minimum-significant-digits` | `number`                                         |           | The minimum number of significant digits to use. Possible values are 1 - 21. |
| `noGrouping`               | `no-grouping`                | `boolean`                                        | false     | Turns off grouping separators.                   |
| `type`                     | `type`                       | `"currency" \| "decimal" \| "percent"`           | "decimal" | The formatting style to use.                     |
| `value`                    | `value`                      | `number`                                         | 0         | The number to format.                            |


# sl-gallery

## Properties

| Property          | Attribute        | Type                                             | Default  | Description                 |
|-------------------|------------------|--------------------------------------------------|----------|-----------------------------|
| `autoPlay`        |                  | `boolean`                                        | false    | 是否自动切换展示图片                  |
| `autoPlaytimes`   |                  | `number`                                         | 2000     | 自动切换时间                      |
| `currentIndex`    | `currentIndex`   | `number`                                         | 0        |                             |
| `imageRender`     | `imageRender`    | `((this: SlGallery, image_data: unknown, index: number) => TemplateResult<1>) \| undefined` |          | 当前图片自定义显示                   |
| `image_datas`     | `image_datas`    | `unknown[]`                                      | []       | 图片对于其他其他数据                  |
| `images`          | `images`         | `string[]`                                       |          | 图片路径.                       |
| `isFullScreened`  |                  | `boolean`                                        | false    | 是否全屏 :内部使用                  |
| `layImage`        |                  | `boolean`                                        | false    | 是否延迟加载图片                    |
| `showNavButtons`  |                  | `boolean`                                        | true     | 是否显示 左右切换按钮                 |
| `show_fullscreen` |                  | `boolean`                                        | true     | 是否显示 全屏按钮                   |
| `show_pause`      |                  | `boolean`                                        | true     | 是否显示暂停按钮                    |
| `thumbPosition`   | `thumb-position` | `"top" \| "bottom" \| "right" \| "left"`         | "bottom" | 缩略图显示位置                     |
| `thumb_images`    | `thumb_images`   | `string[] \| undefined`                          |          | 缩略图图片路径，如果不设置，默认为images     |
| `windowKeyEnable` |                  | `boolean`                                        | false    | 可以通过 全局 left,right 键来调整当前图片 |

## Methods

| Method                  | Type       | Description |
|-------------------------|------------|-------------|
| `changeFullScreenState` | `(): void` | 改变组件全屏状态    |
| `watchAutoPlay`         | `(): void` |             |
| `watchChangeImages`     | `(): void` |             |

## Events

| Event                      | Type                            | Description                                      |
|----------------------------|---------------------------------|--------------------------------------------------|
| `sl-gallery-before-change` | `{value:number,toValue:number}` | Emitted when before change the current image index . |
| `sl-gallery-change`        | `{value:number}`                | Emitted current image index changed.             |
| `sl-gallery-image-click`   | `{image:Image}`                 | Emitted  image click.                            |
| `sl-gallery-image-load`    | `{image:Image}`                 | Emitted  image load.                             |

## Slots

| Name | Description       |
|------|-------------------|
|      | The default slot. |

## CSS Shadow Parts

| Part          | Description                   |
|---------------|-------------------------------|
| `base`        | The component's base wrapper. |
| `image`       | The current image to display. |
| `images`      | The real images container.    |
| `left-nav`    | The left nav button.          |
| `nav-button`  | The smal nav-button           |
| `right-nav`   | The right nav button.         |
| `thumb-image` | The thums inner images        |
| `thumbs`      | The thumb images container.   |

## CSS Custom Properties

| Property                      | Description                         |
|-------------------------------|-------------------------------------|
| `--sl-image-transition-time:` | -transition time  default 450ms - . |
| `--thumb-image-size`          | thumb-images size default 100px .   |


# sl-icon-button

## Properties

| Property   | Attribute  | Type                                         | Default | Description                                      |
|------------|------------|----------------------------------------------|---------|--------------------------------------------------|
| `button`   |            | `HTMLButtonElement \| HTMLLinkElement`       |         |                                                  |
| `disabled` | `disabled` | `boolean`                                    | false   | Disables the button.                             |
| `download` | `download` | `string`                                     |         | Tells the browser to download the linked file as this filename. Only used when `href` is set. |
| `href`     | `href`     | `string`                                     |         | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. |
| `label`    | `label`    | `string`                                     | ""      | A description that gets read by screen readers and other assistive devices. For optimal accessibility, you should<br />always include a label that describes what the icon button does. |
| `library`  | `library`  | `string`                                     |         | The name of a registered custom icon library.    |
| `name`     | `name`     | `string`                                     |         | The name of the icon to draw.                    |
| `src`      | `src`      | `string`                                     |         | An external URL of an SVG file.                  |
| `target`   | `target`   | `"_blank" \| "_parent" \| "_self" \| "_top"` |         | Tells the browser where to open the link. Only used when `href` is set. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-icon

## Properties

| Property  | Attribute | Type     | Default   | Description                                      |
|-----------|-----------|----------|-----------|--------------------------------------------------|
| `label`   | `label`   | `string` |           | An alternative description to use for accessibility. If omitted, the name or src will be used to generate it. |
| `library` | `library` | `string` | "default" | The name of a registered custom icon library.    |
| `name`    | `name`    | `string` |           | The name of the icon to draw.                    |
| `src`     | `src`     | `string` |           | An external URL of an SVG file.                  |

## Methods

| Method         | Type                |
|----------------|---------------------|
| `getLabel`     | `(): string`        |
| `handleChange` | `(): void`          |
| `redraw`       | `(): void`          |
| `setIcon`      | `(): Promise<void>` |

## Events

| Event      | Type                 | Description                                      |
|------------|----------------------|--------------------------------------------------|
| `sl-error` | `{ status: number }` | Emitted when the icon fails to load due to an error. |
| `sl-load`  |                      | Emitted when the icon has loaded.                |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-image-comparer

## Properties

| Property   | Attribute  | Type          | Default | Description                                  |
|------------|------------|---------------|---------|----------------------------------------------|
| `base`     |            | `HTMLElement` |         |                                              |
| `handle`   |            | `HTMLElement` |         |                                              |
| `position` | `position` | `number`      | 50      | The position of the divider as a percentage. |

## Methods

| Method                 | Type                           |
|------------------------|--------------------------------|
| `handleDrag`           | `(event: any): void`           |
| `handleKeyDown`        | `(event: KeyboardEvent): void` |
| `handlePositionChange` | `(): void`                     |

## Events

| Event       | Description                        |
|-------------|------------------------------------|
| `sl-change` | Emitted when the position changes. |

## Slots

| Name          | Description                                      |
|---------------|--------------------------------------------------|
| `after`       | The after image, an `<img>` or `<svg>` element.  |
| `before`      | The before image, an `<img>` or `<svg>` element. |
| `handle-icon` | The icon used inside the handle.                 |

## CSS Shadow Parts

| Part      | Description                                      |
|-----------|--------------------------------------------------|
| `after`   | The container that holds the "after" image.      |
| `base`    | The component's base wrapper.                    |
| `before`  | The container that holds the "before" image.     |
| `divider` | The divider that separates the images.           |
| `handle`  | The handle that the user drags to expose the after image. |

## CSS Custom Properties

| Property          | Description                     |
|-------------------|---------------------------------|
| `--divider-width` | The width of the dividing line. |
| `--handle-size`   | The size of the compare handle. |


# sl-include

## Properties

| Property       | Attribute       | Type                                   | Default | Description                                      |
|----------------|-----------------|----------------------------------------|---------|--------------------------------------------------|
| `allowScripts` | `allow-scripts` | `boolean`                              | false   | Allows included scripts to be executed. You must ensure the content you're including is trusted, otherwise this<br />option can lead to XSS vulnerabilities in your app! |
| `mode`         | `mode`          | `"cors" \| "no-cors" \| "same-origin"` | "cors"  | The fetch mode to use.                           |
| `src`          | `src`           | `string`                               |         | The location of the HTML file to include.        |

## Methods

| Method            | Type                                |
|-------------------|-------------------------------------|
| `executeScript`   | `(script: HTMLScriptElement): void` |
| `handleSrcChange` | `(): Promise<void>`                 |

## Events

| Event      | Type                 | Description                                      |
|------------|----------------------|--------------------------------------------------|
| `sl-error` | `{ status: number }` | Emitted when the included file fails to load due to an error. |
| `sl-load`  |                      | Emitted when the included file is loaded.        |


# sl-input

## Properties

| Property         | Attribute         | Type                                             | Default  | Description                                      |
|------------------|-------------------|--------------------------------------------------|----------|--------------------------------------------------|
| `autocapitalize` | `autocapitalize`  | `"none" \| "off" \| "on" \| "sentences" \| "words" \| "characters"` |          | The input's autocaptialize attribute.            |
| `autocomplete`   | `autocomplete`    | `string`                                         |          | The input's autocomplete attribute.              |
| `autocorrect`    | `autocorrect`     | `string`                                         |          | The input's autocorrect attribute.               |
| `autofocus`      | `autofocus`       | `boolean`                                        |          | The input's autofocus attribute.                 |
| `clearable`      | `clearable`       | `boolean`                                        | false    | Adds a clear button when the input is populated. |
| `disabled`       | `disabled`        | `boolean`                                        | false    | Disables the input.                              |
| `helpText`       | `help-text`       | `string`                                         | ""       | The input's help text. Alternatively, you can use the help-text slot. |
| `input`          |                   | `HTMLInputElement`                               |          |                                                  |
| `inputmode`      | `inputmode`       | `"none" \| "text" \| "numeric" \| "decimal" \| "tel" \| "search" \| "email" \| "url"` |          | The input's inputmode attribute.                 |
| `invalid`        | `invalid`         | `boolean`                                        | false    | This will be true when the control is in an invalid state. Validity is determined by props such as `type`,<br />`required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API. |
| `label`          | `label`           | `string`                                         |          | The input's label. Alternatively, you can use the label slot. |
| `max`            | `max`             | `string \| number`                               |          | The input's maximum value.                       |
| `maxlength`      | `maxlength`       | `number`                                         |          | The maximum length of input that will be considered valid. |
| `min`            | `min`             | `string \| number`                               |          | The input's minimum value.                       |
| `minlength`      | `minlength`       | `number`                                         |          | The minimum length of input that will be considered valid. |
| `name`           | `name`            | `string`                                         |          | The input's name attribute.                      |
| `pattern`        | `pattern`         | `string`                                         |          | A pattern to validate input against.             |
| `pill`           | `pill`            | `boolean`                                        | false    | Draws a pill-style input with rounded edges.     |
| `placeholder`    | `placeholder`     | `string`                                         |          | The input's placeholder text.                    |
| `readonly`       | `readonly`        | `boolean`                                        | false    | Makes the input readonly.                        |
| `required`       | `required`        | `boolean`                                        | false    | Makes the input a required field.                |
| `size`           | `size`            | `"small" \| "medium" \| "large"`                 | "medium" | The input's size.                                |
| `spellcheck`     | `spellcheck`      | `boolean`                                        |          | Enables spell checking on the input.             |
| `step`           | `step`            | `number`                                         |          | The input's step attribute.                      |
| `togglePassword` | `toggle-password` | `boolean`                                        | false    | Adds a password toggle button to password inputs. |
| `type`           | `type`            | `"number" \| "text" \| "tel" \| "search" \| "email" \| "url" \| "password"` | "text"   | The input's type.                                |
| `value`          | `value`           | `string`                                         | ""       | The input's value attribute.                     |

## Methods

| Method                 | Type                                             | Description                                      |
|------------------------|--------------------------------------------------|--------------------------------------------------|
| `blur`                 | `(): void`                                       | Removes focus from the input.                    |
| `focus`                | `(options?: FocusOptions \| undefined): void`    | Sets focus on the input.                         |
| `handleBlur`           | `(): void`                                       |                                                  |
| `handleChange`         | `(): void`                                       |                                                  |
| `handleClearClick`     | `(event: MouseEvent): void`                      |                                                  |
| `handleDisabledChange` | `(): void`                                       |                                                  |
| `handleFocus`          | `(): void`                                       |                                                  |
| `handleInput`          | `(): void`                                       |                                                  |
| `handleInvalid`        | `(): void`                                       |                                                  |
| `handlePasswordToggle` | `(): void`                                       |                                                  |
| `handleSlotChange`     | `(): void`                                       |                                                  |
| `handleValueChange`    | `(): void`                                       |                                                  |
| `reportValidity`       | `(): boolean`                                    | Checks for validity and shows the browser's validation message if the control is invalid. |
| `select`               | `(): void`                                       | Selects all the text in the input.               |
| `setCustomValidity`    | `(message: string): void`                        | Sets a custom validation message. If `message` is not empty, the field will be considered invalid. |
| `setRangeText`         | `(replacement: string, start: number, end: number, selectMode?: "end" \| "start" \| "select" \| "preserve"): void` | Replaces a range of text with a new string.      |
| `setSelectionRange`    | `(selectionStart: number, selectionEnd: number, selectionDirection?: "none" \| "forward" \| "backward"): void` | Sets the start and end positions of the text selection (0-based). |

## Events

| Event       | Description                                 |
|-------------|---------------------------------------------|
| `sl-blur`   | Emitted when the control loses focus.       |
| `sl-change` | Emitted when the control's value changes.   |
| `sl-clear`  | Emitted when the clear button is activated. |
| `sl-focus`  | Emitted when the control gains focus.       |
| `sl-input`  | Emitted when the control receives input.    |

## Slots

| Name                 | Description                                      |
|----------------------|--------------------------------------------------|
| `clear-icon`         | An icon to use in lieu of the default clear icon. |
| `help-text`          | Help text that describes how to use the input. Alternatively, you can use the help-text prop. |
| `hide-password-icon` | An icon to use in lieu of the default hide password icon. |
| `label`              | The input's label. Alternatively, you can use the label prop. |
| `prefix`             | Used to prepend an icon or similar element to the input. |
| `show-password-icon` | An icon to use in lieu of the default show password icon. |
| `suffix`             | Used to append an icon or similar element to the input. |

## CSS Shadow Parts

| Part                     | Description                                      |
|--------------------------|--------------------------------------------------|
| `base`                   | The component's base wrapper.                    |
| `clear-button`           | The clear button.                                |
| `form-control`           | The form control that wraps the label, input, and help-text. |
| `help-text`              | The input help text.                             |
| `input`                  | The input control.                               |
| `label`                  | The input label.                                 |
| `password-toggle-button` | The password toggle button.                      |
| `prefix`                 | The input prefix container.                      |
| `suffix`                 | The input suffix container.                      |

## CSS Custom Properties

| Property       | Description                                      |
|----------------|--------------------------------------------------|
| `--focus-ring` | The focus ring style to use when the control receives focus, a `box-shadow` property. |


# sl-layout

## Properties

| Property | Attribute | Type                                             | Default | Description          |
|----------|-----------|--------------------------------------------------|---------|----------------------|
| `center` | `center`  | `boolean`                                        | false   | 是否 主轴，次轴都居中          |
| `column` | `column`  | `boolean`                                        | false   | 是否按照列进行Flex column布局 |
| `cross`  | `cross`   | `"end" \| "start" \| "center" \| "baseline" \| "stretch"` |         | 次轴子项对齐方式             |
| `expand` | `expand`  | `boolean`                                        | false   | 是否扩展剩余空间             |
| `main`   | `main`    | `"end" \| "start" \| "center" \| "space-between" \| "space-around"` |         | 主轴子项对齐方式             |
| `row`    | `row`     | `boolean`                                        | true    | 是否按照行进行Flex row布局    |

## Methods

| Method        | Type       |
|---------------|------------|
| `setXYChange` | `(): void` |

## Slots

| Name | Description       |
|------|-------------------|
|      | The default slot. |


# sl-markdown-element

## Properties

| Property    | Attribute  | Type                                             | Default       | Description             |
|-------------|------------|--------------------------------------------------|---------------|-------------------------|
| `fetchMode` |            | `"cors" \| "no-cors" \| "same-origin" \| "navigate"` | "same-origin" |                         |
| `markdown`  | `markdown` | `string`                                         |               | the markdown string     |
| `mdsrc`     | `mdsrc`    | `string`                                         |               | mdsrc markdown resource |
| `theme`     |            | `"light" \| "dark" \| "ant" \| "wechat"`         | "ant"         | theme name for  prismjs |

## Methods

| Method        | Type                     | Description           |
|---------------|--------------------------|-----------------------|
| `fetchAsText` | `(src: string): Promise` | **src**: url to fetch |
| `themeChange` | `(): void`               |                       |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-menu-divider

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-menu-item

## Properties

| Property   | Attribute  | Type          | Default | Description                                      |
|------------|------------|---------------|---------|--------------------------------------------------|
| `checked`  | `checked`  | `boolean`     | false   | Draws the item in a checked state.               |
| `disabled` | `disabled` | `boolean`     | false   | Draws the menu item in a disabled state.         |
| `menuItem` |            | `HTMLElement` |         |                                                  |
| `value`    | `value`    | `string`      | ""      | A unique value to store in the menu item. This can be used as a way to identify menu items when selected. |

## Methods

| Method                | Type       |
|-----------------------|------------|
| `handleCheckedChange` | `(): void` |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | The menu item's label.                           |
| `prefix` | Used to prepend an icon or similar element to the menu item. |
| `suffix` | Used to append an icon or similar element to the menu item. |

## CSS Shadow Parts

| Part           | Description                                |
|----------------|--------------------------------------------|
| `base`         | The component's base wrapper.              |
| `checked-icon` | The container that wraps the checked icon. |
| `label`        | The menu item label.                       |
| `prefix`       | The prefix container.                      |
| `suffix`       | The suffix container.                      |


# sl-menu-label

## Slots

| Name | Description               |
|------|---------------------------|
|      | The menu label's content. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-menu

## Properties

| Property      | Type              |
|---------------|-------------------|
| `defaultSlot` | `HTMLSlotElement` |
| `menu`        | `HTMLElement`     |

## Methods

| Method             | Type                                             | Description                                      |
|--------------------|--------------------------------------------------|--------------------------------------------------|
| `getAllItems`      | `(options?: { includeDisabled: boolean; }): SlMenuItem[]` |                                                  |
| `getCurrentItem`   | `(): SlMenuItem \| undefined`                    |                                                  |
| `handleClick`      | `(event: MouseEvent): void`                      |                                                  |
| `handleKeyDown`    | `(event: KeyboardEvent): void`                   |                                                  |
| `handleMouseDown`  | `(event: MouseEvent): void`                      |                                                  |
| `handleSlotChange` | `(): void`                                       |                                                  |
| `setCurrentItem`   | `(item: SlMenuItem): void`                       |                                                  |
| `typeToSelect`     | `(key: string): void`                            | Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.<br />The key passed will be appended to the internal query and the selection will be updated. After a brief period, the<br />internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for<br />enabling type-to-select when the menu doesn't have focus. |

## Events

| Event       | Type                   | Description                           |
|-------------|------------------------|---------------------------------------|
| `sl-select` | `{ item: SlMenuItem }` | Emitted when a menu item is selected. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The menu's content, including menu items, menu dividers, and menu labels. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-org-node

## Properties

| Property      | Attribute     | Modifiers | Type                                             | Default             | Description      |
|---------------|---------------|-----------|--------------------------------------------------|---------------------|------------------|
| `collapsable` | `collapsable` |           | `boolean`                                        | true                | 节点是否允许收缩         |
| `expanded`    | `expanded`    |           | `boolean`                                        | true                | 节点是展开，还是收拢，默认是展开 |
| `isLeaf`      |               | readonly  | `boolean`                                        |                     |                  |
| `nodeData`    | `nodeData`    |           | `OrgNodeDataType`                                |                     | 节点数据             |
| `nodeRender`  | `nodeRender`  |           | `(node: OrgNodeDataType) => TemplateResult<1> \| TemplateResult<1>[]` | "defaultRoleRender" | 节点自定义渲染          |
| `styleClass`  | `styleClass`  |           | `string`                                         |                     | 组织架构节点自定义样式      |
| `subOrgNodes` |               |           | `SlOrgNode[]`                                    |                     |                  |

## Methods

| Method             | Type       |
|--------------------|------------|
| `createRenderRoot` | `(): this` |
| `onNodeClick`      | `(): void` |

## Events

| Event  | Description                                  |
|--------|----------------------------------------------|
| `node` | click {data:any} - click node Data Element . |

## CSS Custom Properties

| Property    | Description                     |
|-------------|---------------------------------|
| `--example` | An example CSS custom property. |


# sl-org-tree

## Properties

| Property      | Attribute    | Type                                             | Default             | Description  |
|---------------|--------------|--------------------------------------------------|---------------------|--------------|
| `center`      | `center`     | `boolean`                                        | true                | 是否居中         |
| `containerEl` |              | `HTMLDivElement`                                 |                     |              |
| `horizontal`  | `horizontal` | `boolean`                                        | false               | 是否是水平布局 组织架构 |
| `nodeRender`  | `nodeRender` | `(node: OrgNodeDataType) => TemplateResult<1> \| TemplateResult<1>[]` | "defaultRoleRender" |              |
| `rootData`    | `rootData`   | `OrgNodeDataType`                                |                     | 组织架构节点数据     |
| `rootNode`    |              | `SlOrgNode`                                      |                     |              |

## Events

| Event              | Type                                           | Description                     |
|--------------------|------------------------------------------------|---------------------------------|
| `sl-org-tree-node` | `{ node: SlOrgNode,nodeData:OrgNodeDataType }` | click  Emitted when node click. |

## CSS Shadow Parts

| Part        | Description                        |
|-------------|------------------------------------|
| `container` | The component's container wrapper. |
| `tree`      | The component's tree wrapper.      |

## CSS Custom Properties

| Property    | Description                     |
|-------------|---------------------------------|
| `--example` | An example CSS custom property. |


# sl-page-btn

## Properties

| Property          | Attribute          | Modifiers | Type                            | Default                                          | Description    |
|-------------------|--------------------|-----------|---------------------------------|--------------------------------------------------|----------------|
| `align`           | `align`            |           | `"right" \| "left" \| "center"` | "right"                                          | 布局对齐方式         |
| `pageCount`       |                    | readonly  | `number`                        |                                                  |                |
| `pageSize`        | `page-size`        |           | `number`                        | 20                                               | 分页大小           |
| `pageSizeOptions` |                    |           | `Number[]`                      | "Array.from(\n    { length: 10 },\n    (_item, value) => 10 + value * 10\n  )" | 支持调整的分页大小      |
| `showFirst`       |                    |           | `boolean`                       | false                                            | 是否显示 直接跳转到第一页  |
| `showLast`        |                    |           | `boolean`                       | false                                            | 是否显示 直接跳转到最后一页 |
| `showPageChange`  | `show-page-change` |           | `boolean`                       | false                                            | 是否允许直接调整第几页    |
| `showSizeChange`  | `show-size-change` |           | `boolean`                       | false                                            | 是否调整 分页大小 组件   |
| `simple`          | `simple`           |           | `boolean`                       | false                                            | 是否允许 简化分页模式    |
| `total`           | `total`            |           | `number`                        |                                                  | 总数大小           |
| `value`           | `value`            |           | `number`                        | 1                                                | 当前页            |

## Methods

| Method            | Type                     |
|-------------------|--------------------------|
| `goToPage`        | `(pageNo: number): void` |
| `watchPageChange` | `(): void`               |

## Events

| Event                   | Description                                      |
|-------------------------|--------------------------------------------------|
| `sl-page-before-change` | Emitted before  page changed,use can defaultPrevented ,then sl-page-change can not be emit    . |
| `sl-page-change`        | Emitted when current page changed   .            |

## Slots

| Name      | Description             |
|-----------|-------------------------|
|           | prefix The prefix slot. |
| `default` | tool bar end to show .  |
| `no-data` | when total=0 to show .  |

## CSS Shadow Parts

| Part       | Description                              |
|------------|------------------------------------------|
| `base`     | The component's base wrapper.            |
| `pageWrap` | The component's to page button  wrapper. |


# sl-progress-bar

## Properties

| Property        | Attribute       | Type      | Default | Description                                      |
|-----------------|-----------------|-----------|---------|--------------------------------------------------|
| `indeterminate` | `indeterminate` | `boolean` | false   | When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. |
| `percentage`    | `percentage`    | `number`  | 0       | The progress bar's percentage, 0 to 100.         |

## Slots

| Name | Description                           |
|------|---------------------------------------|
|      | A label to show inside the indicator. |

## CSS Shadow Parts

| Part        | Description                   |
|-------------|-------------------------------|
| `base`      | The component's base wrapper. |
| `indicator` | The progress bar indicator.   |
| `label`     | The progress bar label.       |

## CSS Custom Properties

| Property            | Description                |
|---------------------|----------------------------|
| `--height`          | The progress bar's height. |
| `--indicator-color` | The indicator color.       |
| `--label-color`     | The label color.           |
| `--track-color`     | The track color.           |


# sl-progress-ring

## Properties

| Property      | Attribute      | Type               | Default | Description                                      |
|---------------|----------------|--------------------|---------|--------------------------------------------------|
| `indicator`   |                | `SVGCircleElement` |         |                                                  |
| `percentage`  | `percentage`   | `number`           |         | The current progress percentage, 0 - 100.        |
| `size`        | `size`         | `number`           | 128     | The size of the progress ring in pixels.         |
| `strokeWidth` | `stroke-width` | `number`           | 4       | The stroke width of the progress ring in pixels. |

## Methods

| Method           | Type       |
|------------------|------------|
| `updateProgress` | `(): void` |

## Slots

| Name | Description                      |
|------|----------------------------------|
|      | A label to show inside the ring. |

## CSS Shadow Parts

| Part    | Description                   |
|---------|-------------------------------|
| `base`  | The component's base wrapper. |
| `label` | The progress ring label.      |

## CSS Custom Properties

| Property            | Description          |
|---------------------|----------------------|
| `--indicator-color` | The indicator color. |
| `--track-color`     | The track color.     |


# sl-qr-code

## Properties

| Property          | Attribute          | Type                       | Default | Description                                      |
|-------------------|--------------------|----------------------------|---------|--------------------------------------------------|
| `background`      | `background`       | `string`                   | "#fff"  | The background color. This can be any valid CSS color or `transparent`, but not a CSS custom property. |
| `canvas`          |                    | `HTMLElement`              |         |                                                  |
| `errorCorrection` | `error-correction` | `"L" \| "M" \| "Q" \| "H"` | "H"     | The level of error correction to use.            |
| `fill`            | `fill`             | `string`                   | "#000"  | The fill color. This can be any valid CSS color, but not a CSS custom property. |
| `label`           | `label`            | `string`                   | ""      | The label used when screen readers announce the code. If unspecified, the value will be used. |
| `radius`          | `radius`           | `number`                   | 0       | The edge radius of each module. Must be between 0 and 0.5. |
| `size`            | `size`             | `number`                   | 128     | The size of the code's overall square in pixels. |
| `value`           | `value`            | `string`                   | ""      | The QR code's value.                             |

## Methods

| Method     | Type       |
|------------|------------|
| `generate` | `(): void` |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-radio-group

## Properties

| Property      | Attribute     | Type              | Default | Description                                      |
|---------------|---------------|-------------------|---------|--------------------------------------------------|
| `defaultSlot` |               | `HTMLSlotElement` |         |                                                  |
| `label`       | `label`       | `string`          | ""      | The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. |
| `noFieldset`  | `no-fieldset` | `boolean`         | false   | Hides the fieldset and legend that surrounds the radio group. The label will still be read by screen readers. |

## Methods

| Method          | Type       |
|-----------------|------------|
| `handleFocusIn` | `(): void` |

## Slots

| Name    | Description                                      |
|---------|--------------------------------------------------|
|         | The default slot where radio controls are placed. |
| `label` | The radio group label. Required for proper accessibility. Alternatively, you can use the label prop. |

## CSS Shadow Parts

| Part    | Description                   |
|---------|-------------------------------|
| `base`  | The component's base wrapper. |
| `label` | The radio group label.        |


# sl-radio

## Properties

| Property   | Attribute  | Type               | Default | Description                                      |
|------------|------------|--------------------|---------|--------------------------------------------------|
| `checked`  | `checked`  | `boolean`          | false   | Draws the radio in a checked state.              |
| `disabled` | `disabled` | `boolean`          | false   | Disables the radio.                              |
| `input`    |            | `HTMLInputElement` |         |                                                  |
| `invalid`  | `invalid`  | `boolean`          | false   | This will be true when the control is in an invalid state. Validity in range inputs is determined by the message<br />provided by the `setCustomValidity` method. |
| `name`     | `name`     | `string`           |         | The radio's name attribute.                      |
| `value`    | `value`    | `string`           |         | The radio's value attribute.                     |

## Methods

| Method                 | Type                                          | Description                                      |
|------------------------|-----------------------------------------------|--------------------------------------------------|
| `blur`                 | `(): void`                                    | Removes focus from the radio.                    |
| `click`                | `(): void`                                    | Simulates a click on the radio.                  |
| `focus`                | `(options?: FocusOptions \| undefined): void` | Sets focus on the radio.                         |
| `getAllRadios`         | `(): this[]`                                  |                                                  |
| `getSiblingRadios`     | `(): this[]`                                  |                                                  |
| `handleBlur`           | `(): void`                                    |                                                  |
| `handleCheckedChange`  | `(): void`                                    |                                                  |
| `handleClick`          | `(): void`                                    |                                                  |
| `handleDisabledChange` | `(): void`                                    |                                                  |
| `handleFocus`          | `(): void`                                    |                                                  |
| `handleKeyDown`        | `(event: KeyboardEvent): void`                |                                                  |
| `handleMouseDown`      | `(event: MouseEvent): void`                   |                                                  |
| `reportValidity`       | `(): boolean`                                 | Checks for validity and shows the browser's validation message if the control is invalid. |
| `setCustomValidity`    | `(message: string): void`                     | Sets a custom validation message. If `message` is not empty, the field will be considered invalid. |

## Events

| Event       | Description                                      |
|-------------|--------------------------------------------------|
| `sl-blur`   | Emitted when the control loses focus.            |
| `sl-change` | Emitted when the control's checked state changes. |
| `sl-focus`  | Emitted when the control gains focus.            |

## Slots

| Name | Description        |
|------|--------------------|
|      | The radio's label. |

## CSS Shadow Parts

| Part           | Description                               |
|----------------|-------------------------------------------|
| `base`         | The component's base wrapper.             |
| `checked-icon` | The container the wraps the checked icon. |
| `control`      | The radio control.                        |
| `label`        | The radio label.                          |


# sl-range

## Properties

| Property           | Attribute   | Type                          | Default                               | Description                                      |
|--------------------|-------------|-------------------------------|---------------------------------------|--------------------------------------------------|
| `disabled`         | `disabled`  | `boolean`                     | false                                 | Disables the input.                              |
| `helpText`         | `help-text` | `string`                      | ""                                    | The range's help text. Alternatively, you can use the help-text slot. |
| `input`            |             | `HTMLInputElement`            |                                       |                                                  |
| `invalid`          | `invalid`   | `boolean`                     | false                                 | This will be true when the control is in an invalid state. Validity in range inputs is determined by the message<br />provided by the `setCustomValidity` method. |
| `label`            | `label`     | `string`                      | ""                                    | The range's label. Alternatively, you can use the label slot. |
| `max`              | `max`       | `number`                      | 100                                   | The input's max attribute.                       |
| `min`              | `min`       | `number`                      | 0                                     | The input's min attribute.                       |
| `name`             | `name`      | `string`                      | ""                                    | The input's name attribute.                      |
| `output`           |             | `HTMLOutputElement`           |                                       |                                                  |
| `step`             | `step`      | `number`                      | 1                                     | The input's step attribute.                      |
| `tooltip`          | `tooltip`   | `"none" \| "top" \| "bottom"` | "top"                                 | The preferred placedment of the tooltip.         |
| `tooltipFormatter` |             | `(value: number) => string`   | "(value: number) => value.toString()" | A function used to format the tooltip's value.   |
| `value`            | `value`     | `number`                      | 0                                     | The input's value attribute.                     |

## Methods

| Method                 | Type                                          | Description                                      |
|------------------------|-----------------------------------------------|--------------------------------------------------|
| `blur`                 | `(): void`                                    | Removes focus from the input.                    |
| `focus`                | `(options?: FocusOptions \| undefined): void` | Sets focus on the input.                         |
| `handleBlur`           | `(): void`                                    |                                                  |
| `handleDisabledChange` | `(): void`                                    |                                                  |
| `handleFocus`          | `(): void`                                    |                                                  |
| `handleInput`          | `(): void`                                    |                                                  |
| `handleSlotChange`     | `(): void`                                    |                                                  |
| `handleThumbDragEnd`   | `(): void`                                    |                                                  |
| `handleThumbDragStart` | `(): void`                                    |                                                  |
| `setCustomValidity`    | `(message: string): void`                     | Sets a custom validation message. If `message` is not empty, the field will be considered invalid. |
| `syncTooltip`          | `(): void`                                    |                                                  |

## Events

| Event       | Description                               |
|-------------|-------------------------------------------|
| `sl-blur`   | Emitted when the control loses focus.     |
| `sl-change` | Emitted when the control's value changes. |
| `sl-focus`  | Emitted when the control gains focus. *   |

## Slots

| Name        | Description                                      |
|-------------|--------------------------------------------------|
| `help-text` | Help text that describes how to use the input. Alternatively, you can use the help-text prop. |
| `label`     | The input's label. Alternatively, you can use the label prop. |

## CSS Shadow Parts

| Part      | Description                   |
|-----------|-------------------------------|
| `base`    | The component's base wrapper. |
| `input`   | The native range input.       |
| `tooltip` | The range tooltip.            |


# sl-rating

## Properties

| Property    | Attribute   | Type                        | Default                                          | Description                                      |
|-------------|-------------|-----------------------------|--------------------------------------------------|--------------------------------------------------|
| `disabled`  | `disabled`  | `boolean`                   | false                                            | Disables the rating.                             |
| `getSymbol` | `getSymbol` | `(value: number) => string` | "(value: number) =>\n    '<sl-icon name=\"star-fill\" library=\"system\"></sl-icon>'" | The name of the icon to display as the symbol.   |
| `max`       | `max`       | `number`                    | 5                                                | The highest rating to show.                      |
| `precision` | `precision` | `number`                    | 1                                                | The minimum increment value allowed by the control. |
| `rating`    |             | `HTMLElement`               |                                                  |                                                  |
| `readonly`  | `readonly`  | `boolean`                   | false                                            | Makes the rating readonly.                       |
| `value`     | `value`     | `number`                    | 0                                                | The current rating.                              |

## Methods

| Method                      | Type                                             | Description                    |
|-----------------------------|--------------------------------------------------|--------------------------------|
| `blur`                      | `(): void`                                       | Removes focus from the rating. |
| `focus`                     | `(options?: FocusOptions \| undefined): void`    | Sets focus on the rating.      |
| `getValueFromMousePosition` | `(event: MouseEvent): number`                    |                                |
| `getValueFromTouchPosition` | `(event: TouchEvent): number`                    |                                |
| `getValueFromXCoordinate`   | `(coordinate: number): number`                   |                                |
| `handleClick`               | `(event: MouseEvent): void`                      |                                |
| `handleKeyDown`             | `(event: KeyboardEvent): void`                   |                                |
| `handleMouseEnter`          | `(): void`                                       |                                |
| `handleMouseLeave`          | `(): void`                                       |                                |
| `handleMouseMove`           | `(event: MouseEvent): void`                      |                                |
| `handleTouchEnd`            | `(event: TouchEvent): void`                      |                                |
| `handleTouchMove`           | `(event: TouchEvent): void`                      |                                |
| `handleTouchStart`          | `(event: TouchEvent): void`                      |                                |
| `handleValueChange`         | `(): void`                                       |                                |
| `roundToPrecision`          | `(numberToRound: number, precision?: number): number` |                                |
| `setValue`                  | `(newValue: number): void`                       |                                |

## Events

| Event       | Description                              |
|-------------|------------------------------------------|
| `sl-change` | Emitted when the rating's value changes. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |

## CSS Custom Properties

| Property                | Description                        |
|-------------------------|------------------------------------|
| `--symbol-color`        | The inactive color for symbols.    |
| `--symbol-color-active` | The active color for symbols.      |
| `--symbol-size`         | The size of symbols.               |
| `--symbol-spacing`      | The spacing to use around symbols. |


# sl-relative-time

## Properties

| Property  | Attribute | Type                            | Default | Description                                      |
|-----------|-----------|---------------------------------|---------|--------------------------------------------------|
| `date`    | `date`    | `string \| Date`                |         | The date from which to calculate time from.      |
| `format`  | `format`  | `"narrow" \| "short" \| "long"` | "long"  | The formatting style to use.                     |
| `locale`  | `locale`  | `string`                        |         | The locale to use when formatting the number.    |
| `numeric` | `numeric` | `"auto" \| "always"`            | "auto"  | When `auto`, values such as "yesterday" and "tomorrow" will be shown when possible. When `always`, values such as<br />"1 day ago" and "in 1 day" will be shown. |
| `sync`    | `sync`    | `boolean`                       | false   | Keep the displayed value up to date as time passes. |

## Methods

| Method       | Type       |
|--------------|------------|
| `updateTime` | `(): void` |


# sl-resize-observer

## Methods

| Method             | Type       |
|--------------------|------------|
| `handleSlotChange` | `(): void` |

## Events

| Event       | Type                                 | Description                          |
|-------------|--------------------------------------|--------------------------------------|
| `sl-resize` | `{ entries: ResizeObserverEntry[] }` | Emitted when the element is resized. |


# sl-responsive-media

## Properties

| Property      | Attribute      | Type                   | Default | Description                                      |
|---------------|----------------|------------------------|---------|--------------------------------------------------|
| `aspectRatio` | `aspect-ratio` | `string`               | "16:9"  | The aspect ratio of the embedded media in the format of `width:height`, e.g. `16:9`, `4:3`, or `1:1`. Ratios not in<br />this format will be ignored. |
| `fit`         | `fit`          | `"cover" \| "contain"` | "cover" | Determines how content will be resized to fit its container. |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The element to receive the aspect ratio. Should be a replaced element, such as `<img>`, `<iframe>`, or `<video>`. |


# sl-ripple

## Properties

| Property   | Attribute  | Type      | Default | Description      |
|------------|------------|-----------|---------|------------------|
| `disabled` | `disabled` | `boolean` | false   | disable animate. |

## Events

| Event           | Description                    |
|-----------------|--------------------------------|
| `sl-ripple-end` | Emitted when ripple effect end |

## Slots

| Name | Description                                    |
|------|------------------------------------------------|
|      | The default slot wrap node for ripplie effect. |

## CSS Custom Properties

| Property            | Description                        |
|---------------------|------------------------------------|
| `--sl-ripple-color` | An ripple animate background color |


# sl-col

## Properties

| Property | Attribute | Type     | Default | Description |
|----------|-----------|----------|---------|-------------|
| `row`    | `row`     | `number` | 1       | 占多少行        |
| `span`   | `span`    | `number` | 1       | 占多少列        |

## Methods

| Method             | Type       |
|--------------------|------------|
| `changeSpanMethod` | `(): void` |


# sl-row

## Properties

| Property  | Attribute | Type     | Default | Description |
|-----------|-----------|----------|---------|-------------|
| `columns` | `columns` | `number` | 12      | grid等分多少列   |
| `grap`    | `grap`    | `string` | "0"     | grid 单元格的间距 |

## Methods

| Method             | Type       |
|--------------------|------------|
| `changeSpanMethod` | `(): void` |

## Slots

| Name | Description       |
|------|-------------------|
|      | The default slot. |


# sl-scroll

## Properties

| Property             | Attribute              | Modifiers | Type             | Default | Description                    |
|----------------------|------------------------|-----------|------------------|---------|--------------------------------|
| `caculateXBarWidth`  |                        | readonly  | `number`         |         |                                |
| `caculateYBarHeight` |                        | readonly  | `number`         |         |                                |
| `containerDIV`       |                        |           | `HTMLDivElement` |         |                                |
| `contentDIV`         |                        |           | `HTMLDivElement` |         |                                |
| `content_wrap_DIV`   |                        |           | `HTMLDivElement` |         |                                |
| `keyEnable`          | `keyEnable`            |           | `boolean`        | true    | 是否允许 键盘 上下左右按键滚动               |
| `overflowX`          | `overflow-x`           |           | `overflowType`   | ""      | hidden,则水平滚动条永远隐藏，否则根据内容自动显示隐藏 |
| `overflowY`          | `overflow-y`           |           | `overflowType`   | ""      | hidden,则竖直滚动条隐藏，，否则根据内容自动显示隐藏  |
| `partXHandler`       |                        |           | `HTMLDivElement` |         |                                |
| `partXScroll`        |                        |           | `HTMLDivElement` |         |                                |
| `partYHandler`       |                        |           | `HTMLDivElement` |         |                                |
| `partYScroll`        |                        |           | `HTMLDivElement` |         |                                |
| `rightBottom`        |                        |           | `HTMLElement`    |         |                                |
| `scrollBarOutWidth`  | `scroll-bar-out-width` |           | `number`         | 12      | 滚动条 容器宽度，必须大与 滚动条宽度            |
| `scrollBarWidth`     | `scroll-bar-width`     |           | `number`         | 8       | 滚动条宽度                          |
| `throttTime`         | `throttTime`           |           | `number`         | 20      | 事件节流时间                         |
| `wheelScrollChange`  |                        |           | `number`         | 120     |                                |

## Methods

| Method                 | Type                           | Description                                      |
|------------------------|--------------------------------|--------------------------------------------------|
| `caculateXBarPosition` | `(): number`                   |                                                  |
| `caculateYBarPosition` | `(): number`                   |                                                  |
| `changeXBarPosition`   | `(changeValue?: number): void` | 改变水平滚动条的位置<br /><br />**changeValue**: 改变的大小     |
| `changeXScroll`        | `(scrollValue?: number): void` | 改变水平内容滚动位置<br /><br />**scrollValue**: 改变多少      |
| `changeYBarPosition`   | `(changeValue?: number): void` | 改变竖直滚动调大位置<br /><br />**changeValue**: 竖直滚动条的改变值，>0 向下 |
| `changeYScroll`        | `(scrollValue?: number): void` | **scrollValue**: 改变竖直内容滚动位置                      |
| `resize`               | `(): void`                     | 当容器，或者子元素发生变化，触发resize 函数和事件                     |
| `scrollXToEnd`         | `(): void`                     | 水平滚动条滚动到 最右侧                                     |
| `scrollXToValue`       | `(scrollLeft?: number): void`  | **scrollLeft**: 水平内容滚动到特定位置                      |
| `scrollYToEnd`         | `(): void`                     | 竖直滚动条 滚动到底部                                      |
| `scrollYToValue`       | `(scrollTop?: number): void`   | 竖直内容滚动到特定位置                                      |

## Events

| Event              | Type                                             | Description                        |
|--------------------|--------------------------------------------------|------------------------------------|
| `resize`           |                                                  | resize事件，当容器或者子孩子放生变化，此时触发         |
| `sl-scroll-change` | `{scrollLeft:number,scrollTop:number}`           | Emitted when scroll  bar change .  |
| `sl-scroll-x`      | `{scrollLeft:number,scrollTop:number,value:number}` | Emitted when scroll x bar .        |
| `sl-scroll-x-end`  | `{scrollLeft:number,scrollTop:number}`           | Emitted when scroll x bar to end . |
| `sl-scroll-y`      | `{scrollLeft:number,scrollTop:number,value:number}` | Emitted when scroll y bar .        |
| `sl-scroll-y-end`  | `{scrollLeft:number,scrollTop:number}`           | Emitted when scroll y bar to end . |

## Slots

| Name | Description       |
|------|-------------------|
|      | The default slot. |

## CSS Shadow Parts

| Part           | Description                   |
|----------------|-------------------------------|
| `base`         | The component's base wrapper. |
| `content`      | The component's  scroll div.  |
| `content-wrap` | The component's slot wrapper. |

## CSS Custom Properties

| Property                   | Description             |
|----------------------------|-------------------------|
| `--scroll-bar-outer-width` | scroll bar-outer width. |
| `--scroll-bar-width`       | scroll bar width.       |


# sl-select

## Properties

| Property         | Attribute          | Type                             | Default  | Description                                      |
|------------------|--------------------|----------------------------------|----------|--------------------------------------------------|
| `box`            |                    | `SlDropdown`                     |          |                                                  |
| `clearable`      | `clearable`        | `boolean`                        | false    | Adds a clear button when the select is populated. |
| `disabled`       | `disabled`         | `boolean`                        | false    | Disables the select control.                     |
| `dropdown`       |                    | `SlDropdown`                     |          |                                                  |
| `helpText`       | `help-text`        | `string`                         |          | The select's help text. Alternatively, you can use the help-text slot. |
| `hoist`          | `hoist`            | `boolean`                        | false    | Enable this option to prevent the panel from being clipped when the component is placed inside a container with<br />`overflow: auto\|scroll`. |
| `input`          |                    | `HTMLInputElement`               |          |                                                  |
| `invalid`        | `invalid`          | `boolean`                        | false    | This will be true when the control is in an invalid state. Validity is determined by the `required` prop. |
| `label`          | `label`            | `string`                         |          | The select's label. Alternatively, you can use the label slot. |
| `maxTagsVisible` | `max-tags-visible` | `number`                         | 3        | The maximum number of tags to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the<br />number of additional items that are selected. Set to -1 to remove the limit. |
| `menu`           |                    | `SlMenu`                         |          |                                                  |
| `multiple`       | `multiple`         | `boolean`                        | false    | Enables multiselect. With this enabled, value will be an array. |
| `name`           | `name`             | `string`                         | ""       | The select's name.                               |
| `pill`           | `pill`             | `boolean`                        | false    | Draws a pill-style select with rounded edges.    |
| `placeholder`    | `placeholder`      | `string`                         | ""       | The select's placeholder text.                   |
| `required`       | `required`         | `boolean`                        | false    | The select's required attribute.                 |
| `size`           | `size`             | `"small" \| "medium" \| "large"` | "medium" | The select's size.                               |
| `value`          | `value`            | `string \| string[]`             | ""       | The value of the control. This will be a string or an array depending on `multiple`. |

## Methods

| Method                 | Type                                         | Description                                      |
|------------------------|----------------------------------------------|--------------------------------------------------|
| `getItemLabel`         | `(item: SlMenuItem): string`                 |                                                  |
| `getItems`             | `(): SlMenuItem[]`                           |                                                  |
| `getValueAsArray`      | `(): string[]`                               |                                                  |
| `handleBlur`           | `(): void`                                   |                                                  |
| `handleClearClick`     | `(event: MouseEvent): void`                  |                                                  |
| `handleDisabledChange` | `(): void`                                   |                                                  |
| `handleFocus`          | `(): void`                                   |                                                  |
| `handleKeyDown`        | `(event: KeyboardEvent): void`               |                                                  |
| `handleLabelClick`     | `(): void`                                   |                                                  |
| `handleMenuHide`       | `(): void`                                   |                                                  |
| `handleMenuSelect`     | `(event: CustomEvent<any>): void`            |                                                  |
| `handleMenuShow`       | `(): void`                                   |                                                  |
| `handleMultipleChange` | `(): void`                                   |                                                  |
| `handleSlotChange`     | `(): Promise<void>`                          |                                                  |
| `handleTagInteraction` | `(event: MouseEvent \| KeyboardEvent): void` |                                                  |
| `handleValueChange`    | `(): Promise<void>`                          |                                                  |
| `reportValidity`       | `(): boolean`                                | Checks for validity and shows the browser's validation message if the control is invalid. |
| `resizeMenu`           | `(): void`                                   |                                                  |
| `setCustomValidity`    | `(message: string): void`                    | Sets a custom validation message. If `message` is not empty, the field will be considered invalid. |
| `syncItemsFromValue`   | `(): void`                                   |                                                  |
| `syncValueFromItems`   | `(): void`                                   |                                                  |

## Events

| Event       | Description                                 |
|-------------|---------------------------------------------|
| `sl-blur`   | Emitted when the control loses focus.       |
| `sl-change` | Emitted when the control's value changes.   |
| `sl-clear`  | Emitted when the clear button is activated. |
| `sl-focus`  | Emitted when the control gains focus.       |

## Slots

| Name        | Description                                      |
|-------------|--------------------------------------------------|
|             | The select's options in the form of menu items.  |
| `help-text` | Help text that describes how to use the select.  |
| `label`     | The select's label. Alternatively, you can use the label prop. |
| `prefix`    | Used to prepend an icon or similar element to the select. |
| `suffix`    | Used to append an icon or similar element to the select. |

## CSS Shadow Parts

| Part           | Description                                      |
|----------------|--------------------------------------------------|
| `base`         | The component's base wrapper.                    |
| `clear-button` | The input's clear button, exported from <sl-input>. |
| `form-control` | The form control that wraps the label, input, and help text. |
| `help-text`    | The select's help text.                          |
| `icon`         | The select's icon.                               |
| `label`        | The select's label.                              |
| `menu`         | The select menu, a <sl-menu> element.            |
| `prefix`       | The select's prefix.                             |
| `suffix`       | The select's suffix.                             |
| `tag`          | The multiselect option, a <sl-tag> element.      |
| `tags`         | The container in which multiselect options are rendered. |

## CSS Custom Properties

| Property       | Description                                      |
|----------------|--------------------------------------------------|
| `--focus-ring` | The focus ring style to use when the control receives focus, a `box-shadow` property. |


# sl-skeleton

## Properties

| Property | Attribute | Type                           | Default | Description                                    |
|----------|-----------|--------------------------------|---------|------------------------------------------------|
| `effect` | `effect`  | `"none" \| "pulse" \| "sheen"` | "none"  | Determines which effect the skeleton will use. |

## CSS Shadow Parts

| Part        | Description                                      |
|-------------|--------------------------------------------------|
| `base`      | The component's base wrapper.                    |
| `indicator` | The skeleton's indicator which is responsible for its color and animation. |

## CSS Custom Properties

| Property          | Description                                      |
|-------------------|--------------------------------------------------|
| `--border-radius` | The skeleton's border radius.                    |
| `--color`         | The color of the skeleton.                       |
| `--sheen-color`   | The sheen color when the skeleton is in its loading state. |


# sl-spinner

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |

## CSS Custom Properties

| Property            | Description                           |
|---------------------|---------------------------------------|
| `--indicator-color` | The color of the spinner's indicator. |
| `--stroke-width`    | The width of the indicator.           |
| `--track-color`     | The color of the spinner's track.     |


# sl-splitter

## Properties

| Property    | Attribute    | Type                                     | Default | Description |
|-------------|--------------|------------------------------------------|---------|-------------|
| `border`    | `border`     | `boolean`                                | true    | 整体是否显示边框    |
| `maxSize`   | `max-size`   | `number \| undefined`                    |         |             |
| `minSize`   | `min-size`   | `number \| undefined`                    |         | 分隔允许的最小位置   |
| `splitAble` | `split-able` | `boolean`                                | true    | 是否允许拖动改变位置  |
| `splitType` | `splitType`  | `"top" \| "bottom" \| "right" \| "left"` | "left"  | Split 切割位置. |

## Methods

| Method            | Type                                   |
|-------------------|----------------------------------------|
| `changeSplitType` | `(old: string, newType: string): void` |

## Events

| Event                  | Type                              | Description                    |
|------------------------|-----------------------------------|--------------------------------|
| `sl-split-type-change` | `{oldType:string,newType:string}` | Emitted when splitType change. |

## Slots

| Name   | Description       |
|--------|-------------------|
|        | The default slot. |
| `exta` | 需要被拖动的小部分容器.      |

## CSS Shadow Parts

| Part   | Description                        |
|--------|------------------------------------|
| `base` | The component's base wrapper.      |
| `exta` | The component's base exta wrapper. |
| `main` | The component's base main wrapper. |

## CSS Custom Properties

| Property                 | Description           |
|--------------------------|-----------------------|
| `--sl-split-hover-color` | spit div hover color. |
| `--sl-split-width`       | spit div width.       |


# sl-step

## Properties

| Property      | Attribute     | Modifiers | Type      | Default | Description |
|---------------|---------------|-----------|-----------|---------|-------------|
| `description` | `description` |           | `string`  |         | 描述          |
| `icon`        | `icon`        |           | `string`  |         | 图标          |
| `index`       | `index`       |           | `number`  | 0       | 顺序号         |
| `parentSteps` |               | readonly  | `SlSteps` |         |             |
| `title`       | `title`       |           | `string`  |         | 标题          |

## Methods

| Method          | Type          |
|-----------------|---------------|
| `isCurrentStep` | `(): boolean` |
| `isFinished`    | `(): boolean` |

## Events

| Event           | Description            |
|-----------------|------------------------|
| `sl-event-name` | Emitted as an example. |

## Slots

| Name               | Description           |
|--------------------|-----------------------|
| `step`             | icon The icon slot.   |
| `step-description` | The description slot. |
| `step-title`       | The title slot.       |

## CSS Shadow Parts

| Part               | Description                               |
|--------------------|-------------------------------------------|
| `step-container`   | The component's base wrapper.             |
| `step-content`     | The component's step content wrapper.     |
| `step-description` | The component's step description wrapper. |
| `step-icon`        | The component's step title wrapper.       |
| `step-title`       | The component's step title wrapper.       |

## CSS Custom Properties

| Property                  | Description                  |
|---------------------------|------------------------------|
| `--step-background-color` | background-color for step.   |
| `--step-border-color`     | color for step border-color. |
| `--step-icon-color`       | color for step icon color.   |


# sl-steps

## Properties

| Property     | Attribute    | Modifiers | Type                           | Default | Description    |
|--------------|--------------|-----------|--------------------------------|---------|----------------|
| `childStep`  |              | readonly  | `SlStep[]`                     |         |                |
| `current`    | `current`    |           | `number`                       | 0       | 当前步骤，默认从0      |
| `size`       | `size`       |           | `"small" \| "mid" \| "larger"` |         | 进度点 圆圈大小       |
| `startIndex` | `startIndex` |           | `number`                       | 1       | 起始节点显示 序号，默认为1 |
| `vertical`   | `vertical`   |           | `boolean`                      | false   | 是否为竖直          |

## Events

| Event       | Description                     |
|-------------|---------------------------------|
| `sl-change` | Emitted as current step change. |

## Slots

| Name | Description                                   |
|------|-----------------------------------------------|
|      | The default slot accept <sl-step> chilldrens. |

## CSS Shadow Parts

| Part        | Description                        |
|-------------|------------------------------------|
| `container` | The component's container wrapper. |

## CSS Custom Properties

| Property    | Description                     |
|-------------|---------------------------------|
| `--example` | An example CSS custom property. |


# sl-switch

## Properties

| Property   | Attribute  | Type               | Default | Description                                      |
|------------|------------|--------------------|---------|--------------------------------------------------|
| `checked`  | `checked`  | `boolean`          | false   | Draws the switch in a checked state.             |
| `disabled` | `disabled` | `boolean`          | false   | Disables the switch.                             |
| `input`    |            | `HTMLInputElement` |         |                                                  |
| `invalid`  | `invalid`  | `boolean`          | false   | This will be true when the control is in an invalid state. Validity is determined by the `required` prop. |
| `name`     | `name`     | `string`           |         | The switch's name attribute.                     |
| `required` | `required` | `boolean`          | false   | Makes the switch a required field.               |
| `value`    | `value`    | `string`           |         | The switch's value attribute.                    |

## Methods

| Method                 | Type                                          | Description                                      |
|------------------------|-----------------------------------------------|--------------------------------------------------|
| `blur`                 | `(): void`                                    | Removes focus from the switch.                   |
| `click`                | `(): void`                                    | Simulates a click on the switch.                 |
| `focus`                | `(options?: FocusOptions \| undefined): void` | Sets focus on the switch.                        |
| `handleBlur`           | `(): void`                                    |                                                  |
| `handleCheckedChange`  | `(): void`                                    |                                                  |
| `handleClick`          | `(): void`                                    |                                                  |
| `handleDisabledChange` | `(): void`                                    |                                                  |
| `handleFocus`          | `(): void`                                    |                                                  |
| `handleKeyDown`        | `(event: KeyboardEvent): void`                |                                                  |
| `handleMouseDown`      | `(event: MouseEvent): void`                   |                                                  |
| `reportValidity`       | `(): boolean`                                 | Checks for validity and shows the browser's validation message if the control is invalid. |
| `setCustomValidity`    | `(message: string): void`                     | Sets a custom validation message. If `message` is not empty, the field will be considered invalid. |

## Events

| Event       | Description                                      |
|-------------|--------------------------------------------------|
| `sl-blur`   | Emitted when the control loses focus.            |
| `sl-change` | Emitted when the control's checked state changes. |
| `sl-focus`  | Emitted when the control gains focus.            |

## Slots

| Name | Description         |
|------|---------------------|
|      | The switch's label. |

## CSS Shadow Parts

| Part      | Description                    |
|-----------|--------------------------------|
| `base`    | The component's base wrapper.  |
| `control` | The switch control.            |
| `label`   | The switch label.              |
| `thumb`   | The switch position indicator. |

## CSS Custom Properties

| Property       | Description               |
|----------------|---------------------------|
| `--height`     | The height of the switch. |
| `--thumb-size` | The size of the thumb.    |
| `--width`      | The width of the switch.  |


# sl-tab-group

## Properties

| Property           | Attribute            | Type                                    | Default | Description                                      |
|--------------------|----------------------|-----------------------------------------|---------|--------------------------------------------------|
| `activation`       | `activation`         | `"auto" \| "manual"`                    | "auto"  | When set to auto, navigating tabs with the arrow keys will instantly show the corresponding tab panel. When set to<br />manual, the tab will receive focus but will not show until the user presses spacebar or enter. |
| `body`             |                      | `HTMLElement`                           |         |                                                  |
| `indicator`        |                      | `HTMLElement`                           |         |                                                  |
| `nav`              |                      | `HTMLElement`                           |         |                                                  |
| `noScrollControls` | `no-scroll-controls` | `boolean`                               | false   | Disables the scroll arrows that appear when tabs overflow. |
| `placement`        | `placement`          | `"top" \| "bottom" \| "end" \| "start"` | "top"   | The placement of the tabs.                       |
| `tabGroup`         |                      | `HTMLElement`                           |         |                                                  |

## Methods

| Method                       | Type                                             | Description                    |
|------------------------------|--------------------------------------------------|--------------------------------|
| `getActiveTab`               | `(): SlTab \| undefined`                         |                                |
| `getAllPanels`               | `(): [SlTabPanel]`                               |                                |
| `getAllTabs`                 | `(includeDisabled?: boolean): SlTab[]`           |                                |
| `handleClick`                | `(event: MouseEvent): void`                      |                                |
| `handleKeyDown`              | `(event: KeyboardEvent): void`                   |                                |
| `handleScrollToEnd`          | `(): void`                                       |                                |
| `handleScrollToStart`        | `(): void`                                       |                                |
| `preventIndicatorTransition` | `(): void`                                       |                                |
| `repositionIndicator`        | `(): void`                                       |                                |
| `setActiveTab`               | `(tab: SlTab, options?: { emitEvents?: boolean \| undefined; scrollBehavior?: "auto" \| "smooth" \| undefined; } \| undefined): void` |                                |
| `setAriaLabels`              | `(): void`                                       |                                |
| `show`                       | `(panel: string): void`                          | Shows the specified tab panel. |
| `syncIndicator`              | `(): void`                                       |                                |
| `syncTabsAndPanels`          | `(): void`                                       |                                |
| `updateScrollControls`       | `(): void`                                       |                                |

## Events

| Event         | Type               | Description                   |
|---------------|--------------------|-------------------------------|
| `sl-tab-hide` | `{ name: String }` | Emitted when a tab is hidden. |
| `sl-tab-show` | `{ name: String }` | Emitted when a tab is shown.  |

## Slots

| Name  | Description                                    |
|-------|------------------------------------------------|
|       | Used for grouping tab panels in the tab group. |
| `nav` | Used for grouping tabs in the tab group.       |

## CSS Shadow Parts

| Part                   | Description                                      |
|------------------------|--------------------------------------------------|
| `active-tab-indicator` | An element that displays the currently selected tab. This is a child of the tabs container. |
| `base`                 | The component's base wrapper.                    |
| `body`                 | The tab group body where tab panels are slotted in. |
| `nav`                  | The tab group navigation container.              |
| `scroll-button`        | The previous and next scroll buttons that appear when tabs are scrollable. |
| `tabs`                 | The container that wraps the slotted tabs.       |

## CSS Custom Properties

| Property            | Description                                      |
|---------------------|--------------------------------------------------|
| `--indicator-color` | The color of the active tab indicator.           |
| `--track-color`     | The color of the indicator's track (i.e. the line that separates tabs from panels). |


# sl-tab-panel

## Properties

| Property | Attribute | Type      | Default | Description                             |
|----------|-----------|-----------|---------|-----------------------------------------|
| `active` | `active`  | `boolean` | false   | When true, the tab panel will be shown. |
| `name`   | `name`    | `string`  | ""      | The tab panel's name.                   |

## Slots

| Name | Description              |
|------|--------------------------|
|      | The tab panel's content. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |


# sl-tab

## Properties

| Property   | Attribute  | Type          | Default | Description                                      |
|------------|------------|---------------|---------|--------------------------------------------------|
| `active`   | `active`   | `boolean`     | false   | Draws the tab in an active state.                |
| `closable` | `closable` | `boolean`     | false   | Makes the tab closable and shows a close icon.   |
| `disabled` | `disabled` | `boolean`     | false   | Draws the tab in a disabled state.               |
| `panel`    | `panel`    | `string`      | ""      | The name of the tab panel the tab will control. The panel must be located in the same tab group. |
| `tab`      |            | `HTMLElement` |         |                                                  |

## Methods

| Method             | Type                                          | Description                 |
|--------------------|-----------------------------------------------|-----------------------------|
| `blur`             | `(): void`                                    | Removes focus from the tab. |
| `focus`            | `(options?: FocusOptions \| undefined): void` | Sets focus to the tab.      |
| `handleCloseClick` | `(): void`                                    |                             |

## Events

| Event      | Description                                      |
|------------|--------------------------------------------------|
| `sl-close` | Emitted when the tab is closable and the close button is activated. |

## Slots

| Name | Description      |
|------|------------------|
|      | The tab's label. |

## CSS Shadow Parts

| Part           | Description                                      |
|----------------|--------------------------------------------------|
| `base`         | The component's base wrapper.                    |
| `close-button` | The close button, which is the icon button's base wrapper. |

## CSS Custom Properties

| Property       | Description                  |
|----------------|------------------------------|
| `--focus-ring` | The focus ring's box shadow. |


# sl-tag

## Properties

| Property    | Attribute   | Type                                             | Default   | Description                                |
|-------------|-------------|--------------------------------------------------|-----------|--------------------------------------------|
| `clearable` | `clearable` | `boolean`                                        | false     | Makes the tag clearable.                   |
| `pill`      | `pill`      | `boolean`                                        | false     | Draws a pill-style tag with rounded edges. |
| `size`      | `size`      | `"small" \| "medium" \| "large"`                 | "medium"  | The tag's size.                            |
| `type`      | `type`      | `"primary" \| "success" \| "neutral" \| "warning" \| "danger" \| "text"` | "primary" | The tag's type.                            |

## Methods

| Method             | Type       |
|--------------------|------------|
| `handleClearClick` | `(): void` |

## Events

| Event      | Description                                 |
|------------|---------------------------------------------|
| `sl-clear` | Emitted when the clear button is activated. |

## Slots

| Name | Description        |
|------|--------------------|
|      | The tag's content. |

## CSS Shadow Parts

| Part           | Description                   |
|----------------|-------------------------------|
| `base`         | The component's base wrapper. |
| `clear-button` | The clear button.             |
| `content`      | The tag content.              |


# sl-textarea

## Properties

| Property         | Attribute        | Type                                             | Default    | Description                                      |
|------------------|------------------|--------------------------------------------------|------------|--------------------------------------------------|
| `autocapitalize` | `autocapitalize` | `"none" \| "off" \| "on" \| "sentences" \| "words" \| "characters"` |            | The textarea's autocaptialize attribute.         |
| `autocomplete`   | `autocomplete`   | `string`                                         |            | The textarea's autocomplete attribute.           |
| `autocorrect`    | `autocorrect`    | `string`                                         |            | The textarea's autocorrect attribute.            |
| `autofocus`      | `autofocus`      | `boolean`                                        |            | The textarea's autofocus attribute.              |
| `disabled`       | `disabled`       | `boolean`                                        | false      | Disables the textarea.                           |
| `helpText`       | `help-text`      | `string`                                         | ""         | The textarea's help text. Alternatively, you can use the help-text slot. |
| `input`          |                  | `HTMLTextAreaElement`                            |            |                                                  |
| `inputmode`      | `inputmode`      | `"none" \| "text" \| "numeric" \| "decimal" \| "tel" \| "search" \| "email" \| "url"` |            | The textarea's inputmode attribute.              |
| `invalid`        | `invalid`        | `boolean`                                        | false      | This will be true when the control is in an invalid state. Validity is determined by props such as `type`,<br />`required`, `minlength`, and `maxlength` using the browser's constraint validation API. |
| `label`          | `label`          | `string`                                         |            | The textarea's label. Alternatively, you can use the label slot. |
| `maxlength`      | `maxlength`      | `number`                                         |            | The maximum length of input that will be considered valid. |
| `minlength`      | `minlength`      | `number`                                         |            | The minimum length of input that will be considered valid. |
| `name`           | `name`           | `string`                                         |            | The textarea's name attribute.                   |
| `pattern`        | `pattern`        | `string`                                         |            | A pattern to validate input against.             |
| `placeholder`    | `placeholder`    | `string`                                         |            | The textarea's placeholder text.                 |
| `readonly`       | `readonly`       | `boolean`                                        | false      | Makes the textarea readonly.                     |
| `required`       | `required`       | `boolean`                                        | false      | Makes the textarea a required field.             |
| `resize`         | `resize`         | `"auto" \| "none" \| "vertical"`                 | "vertical" | Controls how the textarea can be resized.        |
| `rows`           | `rows`           | `number`                                         | 4          | The number of rows to display by default.        |
| `size`           | `size`           | `"small" \| "medium" \| "large"`                 | "medium"   | The textarea's size.                             |
| `spellcheck`     | `spellcheck`     | `boolean`                                        |            | Enables spell checking on the textarea.          |
| `value`          | `value`          | `string`                                         | ""         | The textarea's value attribute.                  |

## Methods

| Method                 | Type                                             | Description                                      |
|------------------------|--------------------------------------------------|--------------------------------------------------|
| `blur`                 | `(): void`                                       | Removes focus from the textarea.                 |
| `focus`                | `(options?: FocusOptions \| undefined): void`    | Sets focus on the textarea.                      |
| `handleBlur`           | `(): void`                                       |                                                  |
| `handleChange`         | `(): void`                                       |                                                  |
| `handleDisabledChange` | `(): void`                                       |                                                  |
| `handleFocus`          | `(): void`                                       |                                                  |
| `handleInput`          | `(): void`                                       |                                                  |
| `handleRowsChange`     | `(): void`                                       |                                                  |
| `handleSlotChange`     | `(): void`                                       |                                                  |
| `handleValueChange`    | `(): void`                                       |                                                  |
| `reportValidity`       | `(): boolean`                                    | Checks for validity and shows the browser's validation message if the control is invalid. |
| `scrollPosition`       | `(position?: { top?: number \| undefined; left?: number \| undefined; } \| undefined): { top: number; left: number; } \| undefined` | Gets or sets the textarea's scroll position.     |
| `select`               | `(): void`                                       | Selects all the text in the textarea.            |
| `setCustomValidity`    | `(message: string): void`                        | Sets a custom validation message. If `message` is not empty, the field will be considered invalid. |
| `setRangeText`         | `(replacement: string, start: number, end: number, selectMode?: "end" \| "start" \| "select" \| "preserve"): void` | Replaces a range of text with a new string.      |
| `setSelectionRange`    | `(selectionStart: number, selectionEnd: number, selectionDirection?: "none" \| "forward" \| "backward"): void` | Sets the start and end positions of the text selection (0-based). |
| `setTextareaHeight`    | `(): void`                                       |                                                  |

## Events

| Event       | Description                               |
|-------------|-------------------------------------------|
| `sl-blur`   | Emitted when the control loses focus.     |
| `sl-change` | Emitted when the control's value changes. |
| `sl-focus`  | Emitted when the control gains focus.     |
| `sl-input`  | Emitted when the control receives input.  |

## Slots

| Name        | Description                                      |
|-------------|--------------------------------------------------|
| `help-text` | Help text that describes how to use the input.   |
| `label`     | The textarea's label. Alternatively, you can use the label prop. |

## CSS Shadow Parts

| Part           | Description                                      |
|----------------|--------------------------------------------------|
| `base`         | The component's base wrapper.                    |
| `form-control` | The form control that wraps the label, textarea, and help text. |
| `help-text`    | The textarea help text.                          |
| `label`        | The textarea label.                              |
| `textarea`     | The textarea control.                            |


# sl-tooltip

## Properties

| Property     | Attribute   | Type                                             | Default       | Description                                      |
|--------------|-------------|--------------------------------------------------|---------------|--------------------------------------------------|
| `content`    | `content`   | `string`                                         | ""            | The tooltip's content. Alternatively, you can use the content slot. |
| `disabled`   | `disabled`  | `boolean`                                        | false         | Disables the tooltip so it won't show when triggered. |
| `distance`   | `distance`  | `number`                                         | 10            | The distance in pixels from which to offset the tooltip away from its target. |
| `open`       | `open`      | `boolean`                                        | false         | Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. |
| `placement`  | `placement` | `"top" \| "top-start" \| "top-end" \| "bottom" \| "bottom-start" \| "bottom-end" \| "right" \| "right-start" \| "right-end" \| "left" \| "left-start" \| "left-end"` | "top"         | The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip<br />inside of the viewport. |
| `positioner` |             | `HTMLElement`                                    |               |                                                  |
| `skidding`   | `skidding`  | `number`                                         | 0             | The distance in pixels from which to offset the tooltip along its target. |
| `tooltip`    |             | `HTMLElement`                                    |               |                                                  |
| `trigger`    | `trigger`   | `string`                                         | "hover focus" | Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple<br />options can be passed by separating them with a space. When manual is used, the tooltip must be activated<br />programmatically. |
| `type`       | `type`      | `"primary" \| "success" \| "warning" \| "danger" \| "default"` | "default"     | tooltip theme type .                             |

## Methods

| Method                 | Type                             | Description        |
|------------------------|----------------------------------|--------------------|
| `getTarget`            | `(): HTMLElement`                |                    |
| `handleBlur`           | `(): void`                       |                    |
| `handleClick`          | `(): void`                       |                    |
| `handleDisabledChange` | `(): void`                       |                    |
| `handleFocus`          | `(): void`                       |                    |
| `handleKeyDown`        | `(event: KeyboardEvent): void`   |                    |
| `handleMouseOut`       | `(): void`                       |                    |
| `handleMouseOver`      | `(): void`                       |                    |
| `handleOpenChange`     | `(): Promise<void>`              |                    |
| `handleOptionsChange`  | `(): void`                       |                    |
| `handleSlotChange`     | `(): void`                       |                    |
| `hasTrigger`           | `(triggerType: string): boolean` |                    |
| `hide`                 | `(): Promise<void>`              | Hides the tooltip  |
| `show`                 | `(): Promise<void>`              | Shows the tooltip. |
| `syncOptions`          | `(): void`                       |                    |

## Events

| Event           | Description                                      |
|-----------------|--------------------------------------------------|
| `sl-after-hide` | Emitted after the tooltip has hidden and all transitions are complete. * |
| `sl-after-show` | Emitted after the tooltip has shown and all transitions are complete. |
| `sl-hide`       | Emitted when the tooltip begins to hide.         |
| `sl-show`       | Emitted when the tooltip begins to show.         |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
|           | The tooltip's target element. Only the first element will be used as the target. |
| `content` | The tooltip's content. Alternatively, you can use the content prop. |

## CSS Shadow Parts

| Part   | Description                   |
|--------|-------------------------------|
| `base` | The component's base wrapper. |

## CSS Custom Properties

| Property                        | Description                                      |
|---------------------------------|--------------------------------------------------|
| `--hide-delay`                  | The amount of time to wait before hiding the tooltip when hovering. |
| `--max-width`                   | The maximum width of the tooltip.                |
| `--show-delay`                  | The amount of time to wait before showing the tooltip when hovering. |
| `--sl-tooltip-background-color` | The background color of  tooltip ,like: 87 83 78 |
| `--sl-tooltip-color`            | The font color of  tooltip ,like: 87 83 78       |


# sl-tree-node

## Properties

| Property               | Modifiers | Type                        | Default                    | Description     |
|------------------------|-----------|-----------------------------|----------------------------|-----------------|
| `childTreeNodeElement` |           | `HTMLElement`               |                            | tree-node子节点DIV |
| `isClose`              | readonly  | `boolean \| undefined`      |                            | 是否是关闭状          |
| `nodeData`             |           | `TreeNodeData \| undefined` |                            | 节点数据源           |
| `nodeRender`           |           | `NodeRenderInterface`       | "DEFAULT_TREE_NODE_RENDER" | 树节点渲染器          |
| `parentNodeData`       |           | `TreeNodeData \| undefined` |                            | 父节点数据           |
| `subChildSize`         | readonly  | `number`                    |                            | 获取直接孩子数量        |
| `tree`                 |           | `SlTree`                    |                            | 绑定树对象           |
| `treeNodeElement`      |           | `HTMLElement`               |                            | 本身node 渲染容器     |

## Methods

| Method                | Type                                  |
|-----------------------|---------------------------------------|
| `setNodeDataProperty` | `(key: string, value: unknown): void` |

## Events

| Event                   | Type                                      | Description                                      |
|-------------------------|-------------------------------------------|--------------------------------------------------|
| `sl-node-before-close`  | `{nodeData:TreeNodeData,node:SlTreeNode}` | Emitted before node close .                      |
| `sl-node-before-open`   | `{nodeData:TreeNodeData,node:SlTreeNode}` | Emitted before node open .                       |
| `sl-node-before-toogle` | `{nodeData:TreeNodeData,node:SlTreeNode}` | Emitted before node state change :open or close. |
| `sl-node-click`         | `{nodeData:TreeNodeData,node:SlTreeNode}` | Emitted when node name click.                    |
| `sl-node-close`         | `{nodeData:TreeNodeData,node:SlTreeNode}` | Emitted after node state close.                  |
| `sl-node-open`          | `{nodeData:TreeNodeData,node:SlTreeNode}` | Emitted after node state opened.                 |
| `sl-node-toogle`        | `{nodeData:TreeNodeData,node:SlTreeNode}` | Emitted when node state toogle.                  |

## CSS Shadow Parts

| Part               | Description                                |
|--------------------|--------------------------------------------|
| `base`             | The component's base wrapper.              |
| `children`         | The component's children wrapper.          |
| `node`             | The component's node self wrapper.         |
| `node-icon`        | The node icon.                             |
| `node-span`        | The component's node text render wrapper . |
| `node_toogle_icon` | The component's toogle icon.               |

## CSS Custom Properties

| Property                | Description                      |
|-------------------------|----------------------------------|
| `--sl-spacing-xx-small` | toogle-icon's margin from text . |


# sl-tree

## Properties

| Property                 | Attribute                  | Type                                             | Default                    | Description                                      |
|--------------------------|----------------------------|--------------------------------------------------|----------------------------|--------------------------------------------------|
| `checkCasecade`          | `check_casecade`           | `boolean`                                        | true                       | 当selectMode='check', 选中的时候是否支持级联选择（选中上级，下级自动选中）  |
| `checkOffCasecade`       | `check_off_casecade`       | `boolean`                                        | true                       | 当selectMode='check', 取消某个节点选中，下级节点是否也级联不选中       |
| `checkedKeys`            |                            | `unknown`                                        |                            | 树已经选中的节点，如果是多选，则为选中节点的ID值组成的数组，否则为选中节点的ID        |
| `enableFilter`           | `enable-filter`            | `boolean`                                        | false                      | 是否支持过滤                                           |
| `filterInputPlaceholder` | `filter-input-placeholder` | `string`                                         | ""                         | 树内置过滤input 的placeHolder                          |
| `filterMethod`           |                            | `TreeNodeFilter`                                 | "DEFAULT_TREE_FILTER"      | 当支持过滤是， 节点过滤函数，接收TreeNodeData, 和 所有的其他参数，true,则节点满足过滤条件 |
| `filterString`           |                            | `unknown`                                        | ""                         | 树节点过滤 参数，当支持过滤时启用                                |
| `handerCheckEvent`       |                            |                                                  |                            |                                                  |
| `handerRadioEvent`       |                            |                                                  |                            |                                                  |
| `hasFooter`              |                            | `boolean`                                        | false                      |                                                  |
| `includeRoot`            | `include_root`             | `boolean`                                        | true                       | 是否显示根节点                                          |
| `loading`                | `loading`                  | `boolean`                                        | false                      | 设置是加载状态                                          |
| `matchFilterNodeSet`     |                            | `Set<TreeNodeData> \| undefined`                 |                            | 存储 过滤后真实匹配的TreeNodeData                          |
| `nodeCacheMap`           |                            | `WeakMap<TreeNodeData, TreeNodeData> \| undefined` |                            | 存储过滤后的 节点数据的映射关系 ，key:过滤后的节点，value:原始的节点         |
| `nodeFilterCacheMap`     |                            | `WeakMap<TreeNodeData, TreeNodeData> \| undefined` |                            | 存储过滤后的 节点数据的映射关系 ，key:原始数据，value:过滤后产生的数据        |
| `nodeIDProperty`         |                            | `string`                                         | "id"                       | 数据ID属性，用于内置选中节点 ,默认=id                           |
| `nodeRender`             |                            | `NodeRenderInterface`                            | "DEFAULT_TREE_NODE_RENDER" | 节点渲染函数                                           |
| `real_treeNodeRender`    |                            | `NodeRenderInterface`                            | "nodeRender"               |                                                  |
| `renderRootNodeData`     |                            | `TreeNodeData \| undefined`                      |                            | 实际渲染的根节点数据                                       |
| `rootNodeData`           |                            | `TreeNodeData \| undefined`                      |                            | 根节点数据源                                           |
| `selectMode`             | `selectMode`               | `"none" \| "check" \| "radio" \| "single"`       | "single"                   | tree 选中方式 selectMode：支持的值为：check, radio,single,none （none,表示不支持选中,single) |
| `select_highlight`       |                            | `boolean`                                        | false                      | 选中的节点，是否高亮显示                                     |

## Methods

| Method                  | Type                                        | Description                                      |
|-------------------------|---------------------------------------------|--------------------------------------------------|
| `doFilter`              | `(): void`                                  | 实现树内部过滤逻辑                                        |
| `getClosetTreeNode`     | `(el: HTMLElement): SlTreeNode \| null`     | 获取 DOM 最近的TreeNode:<br /><br />**el**: tree shadowRoot 内部元素 |
| `getParentNodeData`     | `(data: TreeNodeData): TreeNodeData`        | 获取上级数据源                                          |
| `watchNodeRenderChange` | `(): void`                                  |                                                  |
| `watchSelectKeyChange`  | `(): Promise<void>`                         |                                                  |
| `watchSelectModeChange` | `(_oldMode: string, newMode: string): void` |                                                  |

## Events

| Event                        | Type                                             | Description                                    |
|------------------------------|--------------------------------------------------|------------------------------------------------|
| `sl-tree-checkKeys-change`   | `{checkKeyKeys:checkKeyKeys }`                   | Emitted when tree checkeys has changed .       |
| `sl-tree-node-before-close`  | `{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}` | Emitted before tree-node-state to close.       |
| `sl-tree-node-before-open`   | `{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}` | Emitted before tree-node-state to open.        |
| `sl-tree-node-before-toogle` | `{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}` | Emitted before tree-node-state change.         |
| `sl-tree-node-click`         | `{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}` | Emitted when tree-node-click.                  |
| `sl-tree-node-close`         | `{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}` | Emitted when tree-node-state change closed.    |
| `sl-tree-node-open`          | `{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}` | Emitted when tree-node-state change to opened. |
| `sl-tree-node-select-change` | `{node:SlTreeNode,checkKeyKeys:checkKeyKeys }`   | Emitted after tree select node change .        |
| `sl-tree-node-toogle`        | `{node: SlTreeNode,nodeData: TreeNodeData, parentData:TreeNodeData}` | Emitted when tree-node-state changed.          |

## Slots

| Name      | Description                                      |
|-----------|--------------------------------------------------|
| `filter`  | slot for custome filter                          |
| `footer`  | slot for footer                                  |
| `loading` | slot:when for  loading                           |
| `no-data` | slot:when no tree has no data  or rootNodeData is undefined. |

## CSS Shadow Parts

| Part          | Description                    |
|---------------|--------------------------------|
| `base`        | The tree's base wrapper.       |
| `modal`       | The tree's loading wrapper.    |
| `tree-body`   | The tree's tree nodes wrapper. |
| `tree-footer` | The tree nodes footer wrapper. |

## CSS Custom Properties

| Property    | Description                     |
|-------------|---------------------------------|
| `--example` | An example CSS custom property. |
