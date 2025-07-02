"use client";

import { Usage } from "@/features/usage/type/index";
import styles from "../styles/usage-detail.module.scss";
import parse from "html-react-parser";
import Link from "next/link";

export const UsageDetail = ({ usage }: { usage: Usage }) => {
  return (
    <div className={styles.usageDetailContainer}>
      <div className={styles.usageDetailContentContainer}>
        <div className={styles.usageDetailTitle}>{usage.title}</div>
        <div className="prose max-w-full">{parse(usage.content)}</div>
        <div className={styles.usageDetailBackButton}>
          <Link href="/">トップへ戻る</Link>
        </div>
      </div>
    </div>
  );
};
