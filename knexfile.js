const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: "ncnews"
    }
  },
  test: {
    connection: {
      database: "ncnews_test"
    }
  },
  production: {
    connection: `${process.env.DATABASE_URL}?ssl=true`
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
