import ProductsType from "./ProductsType";

interface OrderType{
    id:NamedCurve,
    orderDateTime:Date,
    totalPrice:number,
    OrderedProducts:ProductsType[]
}

export default OrderType;