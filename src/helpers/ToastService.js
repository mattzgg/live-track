import { DURATION } from 'react-native-easy-toast';

let toast;

function setToast(toastRef) {
    toast = toastRef;
}

function show(message, duration = DURATION.LENGTH_SHORT) {
    if (!toast) {
        return;
    }
    toast.show(message, duration);
}

export default {
    setToast,
    show,
};
