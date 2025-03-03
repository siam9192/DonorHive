export interface IFbDataResponse {
    id:string,
    name:string,
    email:string,
    picture:{
        data:{
            height:number,
            width:number,
            url:string
        }
    }
}


export type TEnvironment = `${EEnvironment}`

export enum EEnvironment  {
 Development = "DEVELOPMENT",
 Production = "Production"
}