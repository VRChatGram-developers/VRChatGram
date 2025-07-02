"use client";

import { Introduction as IntroductionType } from "@/features/introduction/type/index";
import styles from "../styles/introduction.module.scss";
import parse from "html-react-parser";
import Link from "next/link";

export const Introduction = ({ introduction }: { introduction: IntroductionType }) => {
  return (
    <div className={styles.introductionDetailContainer}>
      <div className={styles.introductionDetailContentContainer}>
        <div className={styles.introductionDetailTitle}>{introduction.title}</div>
        <div className="prose max-w-full" >{parse(introduction.content)}</div>
        <div className={styles.introductionDetailBackButton}>
          <Link href="/">トップへ戻る</Link>
        </div>
      </div>
    </div>
  );
};
