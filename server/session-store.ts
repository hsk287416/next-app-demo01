import IORedis from 'ioredis';

/**
 * 为session_id添加前缀
 * @param {string} sid session_id
 */
function getRedisSessionId(sid: string) {
    return `ssid:${sid}`;
}

class RedisSessionStore {

    client: IORedis.Redis;

    constructor(client: IORedis.Redis) {
        this.client = client;
    }

    /**
     * 获取redis中存储的session数据
     * @param {string} sid session_id
     */
    async get(sid: string) {
        const id = getRedisSessionId(sid);
        const data = await this.client.get(id);
        if (!data) {
            return null;
        }
        try {
            const result = JSON.parse(data);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    /**
     * 
     * @param {string} sid session_id
     * @param {object} sessionData session数据
     * @param {number} ttl 过期时间(秒)
     */
    async set(sid: string, sessionData: any, ttl?: number) {
        const id = getRedisSessionId(sid);
        try {
            const sessStr = JSON.stringify(sessionData);
            if (ttl) {
                ttl = Math.ceil(ttl / 1000);
                await this.client.setex(id, ttl, sessStr);
            } else {
                await this.client.set(id, sessStr);
            }
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * 从redis中删除指定session
     * @param {string} sid session_id
     */
    async destroy(sid: string) {
        const id = getRedisSessionId(sid);
        await this.client.del(id);
    }
}

export default RedisSessionStore;
