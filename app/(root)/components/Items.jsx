'use client';

import { useRouter } from 'next/navigation'; 
import { formatCurrency } from '../util/fc'; 
import styles from '../styles/Items.module.scss';

const Items = ({ items }) => {
  const router = useRouter();

  const getProduct = (id) => {
    router.push(`/product/${id}`); // Navigate to the product page dynamically
  };

  return (
    <div className={styles.homeItems}>
      <h2>New Items</h2>
      <div className={styles.homeItemsContainer}>
        {items &&
          items.map((item) => (
            <div
              key={item._id}
              className={styles.cartItem}
              onClick={() => getProduct(item._id)}
            >
              <img
                src={`https://api-alwaki.onrender.com/${item.images[0]}`}
                alt={item.name}
              />
              <div>
                <p>{item.name}</p>
                <p>{formatCurrency(item.price)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Items;
