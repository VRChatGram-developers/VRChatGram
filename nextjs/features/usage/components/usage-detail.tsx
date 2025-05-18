"use client";

import { Usage } from "@/features/usage/type/index";
import styles from "../styles/usage-detail.module.scss";
import parse from "html-react-parser";
import Link from "next/link";

export const UsageDetail = ({ usage }: { usage: Usage }) => {
  console.log(usage);

  return (
    <div className={styles.notificationDetailContainer}>
      <div className={styles.notificationDetailContentContainer}>
        <div className={styles.notificationDetailTitle}>{usage.title}</div>
        <div className={styles.notificationDetailContentText}>{parse(usage.content)}</div>
        <div className={styles.notificationDetailBackButton}>
          <Link href="/">トップへ戻る</Link>
        </div>
      </div>
    </div>
  );
};
