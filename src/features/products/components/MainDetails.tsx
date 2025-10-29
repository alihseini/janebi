import styles from '../css/styles.module.css';
import { useCartCache } from '../../cart/services/useCartCache';
import ProductActions from '../../../shared/components/ActionButtons/ActionButtons';
import { shortenTitle } from '../../../shared/utils/utils';
import Icons from '../../../shared/icons';
import { useState } from 'react';
import type { Product } from '../../../shared/types/types';

interface Iprops {
  data: Product;
}

export default function MainDetails({ data }: Iprops) {
  const { state, addProduct, removeProduct, increaseProduct, decreaseProduct } =
    useCartCache();

  const [isLiked, setIsLiked] = useState(false);

  const cartProduct = state?.products?.find((p) => p.id === data?.id);
  const count = cartProduct?.count || 0;

  const handleLike = () => setIsLiked((prev) => !prev);

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.detailsImage}>
        <Icons
          name="heart-fill"
          onClick={handleLike}
          color={`${isLiked ? 'red' : 'gray'}`}
          cursor="pointer"
        />
        <img src={data.image} alt={data.title} width={200} />
      </div>

      <div className={styles.detailsRightSide}>
        <div className={styles.mainDetails}>
          <div className={styles.detailsText}>
            <div className={styles.intro}>
              <h2>{data.title}</h2>
              <p>{shortenTitle(data.title)}</p>
            </div>
            <div className={styles.detailsRatings}>
              <div className={styles.detailsRate}>
                <Icons name="bxs-star" color="#ced810" /> {data?.rating?.rate}
                <span>( خریداری شده: {data?.rating?.count} نفر )</span>
              </div>
              <p>
                دسته بندی : <span>{data?.category}</span>
              </p>
              <div style={{ color: '#9b9b9b' }}>کد کالا:{data.id}</div>
            </div>
            <div className={styles.description}>
              <span>Description:</span>
              <p>{data?.description}</p>
            </div>
            <div className={styles.snappPay}>
              <img src="/src/assets/images/snapp-pay.svg" alt="snapp-pay" />
              <div>
                <p>امکان خرید اقساط با اسنپ پی</p>
                <span>پرداخت در چهار قسط بدون کارمزد</span>
              </div>
            </div>
          </div>

          <div className={styles.buyOptions}>
            <div className={styles.colorDiv}>
              رنگ :
              <div className={styles.selectedColor}>
                <div className={styles.color}></div>
              </div>
            </div>
            <div className={styles.optGuaranty}>
              <div>
                <Icons name="bx-check-shield" />
                گارانتی اصالت و سلامت فیزیکی
              </div>
            </div>
            <p>تومان {data?.price}</p>
            <div className={styles.detailActions}>
              <ProductActions
                count={count}
                productId={data.id}
                addProduct={() =>
                  addProduct({
                    ...data,
                    count: 1,
                    name: data.title,
                  })
                }
                removeProduct={removeProduct}
                increaseProduct={increaseProduct}
                decreaseProduct={decreaseProduct}
                isLTR={true}
              />
            </div>
          </div>
        </div>

        <div className={styles.detailsBottom}>
          <div>
            <img
              src="https://janebi.shopfa.com/src/themes/theme_8/80011/img/guaranty.svg"
              alt=""
            />
            ضمانت اصل بودن کالا
          </div>
          <div>
            <img
              src="https://janebi.shopfa.com/src/themes/theme_8/80011/img/cart-return.svg"
              alt=""
            />
            ضمانت بازگشت
          </div>
          <div>
            <img
              src="https://janebi.shopfa.com/src/themes/theme_8/80011/img/delivery-fast.svg"
              alt=""
            />
            تحویل اکسپرس
          </div>
          <div>
            <img
              src="https://janebi.com/src/themes/theme_7/70103/img/hand-card.svg"
              alt=""
            />
            خرید و پرداخت امن
          </div>
        </div>
      </div>
    </div>
  );
}
