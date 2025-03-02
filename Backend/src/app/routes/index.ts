import { Router} from "express"

type TModuleRoutes = { path: string; router: Router }[];

const router = Router()
const moduleRoutes:TModuleRoutes = [

] 


const routes = moduleRoutes.map(route=>router.use(route.path,route.router))

export default routes;








