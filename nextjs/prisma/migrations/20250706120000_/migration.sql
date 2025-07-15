-- 1. 写真の種類を管理するテーブルを作成します
-- CreateTable
CREATE TABLE `photo_types` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `photo_types_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- 2. 投稿と写真の種類を紐付けるための中間テーブルを作成します
-- CreateTable
CREATE TABLE `post_photo_types` (
    `id` VARCHAR(191) NOT NULL,
    `post_id` VARCHAR(191) NOT NULL,
    `photo_type_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    -- 同じ投稿に同じ種類が重複して登録されないように複合ユニークキーを設定
    UNIQUE INDEX `post_photo_types_post_id_photo_type_id_key`(`post_id`, `photo_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- 3. 中間テーブルに外部キー制約を追加します
-- AddForeignKey
ALTER TABLE `post_photo_types` ADD CONSTRAINT `post_photo_types_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `post_photo_types` ADD CONSTRAINT `post_photo_types_photo_type_id_fkey` FOREIGN KEY (`photo_type_id`) REFERENCES `photo_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;


-- 4. 写真の種類の初期データを挿入します
INSERT INTO `photo_types` (`id`, `name`, `updated_at`) VALUES
(UUID(), 'アバター写真', NOW(3)),
(UUID(), 'ワールド写真', NOW(3));