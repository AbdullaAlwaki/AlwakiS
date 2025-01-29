'use client';

import { useRouter } from 'next/navigation'; 
import s from '../styles/Categories.module.scss'; 

const Categories = ({ lang }) => {
  const router = useRouter();

  const onClick = (id) => {
    let category = '';
    switch (id) {
      case 0:
        category = 'man';
        break;
      case 1:
        category = 'woman';
        break;
      case 2:
        category = 'girl';
        break;
      case 3:
        category = 'boy';
        break;
      case 4:
        category = 'baby';
        break;
      default:
        category = '';
    }

    router.push(`/sort/${category}`); // Navigate to category page
  };

  const categoriesList = [
    { name: lang?.man },
    { name: lang?.woman },
    { name: lang?.girl },
    { name: lang?.boy },
    { name: lang?.baby },
  ];

  return (
    <div className={s.homeCategories}>
      <h2>Categories</h2>
      <ul>
        {categoriesList.map((item, i) => (
          <li key={i} onClick={() => onClick(i)}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
