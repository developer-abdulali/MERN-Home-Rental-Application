// api/index.js
import app from "./server.js";

export default app;

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});