import { Router} from "express"
import AuthRouter from "../modules/Auth/auth.route";

type TModuleRoutes = { path: string; router: Router }[];

const router = Router()
const moduleRoutes:TModuleRoutes = [
{
    path:"/auth",
    router:AuthRouter
}
] 


const routes = moduleRoutes.map(route=>router.use(route.path,route.router))

export default routes;








