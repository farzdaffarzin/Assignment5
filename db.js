// @ts-ignore
import MySql from "mysql2/promise";

const farzadStNum = "A01385792";

/**
 * @param {MySql.Connection} connection
 */
export async function checkUserTable(connection) {
  try {
    const [rows] = await connection.query("SHOW TABLES LIKE ?", [
      `${farzadStNum}_user`,
    ]);

    if (rows.length === 0) {
      // Create the 'user' table
      await connection.query(`
          CREATE TABLE ${farzadStNum}_user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
      console.log("User table created successfully.");
    } else {
      console.log("User table already exists.");
    }
  } catch (error) {
    console.error("Error checking/creating user table:", error);
  } finally {
    // Close the connection
    // connection.end();
  }
}

/**
 * @param {Connection} connection
 */
export async function checkTimelineTable(connection) {
  try {
    const [timelineRows] = await connection.query("SHOW TABLES LIKE ?", [
      `${farzadStNum}_user_timeline`,
    ]);

    if (timelineRows.length === 0) {
      // Create the 'timeline' table
      await connection.query(`
          CREATE TABLE ${farzadStNum}_user_timeline (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES ${farzadStNum}_user(id),
            post_date DATE NOT NULL,
            post_text TEXT,
            post_time TIME,
            views_count INT DEFAULT 0
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
      console.log("Timeline table created successfully.");
    } else {
      console.log("Timeline table already exists.");
    }
  } catch (error) {
    console.error("Error checking/creating timeline table:", error);
  } finally {
    // Close the connection
    // connection.end();
  }
}
