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
  const faqList: Faq[] = JSON.parse(JSON.stringify(faqData.data));

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
    </div>
  );
};
