import { Transport } from "@nestjs/microservices";
require('dotenv/config');
const transportOption: number = Transport.RMQ
const url = process.env.RABBIT
export const envConfig = {
    RABBIT: 
    [
        {
            name: "SERVICE_PRODUCT",
            transport: transportOption,
            options: {
                urls: [url],
                queue: 'product',
                queueOptions: {
                    durable: false
                },
            }
        },
        {
            name: "SERVICE_SHOPPING",
            transport: transportOption,
            options: {
                urls: [process.env.RABBIT],
                queue: 'shopping',
                queueOptions: {
                    durable: false
                },
            }
        },
        {
            name: 'SERVICE_USER',
            transport: transportOption,
            options: {
                urls: [process.env.RABBIT],
                queue: 'user',
                queueOptions: {
                    durable: false
                },
            }
        }
    ]
};