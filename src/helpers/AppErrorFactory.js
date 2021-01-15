import AppError from './AppError';

export const ERROR_OPERATE_MAP = 1;
export const ERROR_GET_CURRENT_POSITION_TIMEOUT = 2;

export function createOperateMapError(cause) {
    return new AppError(ERROR_OPERATE_MAP, '操作地图发生错误', cause);
}
export function createGetCurrentPositionTimeoutError() {
    return new AppError(ERROR_GET_CURRENT_POSITION_TIMEOUT, '获取当前位置超时');
}
export function createGetCurrentPositionUnknownError() {
    return new AppError(
        ERROR_GET_CURRENT_POSITION_TIMEOUT,
        '获取当前位置发生未知错误',
    );
}
