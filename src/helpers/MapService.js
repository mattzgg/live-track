let map;

function setMap(mapRef) {
    map = mapRef;
}

function handleCommand(command) {
    if (!map) {
        return;
    }
    map.handleCommand(command);
}

export default { setMap, handleCommand };
