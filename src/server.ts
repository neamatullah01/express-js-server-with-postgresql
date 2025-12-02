import { Result } from "./../node_modules/@types/pg/index.d";
import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import { userRoutes } from "./modules/user/user.route";

const app = express();
const port = config.port;

app.use(express.json());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//*users table crud operation:

//post users:
app.use("/users", userRoutes);
// row express js code:
// app.post("/users", async (req: Request, res: Response) => {
//   const { name, email } = req.body;
//   try {
//     const result = await pool.query(
//       `
//       INSERT INTO users(name,email) VALUES($1, $2) RETURNING *
//       `,
//       [name, email]
//     );
//     res.status(201).json({
//       success: true,
//       message: "Data inserted",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

//get all users:

// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`
//       SELECT * FROM users
//       `);
//     res.status(200).json({
//       success: true,
//       message: "Data retrieved",
//       data: result.rows,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

///get single user
// app.get("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(
//       `
//       SELECT * FROM users WHERE id=$1
//       `,
//       [req.params.id]
//     );
//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "user not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Data retrieved",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

//update single user data:

// app.put("/users/:id", async (req: Request, res: Response) => {
//   const { name, email } = req.body;
//   try {
//     const result = await pool.query(
//       `
//       UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *
//       `,
//       [name, email, req.params.id]
//     );
//     if (result.rows.length === 0) {
//       res.status(404).json({
//         success: false,
//         message: "user not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "user updated",
//       data: result.rows[0],
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

//delete single user:
// app.delete("/users/:id", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(
//       `
//       DELETE FROM users WHERE id=$1
//       `,
//       [req.params.id]
//     );
//     if (result.rowCount === 0) {
//       res.status(404).json({
//         success: false,
//         message: "user not found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "user Deleted",
//       data: result.rows,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

//*todos table crud operation:

//post todos data:

app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `
      INSERT INTO todos(user_id, title) VALUES($1,$2) RETURNING *
      `,
      [user_id, title]
    );
    res.status(201).json({
      success: true,
      message: "Todos created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get todos data:
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM todos
      `);
    res.status(200).json({
      success: true,
      message: "Data retrieved",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//handle not found route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
