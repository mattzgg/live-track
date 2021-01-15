import Geolocation from 'react-native-geolocation-service';
import {
    createGetCurrentPositionUnknownError,
    createGetCurrentPositionTimeoutError,
} from '../../../../helpers/AppErrorFactory';

export default function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                resolve(position);
            },
            ({ code }) => {
                switch (code) {
                    case 3:
                        reject(createGetCurrentPositionTimeoutError());
                        break;
                    default:
                        reject(createGetCurrentPositionUnknownError());
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
    });
}
