import Config from "./Interfaces/config";

const config: Config = {
    mongoDBAddress: `${process.env.VUE_APP_MONGODB_ADDRESS}`,
    jwtSecret: `${process.env.VUE_APP_JWT_SECRET}`,
    jwtHeader: "eyJhbGciOiJIUzI1NiJ9.",
    sessionSecret: `${process.env.VUE_APP_SESSION_SECRET}`,
    redis: {
        host: `${process.env.VUE_APP_REDIS_HOST}`,
        password: `${process.env.VUE_APP_REDIS_PASSWORD}`,
        port: Number(String(`${process.env.VUE_APP_REDIS_PORT}`)),
    },
    captchaKey: `${process.env.VUE_APP_SERVER_CAPTCHA_KEY}`,
    devMode: true,
    domain: `${process.env.VUE_APP_CLIENT_DOMAIN}`,
    allowedOrigins: [ `${process.env.VUE_APP_CLIENT_DOMAIN}`, `${process.env.VUE_APP_SERVER_DOMAIN}:`, `${process.env.VUE_APP_CDN_DOMAIN}` ],
    googleDrive: {
        client_id: `${process.env.VUE_APP_GDRIVE_CLIENT_ID}`,
        client_secret: `${process.env.VUE_APP_GDRIVE_CLIENT_SECERT}`,
        key: `${process.env.VUE_APP_GDRIVE_KEY}`,
        url: `${process.env.VUE_APP_GDRIVE_URL}`
    },
    IPs: [],
    port: Number(String(`${process.env.VUE_APP_SERVER_PORT}`)),
    allowAllOrigins: Boolean(String(`${process.env.VUE_APP_ALLOW_ALL_ORIGINS}`)),
    fileCDNSecret: `${process.env.VUE_APP_FILE_CDN_SECRET}`,
    nodemailer: {
        from: `${process.env.VUE_APP_NODEMAILER_FROM}`,
        pass: `${process.env.VUE_APP_NODEMAILER_PASS}`,
        service: `${process.env.VUE_APP_NODEMAILER_SERVICE}`,
        user: `${process.env.VUE_APP_NODEMAILER_USER}`
    },
}
export default config;