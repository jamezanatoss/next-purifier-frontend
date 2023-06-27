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

  import React from "react";

// export default function Footer() {
//   return (
//     <div>
//       <style jsx>{`
//         .footer {
//           padding: 1rem;
//           background-color: #00bfff;
//           color: #fff;
//           text-align: center;
//           position: fixed;
//           bottom: 0;
//           left: 0;
//           width: 100%;
//         }

//         .footer p {
//           margin-bottom: 0;
//         }

//         /* Adjust body margin to make space for the sticky footer */
//         body {
//           margin-bottom: 60px; /* Adjust the margin value based on your footer height */
//         }
//       `}</style>

//       <footer className="footer">
//         <p>© 2023 Purifier. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
