document.addEventListener('DOMContentLoaded', function() {
    const cart = document.getElementById('shopping-cart');
    const totalAmount = document.getElementById('total-amount');

    // Update total price
    function updateTotal() {
        let total = 0;
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.dataset.price);
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });
        totalAmount.textContent = total.toFixed(2);
    }

    // Event delegation for all cart interactions
    cart.addEventListener('click', function(e) {
        const target = e.target;
        
        // Handle quantity adjustments
        if (target.classList.contains('quantity-btn')) {
            const item = target.closest('.cart-item');
            const quantitySpan = item.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent);

            if (target.classList.contains('plus')) {
                quantity++;
            } else if (target.classList.contains('minus') && quantity > 1) {
                quantity--;
            }

            quantitySpan.textContent = quantity;
            updateTotal();
        }
        
        // Handle item deletion
        if (target.classList.contains('delete-btn')) {
            const item = target.closest('.cart-item');
            item.remove();
            updateTotal();
        }
        
        // Handle like/unlike
        if (target.classList.contains('like-btn')) {
            target.classList.toggle('liked');
            target.textContent = target.classList.contains('liked') ? '♥' : '♡';
        }
    });
});