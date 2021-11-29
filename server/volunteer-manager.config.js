module.exports = {
    apps: [{
        name: "VolunteerManager",
        script: "./index.js",
        env: {
            NODE_ENV: "development",
            DB_CONN_STR: "",
            CALLBACK_URL: "",
            CLIENT_SECRET: "",
            SESSION_SECRET: ""
        },
        env_test: {
            NODE_ENV: "test",
            DB_CONN_STR: "",
            CALLBACK_URL: "",
            CLIENT_SECRET: "",
            SESSION_SECRET: ""
        },
        env_staging: {
            NODE_ENV: "staging",
            DB_CONN_STR: "",
            CALLBACK_URL: "",
            CLIENT_SECRET: "",
            SESSION_SECRET: ""
        },
        env_production: {
            NODE_ENV: "production",
            DB_CONN_STR: "",
            CALLBACK_URL: "",
            CLIENT_SECRET: "",
            SESSION_SECRET: ""
        }
    }]
}
