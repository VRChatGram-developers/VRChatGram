"use cdivent";

import Link from "next/link";
import styles from "../style/privacy-policy.module.scss";
export const PrivacyPodivcy = () => {
  return (
    <div className={styles.privacyPolicyContainer}>
      <div className={styles.privacyPolicyTitle}>プライバシーポリシー</div>
      <div className={styles.privacyPolicyContentContainer}>
        <div>
          <div>
            株式会社かなう（以下、「当社」といいます。）は、当社が提供する写真共有サービス「VRCSS」（以下、「本サービス」といいます。）において、ユーザーの個人情報の適切な取扱いを確保するため、本プライバシーポリシーを定め、これを遵守いたします。
          </div>

          <div className={styles.privacyPolicySection}>
            <div>1. 取得する情報</div>
            <div>本サービスでは、以下の情報を取得いたします。</div>
            <div>
              <div>・メールアドレス</div>
              <div>・IPアドレス</div>
              <div>・投稿データ（写真、コメント、その他のアップロードデータ）</div>
              <div>・クッキー及び類似技術によるトラッキング情報</div>
            </div>
          </div>

          <div className={styles.privacyPolicySection}>
            <div>2. 利用目的</div>
            <div>取得した情報は、以下の目的で利用いたします。</div>
            <div>
              <div>・本サービスの提供、運営、改善</div>
              <div>・ユーザーサポート対応（問い合わせ対応など）</div>
              <div>・利用規約違反の監視及び対応</div>
              <div>・不正アクセスの防止及びセキュリティ対策</div>
              <div>・サービスの利用状況の分析及びマーケティング</div>
              <div>・法令に基づく対応</div>
            </div>
          </div>

          <div className={styles.privacyPolicySection}>
            <div>3. クッキー・トラッキング技術の利用</div>
            <div>
              当社は、本サービスの利便性向上、アクセス解析、広告配信のために、クッキー及び類似のトラッキング技術を使用します。これにより、ユーザーの閲覧履歴等の情報を収集することがあります。ユーザーは、ブラウザの設定を変更することで、クッキーの利用を制限または無効化することが可能です。
            </div>
          </div>

          <div className={styles.privacyPolicySection}>
            <div>4. 情報の第三者提供</div>
            <div>当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。</div>
            <div>
              <div>・ユーザー本人の同意がある場合</div>
              <div>・法令に基づく要請がある場合</div>
              <div>・犯罪捜査、裁判手続、その他公的機関からの正式な要請があった場合</div>
              <div>
                ・本サービスの提供に必要な業務委託先（クラウドサービス、広告配信事業者等）に対し、業務遂行上必要な範囲で情報を提供する場合
              </div>
            </div>
          </div>

          <div className={styles.privacyPolicySection}>
            <div>5. データの保存</div>
            <div>
              当社は、ユーザーの情報をAWSクラウドサービスを利用して保存・管理します。データの保存期間は、利用目的の達成に必要な期間とし、その後適切に削除または匿名化します。
            </div>
          </div>

          <div className={styles.privacyPolicySection}>
            <div>6. 安全管理措置</div>
            <div>
              当社は、個人情報の漏洩・滅失・毀損を防止するため、適切な安全管理措置を講じます。
            </div>
          </div>

          <div className={styles.privacyPolicySection}>
            <div>7. ユーザーの権利</div>
            <div>
              ユーザーは、当社に対し、自己の個人情報の開示、訂正、削除を求めることができます。これらの請求を行う場合は、以下の問い合わせ窓口よりご連絡ください。
            </div>
          </div>

          <div className={styles.privacyPolicySection}>
            <div>8. お問い合わせ窓口</div>
            <div>個人情報に関するお問い合わせは、以下のフォームよりお願いいたします。</div>
            <div>
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLSc2wPHJNSmD8tBIWMb6UDrJzlXNF3dYFx-okEQvITZvRXpOtQ/viewform">
                問い合わせフォーム
              </Link>
            </div>
          </div>

          <div className={styles.privacyPolicySection}>
            <div>9. プライバシーポリシーの変更</div>
            <div>
              当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、本サービス上で通知または公表した時点より効力を生じるものとします。
            </div>
          </div>

          <div className={styles.privacyPolicySection}>制定日：2025年3月9日</div>

          <div>株式会社かなう</div>
        </div>
      </div>
    </div>
  );
};
