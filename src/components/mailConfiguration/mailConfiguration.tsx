import React from "react";
import styles from "./mailConfiguration.module.css";

interface MailConfigurationProps {
  name: string;
  link: string;
}

const MailConfiguration: React.FC<MailConfigurationProps> = ({
  name,
  link,
}) => {
  return (
    <div className={styles.container}>
      <h1>Welcome, {name}!</h1>
      <p>
        Thank you for registering with us. Please confirm your registration by
        clicking the button below:
      </p>
      <a href={link} className={styles.btn}>
        Confirm Registration
      </a>
      <p>If you did not request this registration, please ignore this email.</p>
      <div className={styles.footer}>
        © 2024 Conversation Club. All rights reserved.
      </div>
    </div>
  );
};

export default MailConfiguration;
