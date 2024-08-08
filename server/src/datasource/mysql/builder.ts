const mysql = require("mysql2/promise");

const connectionPool: any = {};

class Builder {
  /**
   * Crée ou récupère un pool de connexions pour la base de données MySQL.
   */
  static async db(database = process.env.MYSQL_DATABASE) {
    if (!connectionPool[database]) {
      const connectionConfig = {
        host: process.env.DATABASE_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database,
        port: process.env.DATABASE_PORT
          ? parseInt(process.env.DATABASE_PORT, 10)
          : 3306,
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
        ssl:
          process.env.APP_ENVIRONMENT === "dev"
            ? { rejectUnauthorized: false }
            : true,
      };

      console.log(
        `===> SQL Connection for ${database}: ${process.env.APP_ENVIRONMENT} MODE`
      );
      connectionPool[database] = mysql.createPool(connectionConfig);
    }
    return connectionPool[database];
  }
}

export default Builder;
