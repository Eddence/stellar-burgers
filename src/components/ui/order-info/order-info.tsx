import React, { FC, memo } from 'react';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

import styles from './order-info.module.css';
import { OrderInfoUIProps } from './type';

export const OrderInfoUI: FC<OrderInfoUIProps> = memo(({ orderInfo }) => (
  <div className={styles.wrap}>
    <h3 className={`text text_type_digits-default mb-10 ${styles.number}`}>
      #{orderInfo.number}
    </h3>

    <h3 className={`text text_type_main-medium pb-3 ${styles.header}`}>
      {orderInfo.name}
    </h3>

    <p className={`text text_type_main-default mb-15 ${styles.status}`}>
      {orderInfo.status === 'done' ? 'Выполнен' : 'Готовится'}
    </p>

    <p className={`text text_type_main-medium mb-6`}>Состав:</p>

    <ul className={`${styles.list} mb-10`}>
      {Object.values(orderInfo.ingredientsInfo).map((item, index) => (
        <li className={`pb-4 pr-6 ${styles.item}`} key={index}>
          <div className={styles.img_wrap}>
            <div className={styles.border}>
              <img
                className={styles.img}
                src={item.image_mobile}
                alt={item.name}
              />
            </div>
          </div>
          <span className='text text_type_main-default pl-4'>{item.name}</span>
          <div className={styles.quantity}>
            <span className='text text_type_digits-default pr-1'>
              {item.count} x {item.price}
            </span>
            <CurrencyIcon type={'primary'} />
          </div>
        </li>
      ))}
    </ul>

    <div className={styles.bottom}>
      <p className='text text_type_main-default text_color_inactive'>
        <FormattedDate date={orderInfo.date} />
      </p>
      <div className={styles.total}>
        <span className='text text_type_digits-default pr-2'>
          {orderInfo.total}
        </span>
        <CurrencyIcon type={'primary'} />
      </div>
    </div>
  </div>
));
