import { carRoutes, clientRoutes, maintenceRoutes } from "@main/routes";
import cors from "cors";
import express from "express";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/cars", carRoutes);
app.use("/clients", clientRoutes);
app.use("/maintences", maintenceRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
