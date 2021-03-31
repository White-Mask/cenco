// CDP Proc.
const config2 = {
    user: 'sma_appl',
    password: 'aplic321',
    server: 'spmacdp01\\cdp',
    database: 'RETAIL',
    requestTimeout: 180000,
    connectionTimeout: 20000,
    options: {
        encrypt: false,
        enableArithAbort: true,
        tdsVersion: '7_1'
    }
};

export default config2;