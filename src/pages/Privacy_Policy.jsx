import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="PrivacyPolicy" style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: January 2026</p>

      <p>
        TenantsChat ("we", "our", or "us") operates the website
        https://tenantschat.com (the "Service").
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you log in using Facebook or other authentication providers,
        we may collect the following information:
      </p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Profile picture</li>
        <li>Authentication provider ID</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We use the collected information to:
      </p>
      <ul>
        <li>Authenticate users</li>
        <li>Provide and maintain our services</li>
        <li>Improve user experience</li>
        <li>Ensure platform security</li>
      </ul>

      <h2>Facebook Login</h2>
      <p>
        TenantsChat uses Facebook Login to authenticate users.
        We only access basic profile information as permitted by Facebook.
        We do not post anything to Facebook without your consent.
      </p>

      <h2>Data Storage & Security</h2>
      <p>
        User data is securely stored using Firebase services.
        We take reasonable measures to protect your information
        from unauthorized access.
      </p>

      <h2>User Data Deletion</h2>
      <p>
        You may request deletion of your personal data by emailing us at:
        <strong> support@tenantschat.com</strong>
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We use third-party services such as Firebase and Facebook
        for authentication and data storage.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time.
        Any changes will be posted on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy,
        please contact us at support@tenantschat.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
