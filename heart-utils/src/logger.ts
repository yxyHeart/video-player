enum LogLevel {
    LOG = 'log',
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

const LOG:LogLevel = LogLevel.LOG
console.log(LOG)
const logger = {
    log(level:`${LogLevel}`,...params:any[]){
        const method = console[level]?level:'log'
        console.log()
    },
    debug(...args:any[]){
        this.log(LogLevel.DEBUG,...args)
    },
    info(...args: any[]) {
        this.log(LogLevel.INFO, ...args)
    },

    warn(...args: any[]) {
        this.log(LogLevel.WARN, ...args)
    },

    error(...args: any[]) {
        this.log(LogLevel.ERROR, ...args)
    },
}

export default logger