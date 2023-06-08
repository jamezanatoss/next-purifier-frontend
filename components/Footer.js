export default function Footer() {
    return (
      <div>      
        <style jsx>{`
          .footer {
            padding: 1rem;
            background-color: #00BFFF;
            color: #fff;
            text-align: center;
            margin-top: 30px;
            flex: 0 0 auto;
          }
  
          .footer p {
            margin-bottom: 0;
          }
        `}</style>
  
        <footer className="footer">
            <p>© 2023 Purifier. All rights reserved.</p>
          </footer>
      </div>
    );
  }