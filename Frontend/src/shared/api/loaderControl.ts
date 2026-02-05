// Utility to trigger loader events from anywhere
import loaderEventEmitter from '../utils/loaderEventEmitter';

export function startScreenLoader() {
  loaderEventEmitter.emit('startLoader');
}

export function stopScreenLoader() {
  loaderEventEmitter.emit('stopLoader');
}
