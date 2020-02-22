import * as rateLimiter from 'express-rate-limit';

export default function rateLimit (time,maxReq,message) {
    return rateLimiter({
        windowsMs: time,
        max: maxReq,
        message: message
    })
}