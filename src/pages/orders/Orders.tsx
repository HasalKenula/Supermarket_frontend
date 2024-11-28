import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";
import axios from "axios";

function Orders(){
    const[orders,setOrders]=useState<OrderType[]>([]);

    async function loadOrders(){
        try {
            const response=await axios.get("http://localhost:8081/order");
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function(){
        loadOrders();
    },[])

    return(
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">Orders</h1>

            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[50px] text-left">Date</th>
                        <th className="p-2 w-[50px] text-left">Total Price</th>

                    </tr>
                </thead>
                <tbody>
                    {orders.map(function(Order){
                        return(
                            <tr key={Order.id}>
                                <td  className="p-2 text-slate-600 border-b border-slate-200">{Order.id}</td>
                                <td  className="p-2 text-slate-600 border-b border-slate-200" >{Order.orderDateTime}</td>
                                <td  className="p-2 text-slate-600 border-b border-slate-200">{Order.totalPrice}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

        </div>
    )

}

export default Orders;