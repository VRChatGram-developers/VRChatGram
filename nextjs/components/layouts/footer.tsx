"use client";

import styles from "./styles/footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.serviceName}>VGRAM</div>
        <div className={styles.links}>
          <a href="/terms">利用規約</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/faq">Q&A</a>
        </div>
        <div className={styles.contact}>サービスに関するお問い合わせはsample@gmail.comまで</div>
        <div className={styles.copyright}>© vgram.app All rights reserved.</div>
      </div>
    </footer>
  );
};
