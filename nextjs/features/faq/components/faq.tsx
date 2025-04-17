"use client";

import styles from "@/features/faq/styles/faq.module.scss";
import { faqData } from "@/features/faq/data.json";
import { useState } from "react";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";
type Faq = {
  question: string;
  answer: string;
};

export const Faq = () => {
  const totalPages = Math.ceil(faqData.length / 10);
  const [currentPage, setCurrentPage] = useState(0);
  const faqList = JSON.parse(JSON.stringify(faqData));

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqTitle}>よくあるご質問</div>
      {faqList.map((faq: Faq, index: number) => (
        <details className={styles.qa} key={index}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}

      <div className={styles.pagination}>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage(0)}
          disabled={currentPage === 0}
        >
          <MdOutlineFirstPage className={styles.paginationButtonIcon} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={
              currentPage === i ? styles.paginationSelectedButton : styles.paginationButton
            }
          >
            {i + 1}
          </button>
        ))}

        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        >
          <MdOutlineLastPage className={styles.paginationButtonIcon} />
        </button>
      </div>
    </div>
  );
};
