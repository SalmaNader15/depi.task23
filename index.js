let div = document.querySelector(".parent");
async function bringData(url) {
    let a = await fetch(url);
    let b = await a.json();
    return b.data;
}
bringData("https://e-commerce-backend-h4zm.vercel.app/api/products");
async function showData(url) {
    let a = await bringData(url);
    div.innerHTML = "";
    a.forEach(element => {
        div.innerHTML += `
<div class="col "><div class="card  p-3 card1 shadow-lg" >
                    <div class="crd "><img src="${element.imageUrl}" class="card-img-top img" alt="..."></div>
                    <div class="card-body my-2">
                    <h3 class="card-title">${element.name}</h3>
                    <h5 class="card-text">${element.price} EGP</h5>
                    <div class=" d-flex justify-content-between mt-3">
                        <i class="bi bi-heart-fill  text-danger" style="cursor: pointer; font-size: 20px;" ></i>
                        <i class="ct bi bi-cart3 mt-3" style="cursor: pointer; font-size: 20px;" onclick="go('${element._id}')"></i>
                        </div>
                    </div>
                    </div> </div>
        `;
    });
}
showData("https://e-commerce-backend-h4zm.vercel.app/api/products");
async function go(id) {
    let a = await fetch(`https://e-commerce-backend-h4zm.vercel.app/api/products/${id}`);
    let b = await a.json();
    let x = await fetch("https://e-commerce-backend-h4zm.vercel.app/api/products", { method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(b)
    });
    setTimeout(() => {
        window.location.href = "cart.html";
    }, 1000);
}
window.go = go;
export {};
//# sourceMappingURL=index.js.map