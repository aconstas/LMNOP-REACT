import styles from "../../shared/styles/modal.module.css";
import close from "../../assets/close.png";

export default function PrivacyPolicy({ togglePrivacyPolicy }) {
  return (
    <div id={styles.privacyPolicyContainer}>
      <img
        id={styles.closeIcon}
        src={close}
        onClick={togglePrivacyPolicy}
        alt="close button"
      />
      <h1 className={styles.modalTitle}>Privacy Policy for LMNOP</h1>
      <p className={styles.modalText}>Effective Date: 2/2/2024</p>
      <p className={styles.modalText}>
        Welcome to the LMNOP game. Your privacy is critically important to us.
        This Privacy Policy document outlines the types of information that is
        collected and recorded by the LMNOP game and how we use it.
      </p>

      <h2 className={styles.modalSubHeading}>1. Acknowledgement and Acceptance of Terms</h2>
      <p className={styles.modalText}>
        By accessing and using the LMNOP game, you acknowledge that you have
        read, understood, and agree to the terms of this Privacy Policy. If you
        do not agree with the terms of this policy, please do not access the
        app.
      </p>

      <h2 className={styles.modalSubHeading}>2. Information We Collect</h2>
      <p className={styles.modalText}>
        We collect information to provide better services to all our users. The
        information we collect includes:
      </p>
      <ul>
        <li className={styles.modalText}>
          <strong>Site Usage Information</strong>: <br/> We use Google Analytics to
          collect information about how you use the LMNOP game. This includes
          site view counts, pages visited, and events such as clicking the share
          button. Google Analytics collects information such as your
          device type, browser type, and actions taken within the app.
        </li>
      </ul>

      <h2 className={styles.modalSubHeading}>3. How We Use Your Information</h2>
      <p className={styles.modalText}>The information we collect is used in various ways, including to:</p>
      <ul>
        <li className={styles.modalText}>Understand and analyze how you use our app</li>
        <li className={styles.modalText}>Improve, personalize, and expand our app</li>
        <li className={styles.modalText}>Develop new products, services, features, and functionality</li>
        <li className={styles.modalText}>
          Monitor and analyze trends, usage, and activities in connection with
          our app
        </li>
      </ul>

      <h2 className={styles.modalSubHeading}>4. Sharing Your Information</h2>
      <p className={styles.modalText}>
        We do not share your personal information with third parties except as
        described in this Privacy Policy. We may share your information with our
        affiliates, in which case we will require those affiliates to honor this
        Privacy Policy.
      </p>

      <h2 className={styles.modalSubHeading}>5. Security of Your Information</h2>
      <p className={styles.modalText}>
        We take the security of your personal information seriously and use
        reasonable electronic, personnel, and physical measures to protect it
        from loss, theft, alteration, or misuse. However, please be advised that
        even the best security measures cannot fully eliminate all risks.
      </p>

      <h2 className={styles.modalSubHeading}>6. Changes to This Privacy Policy</h2>
      <p className={styles.modalText}>
        We reserve the right to make changes to this Privacy Policy at any time.
        If we decide to change our privacy policy, we will post those changes on
        this page, and/or update the Privacy Policy modification date above.
      </p>

      <h2 className={styles.modalSubHeading}>7. Contact Us</h2>
      <p className={styles.modalText}>
        If you have any questions or suggestions about our Privacy Policy, do
        not hesitate to contact us at lmnopgame@gmail.com.
      </p>

      <h2 className={styles.modalSubHeading}>Children's Privacy</h2>
      <p className={styles.modalText}>
        Our Service does not address anyone under the age of 13. We do not
        knowingly collect personally identifiable information from children
        under 13. In the case we discover that a child under 13 has provided us
        with personal information, we immediately delete this from our servers.
        If you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact us so that we will
        be able to do necessary actions.
      </p>

      <p className={styles.modalText}>
        This Privacy Policy does not apply to external websites that you may
        access through the LMNOP App. We encourage you to review the privacy
        policies of any third-party sites or services before providing any of
        them with your personal information.
      </p>
    </div>
  );
}
