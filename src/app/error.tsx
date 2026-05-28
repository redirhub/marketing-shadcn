"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleHome = () => {
    window.location.href = "/";
  };

  return (
    <html>
      <head>
        <title>500 - Server Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: #fff;
            padding: 80px 40px;
            color: #000;
            line-height: 1.5;
            display: flex;
            justify-content: center;
            min-height: 100vh;
            align-items: center;
          }

          .container {
            max-width: 600px;
            width: 100%;
          }

          .error-code {
            font-size: 72px;
            font-weight: 600;
            line-height: 1;
            margin-bottom: 16px;
            color: #000;
          }

          h2 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 12px;
            color: #000;
          }

          .description {
            font-size: 16px;
            color: #666;
            margin-bottom: 32px;
          }

          .buttons {
            display: flex;
            gap: 12px;
            margin-bottom: 48px;
          }

          button {
            padding: 10px 20px;
            font-size: 15px;
            font-weight: 500;
            border-radius: 6px;
            border: 1px solid #000;
            cursor: pointer;
            background: #000;
            color: #fff;
            transition: opacity 0.2s;
          }

          button:hover {
            opacity: 0.8;
          }

          .btn-secondary {
            background: #fff;
            color: #000;
          }

          .help-text {
            font-size: 14px;
            color: #999;
            margin-bottom: 12px;
          }

          .links {
            display: flex;
            gap: 20px;
          }

          .links a {
            color: #000;
            text-decoration: none;
            font-size: 15px;
            border-bottom: 1px solid #000;
          }

          .links a:hover {
            opacity: 0.6;
          }

          @media (max-width: 768px) {
            body {
              padding: 40px 24px;
            }

            .error-code {
              font-size: 56px;
            }

            .buttons {
              flex-direction: column;
            }

            button {
              width: 100%;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1 className="error-code">500</h1>
          <h2>Server Error</h2>
          <p className="description">
            Something went wrong on our end. We&apos;re working to fix it.
          </p>

          <div className="buttons">
            <button onClick={handleRefresh}>
              Refresh Page
            </button>
            <button className="btn-secondary" onClick={handleHome}>
              Back to Home
            </button>
          </div>

          <p className="help-text">Need help?</p>
          <div className="links">
            <a href="/support">Get Support</a>
            <a href="/blog">Blog</a>
          </div>
        </div>
      </body>
    </html>
  );
}
