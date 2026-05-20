import rateLimit from 'express-rate-limit'
import Redis from 'ioredis'
import RedisStore from 'rate-limit-redis'
const redisClient = new Redis()

const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200, // max req per 15 min
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // send rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
    store: new RedisStore({
        sendCommand: (command: string, ...args: any[]) => redisClient.call(command, ...args) as any,
    }),
    keyGenerator: (req: any) => { 
        return req.userId || req.ip // use userId as key if authenticated, otherwise use IP address
    },
})

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 10, // max req per 15 min
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // send rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // disable the `X-RateLimit-*` headers
    store: new RedisStore({
        sendCommand: (command: string, ...args: any[]) => redisClient.call(command, ...args) as any,
    }),
    //auto count set to ip
})
export { apiRateLimiter,authRateLimiter}