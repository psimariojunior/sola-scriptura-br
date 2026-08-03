export const metadata = {
  title: "Privacy Policy — Sola Scriptura BR",
  description: "Privacy policy for the Sola Scriptura BR application",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-lg dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">
        Last updated: July 31, 2026
      </p>

      <h2>1. Introduction</h2>
      <p>
        Sola Scriptura BR values the privacy of its users. This
        Privacy Policy describes how we collect, use, and protect
        information when you use our mobile application and website.
      </p>

      <h2>2. Data Collected</h2>
      <p>
        Our application is designed to function with minimal data. Most of your data remains <strong>stored
        locally on your device</strong> and is never sent to our servers.
      </p>

      <h3>2.1 Data Stored Locally (on your device)</h3>
      <ul>
        <li><strong>Favorites</strong> — Verses you marked as favorites</li>
        <li><strong>Personal notes</strong> — Annotations linked to verses</li>
        <li><strong>Collections</strong> — Custom verse lists</li>
        <li><strong>Reading progress</strong> — Chapters and verses read</li>
        <li><strong>Reading plans</strong> — Your personal plans</li>
        <li><strong>Settings</strong> — Theme, language, preferences</li>
        <li><strong>Flashcards</strong> — Memorization cards</li>
        <li><strong>Gamification data</strong> — Achievements and streaks</li>
      </ul>
      <p>
        This data is stored exclusively on the device using
        SharedPreferences and IndexedDB. It is <strong>not sent</strong>
        to our servers or to third parties.
      </p>

      <h3>2.2 Data Sent to Our Servers</h3>
      <ul>
        <li>
          <strong>FCM Token (Firebase Cloud Messaging)</strong> — Used
          exclusively to send push notifications that you opted in to
          receive. The token is necessary for the notification system.
        </li>
        <li>
          <strong>AI Assistant Questions</strong> — When you use the
          AI chat, your questions are processed via the Groq API to generate
          Bible study responses. These questions are not permanently stored.
        </li>
      </ul>

      <h3>2.3 Analytics</h3>
      <p>
        We use <strong>Firebase Analytics</strong> to collect
        anonymous usage data, such as screens visited, session duration,
        and errors that occurred. This data helps us improve the user
        experience. No personally identifiable information is collected via analytics.
      </p>

      <h2>3. How We Use Data</h2>
      <ul>
        <li>To provide and maintain the application</li>
        <li>To send push notifications you requested</li>
        <li>To improve the Bible study experience</li>
        <li>To detect and fix errors (Crashlytics)</li>
        <li>To understand how the application is used (anonymous analytics)</li>
      </ul>

      <h2>4. Data Sharing</h2>
      <p>
        <strong>We do not sell, rent, or share your personal data
        with third parties.</strong>
      </p>
      <p>
        The only external services used are:
      </p>
      <ul>
        <li><strong>Firebase (Google)</strong> — For push notifications, anonymous
          analytics, and error monitoring</li>
        <li><strong>Groq</strong> — For processing questions to the AI
          assistant</li>
      </ul>
      <p>
        Both operate under their own privacy policies.
      </p>

      <h2>5. Advertising</h2>
      <p>
        <strong>Sola Scriptura BR does not contain ads.</strong> We do not display
        any type of advertising in the application.
      </p>

      <h2>6. Security</h2>
      <p>
        We implement technical and organizational security measures to
        protect your data, including encryption in transit (HTTPS/TLS)
        and secure storage of access keys.
      </p>

      <h2>7. Children&apos;s Privacy</h2>
      <p>
        Our application is not directed at children under 13. We do not
        knowingly collect data from children.
      </p>

      <h2>8. Your Rights</h2>
      <p>
        Since all main data is stored locally on your device, you have
        full control over it. You can:
      </p>
      <ul>
        <li>Delete favorites, notes, and collections at any time through
          the application</li>
        <li>Uninstall the application to remove all local data</li>
        <li>Disable push notifications in your device settings</li>
      </ul>

      <h2>9. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Notes
        about significant changes will be made available in the application.
      </p>

      <h2>10. Contact</h2>
      <p>
        If you have questions about this Privacy Policy, please
        contact us:
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:contato@solascripturabr.com.br">
          contato@solascripturabr.com.br
        </a>
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a href="https://solascripturabr.com.br">
          solascripturabr.com.br
        </a>
      </p>
    </main>
  );
}
