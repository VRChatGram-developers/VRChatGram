"use client";

import styles from "@/features/faq/styles/faq.module.scss";
import faqData from "@/features/faq/data.json";
import { useState } from "react";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";
type Faq = {
  section: string;
  section_id: string;
  qaList: {
    question: string;
    answer: string;
  }[];
};

export const Faq = () => {
  const totalPages = Math.ceil(faqData.data.length / 10);
  const [currentPage, setCurrentPage] = useState(0);
  const faqList: Faq[] = JSON.parse(JSON.stringify(faqData.data));
  console.log(faqList);

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqTitle}>よくあるご質問</div>
      <div className={styles.faqContentContainer}>
        {faqList.map((faq, index: number) => (
          <>
            <div className={styles.faqSection} key={index}>
              {faq.section}
            </div>
            {faq.qaList.map((qa, index: number) => (
              <details className={styles.qa} key={index}>
                <summary>{qa.question}</summary>
                <p>{qa.answer}</p>
              </details>
            ))}
          </>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          className={`${styles.paginationButton} ${styles.paginationMoveFirstButton}`}
          onClick={() => setCurrentPage(0)}
          disabled={currentPage === 0}
        >
          <MdOutlineFirstPage className={styles.paginationButtonIcon} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`
              ${
                currentPage === i + 1
                  ? styles.paginationSelectedButton
                  : styles.paginationNotSelectButton
              }

                ${styles.paginationMoveButton}
                `}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`${styles.paginationButton} ${styles.paginationMoveLastButton}`}
          onClick={() => setCurrentPage(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        >
          <MdOutlineLastPage className={styles.paginationButtonIcon} />
        </button>
      </div>
    </div>
  );
};
