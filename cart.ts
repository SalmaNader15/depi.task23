let num = document.querySelector<HTMLElement>(".num")!;
let price = document.querySelector<HTMLElement>(".price")!;
let car = document.querySelector<HTMLElement>(".car")!;
    calcPrice();
    calcNumber();
async function showProduct(url:string) {
    try{
            let s=await fetch(url)
            let l=await s.json();
            let x=l.data;
            x.forEach((element:any,index:number) =>{
                car.innerHTML+=`<div class="row justify-content-between p-4 shadow-lg g-4">
                <div class="col-12 col-sm-6 d-flex gap-3 justify-content-between pe-sm-5 pe-0 ">
                    <h5>${index+1}</h5>
                    <img src="${element.imageUrl}" alt="" style="width: 100px; height: 100px;">
                </div>
                <div class="col-12 d-flex col-sm-6 justify-content-between pe-sm-5 ps-0 pt-3 ">
                    <div>
                    <h5 class="">${element.name}</h5>
                    <h6>${element.price}</h6>
                    </div>
                    <div class="text-center">
                    <i class="bi bi-trash text-danger fs-3 px-1 basket" onclick="deleteItem('${element._id}')"></i>
                    <div class="d-flex gap-3 justify-content-center">
                        <button class="text-bg-warning text-light border-0 p-1 px-2" onclick="increment('${element._id}', ${element.__v})">+</button>
                        <h6 class="mt-2">${element.__v+1}</h6>
                        <button class="text-bg-warning text-light border-0 p-1 px-2" onclick="decrement('${element._id}', ${element.__v})">-</button>
                    </div>
                    </div>
                </div></div>`
            });
            calcPrice();
        }
        catch(err){
            console.log(err);
        }
}
showProduct("https://e-commerce-backend-h4zm.vercel.app/api/products");
    async function calcPrice() {
        try {
            let total:number=0;
            let t=await fetch("https://e-commerce-backend-h4zm.vercel.app/api/products")
            let v=await t.json();
            let x=v.data;
            x.forEach((element:any) => {
                total+=element.price*(element.__v+1) ;
            });
            price.innerText=total.toString();
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteItem(i:number) {
        try{
            let a=await fetch(`https://e-commerce-backend-h4zm.vercel.app/api/products/${i}`,{
                method:"DELETE"
            });
            calcPrice();
            car.innerHTML = "";
            showProduct("https://e-commerce-backend-h4zm.vercel.app/api/products");
        }
        catch(err){
            console.log(err);
            
        }
    }

    async function increment(i:number,c:number) {
        try {
            let count=c+1;
            let f=await fetch(`https://e-commerce-backend-h4zm.vercel.app/api/products/${i}`,{
                method:"PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ __v: count })

                
            })
            calcPrice();
            car.innerHTML = "";
            showProduct("https://e-commerce-backend-h4zm.vercel.app/api/products");
        } catch (error) {
            console.log(error);
            
        }
    }
    async function decrement(i:number,c:number) {
        try {
            let count=c-1;
            if (count<0) {
                return ;
            }
            else{
                let f=await fetch(`https://e-commerce-backend-h4zm.vercel.app/api/products/${i}`,{
                method:"PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ __v: count })

            })
            }
            calcPrice();
            car.innerHTML = "";
            showProduct("https://e-commerce-backend-h4zm.vercel.app/api/products");
        } catch (error) {
            console.log(error);
            
        }
    }
    async function calcNumber() {
        try {
            let t=await fetch("https://e-commerce-backend-h4zm.vercel.app/api/products")
            let v=await t.json();
            let x=v.data
            let number=x.length;
            num.innerText=number.toString();
            
        } catch (error) {
            console.log(error);
        }
    }
declare global {
  interface Window {
    decrement: (i: number,c:number) => Promise<void>;
  }
}
window.decrement = decrement;
declare global {
  interface Window {
    increment: (i: number,c:number) => Promise<void>;
  }
}
window.increment = increment;
declare global {
  interface Window {
    deleteItem: (i: number) => Promise<void>;
  }
}
window.deleteItem = deleteItem;
