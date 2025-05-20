-- CreateTable
CREATE TABLE `block_users` (
    `id` VARCHAR(191) NOT NULL,
    `blocked_user_id` VARCHAR(191) NOT NULL,
    `blocker_user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `block_users_blocked_user_id_idx`(`blocked_user_id`),
    INDEX `block_users_blocker_user_id_idx`(`blocker_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `block_users` ADD CONSTRAINT `block_users_blocked_user_id_fkey` FOREIGN KEY (`blocked_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `block_users` ADD CONSTRAINT `block_users_blocker_user_id_fkey` FOREIGN KEY (`blocker_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;