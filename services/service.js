class ProductService{
    getData(){
        let promise=fetch("http://localhost:4070/api/products");
        return promise;
    }
    postData(prd){
        let promise=fetch("http://localhost:4070/api/products",
        {
            method: "POST",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }
    deleteData(id){
        let promise=fetch(`http://localhost:4070/api/products/${id}`,
        {
            method: "DELETE",
            headers:{
                "content-type":"application/json",
            },
          //  body: JSON.stringify(prd)
        });
        return promise;
    }
    updateData(id,prd){
        let promise=fetch(`http://localhost:4070/api/products/${id}`,
        {
            method: "PUT",
            headers:{
                "content-type":"application/json",
            },
            body: JSON.stringify(prd)
        });
        return promise;
    }

}

export default ProductService;