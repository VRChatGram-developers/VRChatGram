"use client";

import styles from "@/features/faq/styles/faq.module.scss";
export const Faq = () => {
  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqTitle}>よくあるご質問</div>
      <details className={styles.qa}>
        <summary>これはどのようなテンプレートですか？</summary>
        <p>
          アコーディオンとして開閉できるQ&Aです。コンパクトに見せることができるので、質問の数が多い場合などにおすすめです。
        </p>
      </details>
      <details className={styles.qa}>
        <summary>これはどのようなテンプレートですか？</summary>
        <p>
          アコーディオンとして開閉できるQ&Aです。コンパクトに見せることができるので、質問の数が多い場合などにおすすめです。
        </p>
      </details>
    </div>
  );
};
