"use client";

import styles from "../styles/user-home.module.scss";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
import { SocialLink as SocialLinkType } from "@/features/users/types/index";
import { GrPersonalComputer } from "react-icons/gr";

type SocialLinkProps = {
  socialLinks: SocialLinkType[];
  isUserEditing: boolean;
  handleEditSocialLink: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
};

export const SocialLink = ({
  socialLinks,
  isUserEditing,
  handleEditSocialLink,
}: SocialLinkProps) => {
  const getIcon = (platformType: string) => {
    switch (platformType) {
      case "x":
        return <FaXTwitter size={36} />;
      case "discord":
        return <FaDiscord size={36} />;
      default:
        return <GrPersonalComputer size={36} />;
    }
  };

  return (
    <div className={styles.profileSocialLinksContainer}>
      <p className={styles.profileSocialLinksTitle}>SNSリンク</p>
      {isUserEditing
        ? socialLinks.map((socialLink: SocialLinkType, index: number) => (
            <div key={socialLink.platform_types} className={styles.profileIntroduceContent}>
              {getIcon(socialLink.platform_types)}
              <input
                type="text"
                defaultValue={socialLink.platform_url}
                className={styles.profileIntroduceLink}
                onChange={(e) => {
                  handleEditSocialLink(e, index);
                }}
              />
            </div>
          ))
        : socialLinks.map((socialLink: SocialLinkType) => (
            <div key={socialLink.platform_types} className={styles.profileIntroduceContent}>
              {getIcon(socialLink.platform_types)}
              <a href={socialLink.platform_url} className={styles.profileIntroduceLink}>
                {socialLink.platform_url}
              </a>
            </div>
          ))}
    </div>
  );
};