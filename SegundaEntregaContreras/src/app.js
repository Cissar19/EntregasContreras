import express, { urlencoded } from "express";
import exphbs from "express-handlebars";
import mongoose from "mongoose";
import _dirname from "./utils.js";

import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.router.js";
import path from "path";

const app = express();
const PORT = 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, "public")));

// motor de plantillas
app.set("views", path.join(_dirname, "views"));

app.engine(
  ".hbs",
  exphbs.engine({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

// endpoints
app.use("/", viewsRouter);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

const httpServer = app.listen(PORT, () => {});

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.sbrociu.mongodb.net/test"
    );
    console.log("Estamos arriba papussss ");
  } catch (error) {
    console.error("No se pudo conectar a la BD usando Moongose: " + error);
    process.exit();
  }
};
connectMongoDB();
