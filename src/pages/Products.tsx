import { useEffect, useState } from "react";
import ProductsType from "../types/ProductsType";
import CategoryType from "../types/CategoryType";
import axios from "axios";

function Products(){

    const[products,setProducts]=useState<ProductsType[]>([]);
    const[productName,setProductName]=useState<string>("");
    const[productDescription,setProductDescription]=useState<string>("");
    const[productPrice,setProductPrice]=useState<number>(0);
    const[categoryId,setCategoryId]=useState<number>(0);
    const[productSize,setProductSize]=useState<number>(0);
    const[categories,setCategories]=useState<CategoryType[]>([]);

    function handleProductName(event:any){
        setProductName(event.target.value);
    }

    function handleproductDescription(event:any){
        setProductDescription(event.target.value);
    }
    
    function handleproductPrice(event:any){
        setProductPrice(event.target.value);
    }
    
    function handlecategoryId(event:any){
        setCategoryId(event.target.value);
    }

    function handleproductSize(event:any){
        setProductSize(event.target.value);
    }
    


    async function getProducts(){
        const apiResponse=await axios.get("http://localhost:8081/product");
        setProducts(apiResponse.data);
    }

    async function loadCategories(){
        const response=await axios.get("http://localhost:8081/category");
        setCategories(response.data);
    }

    async function addCategory(){
        await axios.post("http://localhost:8081/product",{
            name:productName,
            description:productDescription,
            price:productPrice,
            size:productSize,
            categoryId:categoryId
        });
        getProducts();
    }

    useEffect(function (){
        getProducts();
        loadCategories();
    },[])

    const[productEditing,setProductEditing]=useState<ProductsType|null>();

    function editProduct(product:ProductsType){
        setProductEditing(product);
        setProductName(product.name);
        setProductPrice(product.price);
        setCategoryId(product.category.id);
        setProductDescription(product.description);
        setProductSize(product.size);

    }

    async function updateProduct(){
        try {
            await axios.put(`http://localhost:8081/product/${productEditing?.id}`,{
                name:productName,
                description:productDescription,
                price:productPrice,
                size:productSize,
                categoryId:categoryId,
            });
            getProducts();
            setProductEditing(null);
            setProductName("");
            setProductPrice(0);
            setProductSize(0);
            setProductDescription("");
            setCategoryId(0);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(productId:number){
        try {
            await axios.delete(`http://localhost:8081/product/${productId}`);
            getProducts();
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">Products</h1>

            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[50px] text-left">Product Name</th>
                        <th className="p-2 w-[50px] text-left">Product Price</th>
                        <th className="p-2 w-[50px] text-left">Product Size</th>
                        <th className="p-2 w-[50px] text-left">Category</th>
                        <th className="p-2 w-[50px] text-left"></th>
                        <th className="p-2 w-[50px] text-left"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(function(product){
                        return(
                            <tr key={product.id}>
                                <td className="p-2 text-slate-600 border border-slate-200">{product.id}</td>
                                <td className="p-2 text-slate-600 border border-slate-200">{product.name}</td>
                                <td className="p-2 text-slate-600 border border-slate-200">{product.price}</td>
                                <td className="p-2 text-slate-600 border border-slate-200">{product.size}</td>
                                <td className="p-2 text-slate-600 border border-slate-200">{product.category.name}</td>
                                <td> <button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={()=>editProduct(product)}>Edit</button></td>
                                <td><button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={()=>deleteProduct(product.id)}>Delete</button> </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>

            <div className="mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
                <h2 className="text-xl font-medium mb-4">{productEditing ? "Edit Product" : "Add Product"}</h2>

                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter product name</label>
                    <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={productName} onChange={handleProductName}/>
                </div>

                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter product description</label>
                    <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={productDescription} onChange={handleproductDescription}/>
                </div>

                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter product price</label>
                    <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={productPrice} onChange={handleproductPrice}/>
                </div>

                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter product size</label>
                    <input type="text" className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={productSize} onChange={handleproductSize}/>
                </div>

                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter product category</label>
                    <select className="block w-full p-2 border border-salte-300 rounded-lg text-slate-600 text-sm mb-4" value={categoryId} onChange={handlecategoryId}>
                        <option value="">Select Category</option>
                        {categories.map(function(category){
                            return(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })}
                     </select>   
                </div>

                {productEditing ?(<button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={updateProduct}>Update Category</button>):(<button className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={addCategory}>add Category</button>)}

            </div>

        </div>
    )

}

export default Products;