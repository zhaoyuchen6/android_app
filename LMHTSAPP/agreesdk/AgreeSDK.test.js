window.AgreeSDK.test = {
    syncTest(service, action, args) {
        return window.AgreeSDK.bridge.execSync(
            service,
            action,
            args
        );
    },

    asyncTest(options, service, action, args) {
        window.AgreeSDK.bridge.exec(
            options.complete,
            options.success,
            options.fail,
            service,
            action,
            args
        );
    },

    asyncFileWrite(options, service, action, args) {
        window.AgreeSDK.bridge.exec(
            options.complete,
            options.success,
            options.fail,
            service,
            action, 
            args
        );
    },
    
};