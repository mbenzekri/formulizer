type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'NONE'

interface FzLogContext {
    [name: string]: any
}

// type LoggerMethods = {
//     debug: (...args: any[]) => void
//     info: (...args: any[]) => void
//     warn: (...args: any[]) => void
//     error: (...args: any[]) => void
//     if: {
//         debug: (cond: boolean, ...args: any[]) => void
//         info: (cond: boolean, ...args: any[]) => void
//         warn: (cond: boolean, ...args: any[]) => void
//         error: (cond: boolean, ...args: any[]) => void
//     }
// }

function isA(obj: any, name: string) {
    let proto = Object.getPrototypeOf(obj ?? {})
    while (proto) {
        if (proto.constructor?.name === name) return true;
        proto = Object.getPrototypeOf(proto)
    }
    return false;
}

class _FzLogger {
    private static levels: Record<LogLevel, number> = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        NONE: 4
    }
    private static registry: Map<string, LogLevel> = new Map()
    /** Set global log level per domain */
    static set(...args: (string | LogLevel)[]) {
        let level: LogLevel = "NONE"
        for (const item of args) {
            if (['DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'].includes(item)) {
                level = item as LogLevel
            } else {
                FzLogger.registry.set(item, level)
            }
        }
    }
    /** Returns a logger for a domain, optionally scoped with context */
    static get(domain: string, context?: FzLogContext): _FzLogger {
        return new FzLogger(domain,context) 
    }

    constructor(readonly domain: string, readonly context: FzLogContext={}) {}

    shouldLog(lvl: LogLevel){
        const level = FzLogger.registry.get(this.domain)
        return (level == null) ? false : FzLogger.levels[lvl] >= FzLogger.levels[level]
    }

    format(msg: string, ...args: any[]) {
        const ctxstrings: string[] = []
        for (const property in this.context) {
            if (isA(this.context[property], "FzField") || isA(this.context[property], "Schema"))
                ctxstrings.push(`${property}: ${this.context[property].pointer}`)
        }
        return [`[${this.domain}][${ctxstrings.join(" ")}] ${msg}`, ...args]
    }

    log(lvl: LogLevel, ...args: any[]) {
        if (!this.shouldLog(lvl)) return
        const pattern = args.shift()
        const msg = this.format(pattern, ...args)
        switch (lvl) {
            case 'DEBUG': console.debug(...msg); break
            case 'INFO': console.info(...msg); break
            case 'WARN': console.warn(...msg); break
            case 'ERROR': console.error(...msg); break
        }
    }
    debug(...a: any[])  { this.log('DEBUG', ...a)}
    info(...a: any[]) { this.log('INFO', ...a)}
    warn(...a: any[]) { this.log('WARN', ...a)}
    error(...a: any[]) { this.log('ERROR', ...a)}
    
    get if() {
        const that = this
        return {
            debug: (c: boolean, ...a: any[]) => c && that.log('DEBUG', ...a),
            info: (c: boolean, ...a: any[]) => c && that.log('INFO', ...a),
            warn: (c: boolean, ...a: any[]) => c && that.log('WARN', ...a),
            error: (c: boolean, ...a: any[]) => c && that.log('ERROR', ...a),
        }
    }


}
// class _FzLogger {
//     private static levels: Record<LogLevel, number> = {
//         DEBUG: 0,
//         INFO: 1,
//         WARN: 2,
//         ERROR: 3,
//         NONE: 4
//     }

//     private static registry: Map<string, LogLevel> = new Map()

//     /** Set global log level per domain */
//     static set(...args: (string | LogLevel)[]) {
//         let level: LogLevel = "NONE"
//         for (const item of args) {
//             if (['DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE'].includes(item)) {
//                 level = item as LogLevel
//             } else {
//                 FzLogger.registry.set(item, level)
//             }
//         }
//     }

//     /** Returns a logger for a domain, optionally scoped with context */
//     static get(domain: string, context?: FzLogContext): LoggerMethods {
//         function isA(obj: any, name: string) {
//             let proto = Object.getPrototypeOf(obj ?? {})
//             while (proto) {
//                 if (proto.constructor?.name === name) return true;
//                 proto = Object.getPrototypeOf(proto)
//             }
//             return false;
//         }

//         const ctxstrings: string[] = []
//         for (const property in context) {
//             if (isA(context[property], "FzField") || isA(context[property], "Schema"))
//                 ctxstrings.push(`${property}: ${context[property].pointer}`)
//         }
//         const shouldLog = (lvl: LogLevel) => {
//             const level = FzLogger.registry.get(domain)
//             return (level == null) ? false : FzLogger.levels[lvl] >= FzLogger.levels[level]
//         }

//         const format = (msg: string, ...args: any[]) => {
//             return [`[${domain}][${ctxstrings.join(" ")}] ${msg}`, ...args]
//         }

//         const log = (lvl: LogLevel, ...args: any[]) => {
//             if (!shouldLog(lvl)) return
//             const pattern = args.shift()
//             const msg = format(pattern, ...args)
//             switch (lvl) {
//                 case 'DEBUG': console.debug(...msg); break
//                 case 'INFO': console.info(...msg); break
//                 case 'WARN': console.warn(...msg); break
//                 case 'ERROR': console.error(...msg); break
//             }
//         }

//         return {
//             debug: (...a) => log('DEBUG', ...a),
//             info: (...a) => log('INFO', ...a),
//             warn: (...a) => log('WARN', ...a),
//             error: (...a) => log('ERROR', ...a),
//             if: {
//                 debug: (c, ...a) => c && log('DEBUG', ...a),
//                 info: (c, ...a) => c && log('INFO', ...a),
//                 warn: (c, ...a) => c && log('WARN', ...a),
//                 error: (c, ...a) => c && log('ERROR', ...a),
//             }
//         }
//     }
// }
// Attach to global
(globalThis as any).FzLogger = _FzLogger

// Export for usage in other modules (if needed)
export { _FzLogger as FzLogger }

// Tell TypeScript it's globally available
declare global {
    const FzLogger: typeof _FzLogger
}
