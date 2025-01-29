import Image from "next/image";
import { useState } from "react";

function Carousel({ items, setNum, num, s }) {
  const [full, setFull] = useState(false);

  const fullScreen = (e) => {
    const img = e.target;
    if (full) {
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.position = 'relative';
      img.style.backgroundColor = 'transparent';
      img.style.zIndex = '0';
      setFull(false);
    } else {
      img.style.width = '200%';
      img.style.height = '170%';
      img.style.position = 'absolute';
      img.style.backgroundColor = '#000000';
      img.style.zIndex = '999';
      setFull(true);
    }
  };

  return (
    <div>
      <div className={s.carousel}>
        {items?.images?.map((image, index) => (
          <div
            key={index}
            className={`${s.carousel_img} ${index === num ? 'active' : ''}`}
          >
            <Image
              src={"https://api-alwaki.onrender.com/" + image}
              width={200}
              height={170}
              alt={items?.name}
              onClick={(e) => {
                setNum(index);
                fullScreen(e);
              }}
              className={index === num ? "block" : "hidden"}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/fallback_image.jpg'; // صورة افتراضية عند فشل التحميل
              }}
            />
          </div>
        ))}
        <div className={s.carousel_btn}>
          <button
            onClick={() => {
              setNum((prevNum) => {
                const newIndex = prevNum === 0 ? items?.images?.length - 1 : prevNum - 1;
                return newIndex;
              });
            }}
          >
            <svg
              version="1.0"
              viewBox="0 0 512.000000 512.000000"
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M2470 5110 c-73 -16 -152 -60 -213 -121 -126 -126 -159 -306 -86 -480 20 -48 123 -155 968 -1001 l946 -948 -946 -948 c-845 -846 -948 -953 -968 -1001 -73 -174 -40 -354 86 -480 102 -101 234 -145 369 -123 144 24 75 -39 1301 1186 1001 1000 1125 1127 1148 1178 54 119 56 246 4 369 -20 48 -138 170 -1133 1167 -611 612 -1131 1126 -1156 1142 -25 16 -66 36 -90 45 -56 20 -171 27 -230 15z"
                />
              </g>
            </svg>
          </button>
          <button
            onClick={() => {
              setNum((prevNum) => {
                const newIndex = prevNum === items?.images?.length - 1 ? 0 : prevNum + 1;
                return newIndex;
              });
            }}
          >
            <svg
              version="1.0"
              viewBox="0 0 512.000000 512.000000"
            >
              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M350 4900 c-73 -16 -151 -60 -213 -121 -138 -138 -174 -352 -88 -534 33 -72 -2 -33 815 -893 l649 -684 -75 -76 c-78 -80 -1117 -1177 -1271 -1341 -102 -110 -142 -182 -159 -293 -41 -273 164 -528 427 -528 94 0 200 40 272 103 37 32 1651 1731 1732 1822 125 143 154 350 71 522 -35 73 -2 38 -979 1067 -512 539 -837 874 -868 894 -27 17 -68 38 -90 46 -55 19 -167 27 -223 16z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
