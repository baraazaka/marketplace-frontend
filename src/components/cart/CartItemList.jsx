
import CartItem from "./CartItem";


function CartItemList({
    cartItems,
    onIncrease,
    onDecrease,
    onRemove
}) {

    return (
        <div className="space-y-4">

            {cartItems.map((item) => (

                <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                    onRemove={onRemove}
                />

            ))}

        </div>
    );
}

export default CartItemList;

