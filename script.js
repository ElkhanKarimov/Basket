document.addEventListener("DOMContentLoaded",function(params) {
    const addToCartButton=document.querySelectorAll(".add-to-cart")

    addToCartButton.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const card=e.target.closest(".card")
            const product={
                id:card.dataset.id,
                image:card.querySelector("img").src,
                title:card.querySelector("h3").innerText,
                price: parseFloat(card.querySelector("p").innerText.replace('$','')),
                quantity:1
            }
            addToCart(product)
            DisplayCart()
        })
    })
    function addToCart(addproduct) {
        let cart=JSON.parse(localStorage.getItem("sebet")) || []
        const existingProductIndex=cart.findIndex((product)=>product.id===addproduct.id)

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity+=1
        }
        else{
            cart.push(addproduct)
        }
        localStorage.setItem("sebet",JSON.stringify(cart))
        UpdateCartCount()
    }

    function DisplayCart() {
        let cart=JSON.parse(localStorage.getItem("sebet")) || []

        const cartItems=document.getElementById("cart-items")
        cartItems.innerHTML=''

        cart.forEach((product) => {
            const productElement=document.createElement("div")
            productElement.innerHTML=`<img class="cartImage" src=${product.image} alt="">${product.title} - ${product.quantity} eded -Price: ${(product.quantity*product.price)}`
            cartItems.appendChild(productElement)
        });

        const totalPrice=cart.reduce((toplam,item)=>toplam+(item.price*item.quantity),0)
        document.getElementById("total-price").textContent=totalPrice.toFixed(2)
    }

    function UpdateCartCount() {
        const cart=JSON.parse(localStorage.getItem("sebet")) || []
        const totalCount=cart.reduce((toplam,item)=>toplam+item.quantity,0)
        document.getElementById("cart-count").innerText=totalCount
    }
    UpdateCartCount()
    DisplayCart()
})

    
