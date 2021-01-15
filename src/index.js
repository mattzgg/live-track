import { KeepAwake, registerRootComponent } from 'expo';
import AppContainer from './AppContainer';

if (__DEV__) {
    KeepAwake.activate();
}

registerRootComponent(AppContainer);
