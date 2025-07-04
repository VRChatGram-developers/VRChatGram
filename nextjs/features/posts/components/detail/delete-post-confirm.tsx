"use client";

import { deletePost } from "../../endpoint";
import styles from "@/features/posts/styles/delete-post-confirm.module.scss";
import { GrCircleAlert } from "react-icons/gr";
import { toast, Slide } from "react-toastify";
import { useRouter } from "next/navigation";

export const DeletePostConfirm = ({ postId, onClose }: { postId: string; onClose: () => void }) => {
  const router = useRouter();
  const handleDeletePost = async () => {
    try {
      await deletePost(postId);
      toast.success("投稿を削除しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error(error);
      toast.error("投稿の削除に失敗しました", {
        isLoading: false,
        autoClose: 2000,
        transition: Slide,
        hideProgressBar: true,
      });
    }
    onClose();
    router.push("/");
  };
  return (
    <div className={styles.postDeleteContainer}>
      <GrCircleAlert className={styles.postDeleteAlertIcon} />
      <div className={styles.postDeleteTitleContainer}>
        <div>投稿を削除しますか？</div>
      </div>
      <div className={styles.postDeleteContentContainer}>
        <div className={styles.postDeleteAlertDescriptionContainer}>
          <div>
            この操作は取り消せません。<br></br>削除するとこの投稿は完全に失われます。<br></br>よろしいですか？
          </div>
        </div>
      </div>
      <div className={styles.postDeleteAndCancelButtonContainer}>
        <div className={styles.postDeleteCancelButtonContainer}>
          <button onClick={onClose} className={styles.postDeleteCancelButton}>
            キャンセル
          </button>
        </div>
        <div className={styles.postDeleteButtonContainer}>
          <button onClick={handleDeletePost} className={styles.postDeleteButton}>
            削除
          </button>
        </div>
      </div>
    </div>
  );
};
