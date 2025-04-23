"use client";

import styles from "../styles/footer.module.scss";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();
  const googleFormLinks =
    "https://docs.google.com/forms/d/e/1FAIpQLSc2wPHJNSmD8tBIWMb6UDrJzlXNF3dYFx-okEQvITZvRXpOtQ/viewform";

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.serviceName}>VRCSS</div>
        <div className={styles.links}>
          <div className={styles.terms} onClick={() => router.push("/terms")}>
            利用規約
          </div>
          <div className={styles.privacy} onClick={() => router.push("/privacy")}>
            プライバシーポリシー
          </div>
          <div className={styles.faq} onClick={() => router.push("/faq")}>
            Q&A
          </div>
          <div className={styles.contact} onClick={() => router.push(googleFormLinks)}>
            お問い合わせ
          </div>
        </div>
        <div className={styles.copyright}>© vrcss.com All rights reserved.</div>
      </div>
    </footer>
  );
};
