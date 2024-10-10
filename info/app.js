import  express  from "express"; 
import  cors  from "cors";
import  dotenv  from "dotenv";
import  {errorMiddleware} from './Middlewares/error.js'
import dbConnection from "./Database/dbConnection.js";
import userRouter from "./Router/UserRoutes.js";
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import JwksRsa from "jwks-rsa";



const app = express();
app.use(cors({

  origin:["http://localhost:5173", "http://localhost:4000"],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
 

}))
// app.options('*', cors());
dotenv.config({path:"./Config/config.env"})
app.use(express.json());


const client = JwksRsa({
    jwksUri: `https://dev-i3wl8agttv16q6iq.us.auth0.com/.well-known/jwks.json`
  });  
  // Function to get signing key from JWKS
  function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    });
  }
// app.get("/verify",(req,res) => {
    const verifyJWT = (req, res, next) => {
    const Header = req.headers["authorization"].split(" ")[1];
    // console.log(Header)
    const decoded = jwt.decode(Header);
    // console.log(decoded);



    jwt.verify(Header, getKey, {
        audience: 'https://dev-i3wl8agttv16q6iq.us.auth0.com/api/v2/',
        issuer: `https://dev-i3wl8agttv16q6iq.us.auth0.com/`,
        algorithms: ['RS256']
      }, (err, decoded) => {
        if (err) {
          console.error('Token verification failed:', err);
          return res.status(401).send({err:"Invalid token"});
        }
        
        // console.log('Token is valid:', decoded);
        req.user = decoded;
        next()
        // Return the decoded token
      });
    }
// })
app.get("/verify",verifyJWT,(req,res) => {
  console.log(req.user)
  res.send({mesage:"hello"})
})
app.get("/",(req,res) => {
  
  res.send({success:true,message:"hogaya"})
})


app.use(cookieParser())
app.use("/api/user",userRouter)

dbConnection()
app.use(errorMiddleware)


export default app;
