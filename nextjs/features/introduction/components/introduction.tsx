"use client";

import { Introduction as IntroductionType } from "@/features/introduction/type/index";
import styles from "../styles/introduction.module.scss";
import parse from "html-react-parser";
import Link from "next/link";

export const Introduction = ({ introduction }: { introduction: IntroductionType }) => {
  return (
    <div className={styles.notificationDetailContainer}>
      <div className={styles.notificationDetailContentContainer}>
        <div className={styles.notificationDetailTitle}>{introduction.title}</div>
        <div className={styles.notificationDetailContentText}>{parse(introduction.content)}</div>
        <div className={styles.notificationDetailBackButton}>
          <Link href="/">トップへ戻る</Link>
        </div>
      </div>
    </div>
  );
};
