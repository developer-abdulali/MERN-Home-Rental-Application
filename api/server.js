// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import connectCloudinary from "./config/cloudinary.js";
// import adminRouter from "./routes/adminRoute.js";
// import doctorRouter from "./routes/doctorRoute.js";
// import userRouter from "./routes/userRoute.js";

// dotenv.config();

// const app = express();

// connectDB();
// connectCloudinary();

// // Middleware
// app.use(express.json());
// app.use(
//   cors({
//     // origin: ["http://localhost:5173", "http://localhost:5174"],
//     origin: [
//       process.env.FRONTEND_URL, // Frontend site
//       process.env.ADMIN_URL, // Admin site
//     ],
//     // methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // API endpoints
// app.use("/api/admin", adminRouter);
// app.use("/api/doctor", doctorRouter);
// app.use("/api/user", userRouter);

// // Test endpoint
// app.get("/", (req, res) => {
//   res.send("Doctor Booking Server is working");
// });

// const port = process.env.PORT || 4000;

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// // Export the app for Vercel
// export default app;

// api/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();

connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Doctor Booking Server is working");
});

export default app;
