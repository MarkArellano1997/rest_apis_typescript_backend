import express from "express"
import colors from 'colors'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from "./config/swagger"
import router from "./router"
import db from "./config/db"

//Conectar a base de datos

export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.green('Conexión exitosa a la DB'))
        
    } catch (error) {
        // console.log('Error');
        console.log(colors.red.bold('Hubo un error al conectar la DB'));
        
    }
}

connectDB()

//Instancia de express
const server = express()

//Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        }else {
            console.log('Denegar');
            callback(new Error('Error de CORS'))
        }
        
    }
}

server.use(cors(corsOptions))

//leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

//Docs

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server