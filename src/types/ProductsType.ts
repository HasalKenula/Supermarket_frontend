import CategoryType from "./CategoryType";

interface ProductsType{
    id:number,
    name:string,
    description:string,
    price:number,
    size:number,
    category:CategoryType
}

export default ProductsType;