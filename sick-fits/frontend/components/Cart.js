import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';

const CartItemStyles = styled.li`
    padding: 10px;
    border-bottom: 1px solid var(--lightgrey);
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    img {
        margin-right: 10px;
    }
    font-size: 2rem;
`;

function CartItem({ cartItem }) {
    const { product } = cartItem;
    if (!product) return null;

    return (
        <CartItemStyles>
            <img src={product.image.publicUrlTransformed} alt={product.name} />
        </CartItemStyles>
    );
}

export default function Cart() {
    const me = useUser();
    if (!me) return null;
    console.log(me);

    return (
        <CartStyles open>
            <header>
                <Supreme>{me.name}'s Cart</Supreme>
            </header>
            <ul>
                {me.cart.map((cartItem) => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
            </ul>
        </CartStyles>
    );
}
