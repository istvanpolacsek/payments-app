import type { FC, PropsWithChildren } from 'react';
import styles from './Dialog.module.scss';

const DialogBase: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.backdrop}>
    <div className={styles.backdropBg} />
    {children}
  </div>
);

export default DialogBase;
