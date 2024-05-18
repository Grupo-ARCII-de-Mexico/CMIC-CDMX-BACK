/* export interface ProductOrder {
    amount:number;
    product:number | any;
    isProduct:boolean;
    idTamano?:number | any
    idOpcion?:number | any
} */


export interface ProductOrder{
     idProduct: number  
     cantidad: number, 
     type:string
     freeSides?:any
    }

export enum TypeProduct {
    PRODUCT="PRODUCT",
    ADICIONAL="ADICIONAL",
    SIZE="SIZE",
    OPCION="OPCION"
}