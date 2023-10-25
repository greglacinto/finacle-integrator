import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import cors, { CorsOptions } from 'cors'
import homeRoutes from "./routes/home.routes";


const app: Express = express()
const corsOption: CorsOptions = { origin: "*" }
dotenv.configDotenv()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOption))
app.use(homeRoutes)

app.use('/', (_req: Request, _res: Response) => {
  _res.status(200).send('Server is listening')
})

// error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`server is up! Listening on port ${port}`)

  if (!process.env.TOKEN_URL) {
    throw new Error("TOKEN_URL environment variable missing")
  }
  if (!process.env.FI_URL) {
    throw new Error("FI_URL environment variable missing")
  }
  

})