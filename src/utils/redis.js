const { createClient, createCluster } = require('redis')

const client = await createClient().on('error', console.log('Redis Client Error', err)).connect()

await client.set('key', 'value')
const value = await client.get('key')
await client.disconnect()
console.log(value);