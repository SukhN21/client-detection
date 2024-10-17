'use strict';

// UTILITY FUNCTION
function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

//      SYSTEM
function browserName() {
    const browserDetail = navigator.userAgent;
    let browser;

    switch (true) {
        case browserDetail.includes("Firefox"):
            browser = "Firefox";
            break;
        case browserDetail.includes("Chrome"):
            browser = "Chrome";
            break;
        case browserDetail.includes("OPR"):
            browser = "Opera";
            break;
        case browserDetail.includes("Edg"):
            browser = "Microsoft Edge";
            break;
        default:
            browser = "Unknown";
    }

    document.getElementById('browser').innerText = browser;
    document.getElementById('os').innerText = navigator.platform;
    document.getElementById('language').innerText = navigator.language;
}

//      WINDOW STATUS
function updateWindowStatus() {
    document.getElementById('width').innerText = `${window.innerWidth}px`;
    document.getElementById('height').innerText = `${window.innerHeight}px`;
    document.getElementById('orientation').innerText = `${window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'}`;
}

listen('resize', window, updateWindowStatus);
updateWindowStatus();

//      BATTERY STATUS
if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
        function updateBatteryStatus() {
            document.getElementById('battery-level').innerText = Math.floor(battery.level * 100) + '%';
            document.getElementById('battery-status').innerText = battery.charging ? 'charging' : 'idle';
        }

        updateBatteryStatus();

        listen('chargingchange', battery, updateBatteryStatus);
        listen('levelchange', battery, updateBatteryStatus);
    });
    
} else {
    document.getElementById('battery-level').innerText = 'Not available';
    document.getElementById('battery-status').innerText = 'Not available';
}

//      NETWORK STATUS
function updateStatus() {
    const onlineStatus = navigator.onLine ? 'ONLINE' : 'OFFLINE';
    document.querySelector('.status-button p').innerText = onlineStatus;
}

listen('online', window, updateStatus);
listen('offline', window, updateStatus);

updateStatus();



listen('DOMContentLoaded', document, browserName);