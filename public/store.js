if(document.readyState =='loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready()
}

function ready(){
    updateCartTotal()
    var removeButtons = document.getElementsByClassName("btn-danger")
    var addToCartButtons = document.getElementsByClassName("shop-item-btn")
    for(var i =0; i< removeButtons.length; i++){
        var button = removeButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    
    for(var i=0;i<addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClick)
    }

    function removeCartItem(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal()

    }

    function addToCartClick(event)
    {
        var button = event.target
        var shopItem = button.parentElement.parentElement
        var addedTitle = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
        addItemToCart(addedTitle, price, imageSrc)
        updateCartTotal()
    }
    
    function addItemToCart(title, price, imageSrc)
    {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for(var i =0; i < cartItemNames.length; i++){
            if(cartItemNames[i].innerText == title){
                alert('This item is already added to the cart')
                return
            }
        }
        var cartRowContents = `
        <div class = "cart-item cart-column">
            <img class= "cart-item-image"src="${imageSrc}" width = "100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class= "cart-quantity cart-column">
            <input class = "cart-quantity-input" type = "number" value = "1" min = "1">
            <button class = "btn btn-danger cart-quantity-button" type = "button">REMOVE</button>
        </div>`

        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow)
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
        
    }
    function updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var Total = document.getElementsByClassName('cart-total-price')[0]
        var priceValue, quantityValue, price=0;
        for(var i =0; i< cartRows.length; i++){
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            priceValue = parseFloat(priceElement.innerText.replace('$',''))
            quantityValue = parseFloat(quantityElement.value)
            price += (priceValue*quantityValue)
        }
        price = Math.round(price*100) / 100
        Total.innerText = '$'+price
    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for(var i =0 ; i< quantityInput.length; i++){
        var ip = quantityInput[i];
        ip.addEventListener('change', quantityChanged)
    }

    function quantityChanged(event)
    {
        var quantityChanged = event.target
        if(quantityChanged.value==='')
            quantityChanged.value = 1;
        updateCartTotal()
    }
}
