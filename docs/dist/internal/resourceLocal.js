import { addEvent } from '../utilities/common';
import { resouce_changeEvent } from '../utilities/getResouce';
export default function resourceLocal() {
    return function (target) {
        target.addInitializer((element) => {
            let result;
            element.addController({
                hostConnected() {
                    result = addEvent(window, resouce_changeEvent, () => {
                        element.requestUpdate();
                    });
                },
                hostDisconnected() {
                    result.dispose();
                }
            });
        });
    };
}
