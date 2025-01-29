'use client';

import { useRouter } from "next/navigation";
import Image from 'next/image';
import arabic from '../images/arabic.png';
import germany from '../images/germany.png';
import uk from '../images/United_Kingdom.png';
import { useEffect } from 'react';
import s from './page.module.scss'; 

const Page = () => {
  const router = useRouter();

  const handleLanguageChange = (language) => {
    localStorage.setItem('language', language);
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("language")) {
      router.push("/");
    }
  }, [router]); // Ensure the navigation occurs after the component mounts

  return (
    <div className={s.languageContainer}>
      <div className={s.languageOption} onClick={() => handleLanguageChange('ar')}>
        <Image src={arabic} alt="Arabic Language" />
      </div>
      <div className={s.languageOption} onClick={() => handleLanguageChange('de')}>
        <Image src={germany} alt="German Language" />
      </div>
      <div className={s.languageOption} onClick={() => handleLanguageChange('en')}>
        <Image src={uk} alt="English Language" />
      </div>
    </div>
  );
};

export default Page;
