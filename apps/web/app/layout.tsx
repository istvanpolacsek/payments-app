import type { ReactNode } from 'react';

import styles from './layout.module.scss';

export const metadata = {
  title: 'Payments app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <section className={styles.section}>{children}</section>
      </body>
    </html>
  );
}
