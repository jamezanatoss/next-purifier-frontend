// import axios from 'axios';
// import { useState } from 'react';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Make an API request to initiate the password reset process
//       const response = await axios.post('/api/forgot-password', { recipient: email });

//       // Handle the success response
//       console.log('Password reset email sent successfully');
//       // You can display a success message to the user or redirect them to a confirmation page
//     } catch (error) {
//       // Handle the error response
//       console.error('Failed to send password reset email:', error);
//       // You can display an error message to the user
//     }
//   };

//   return (
//     <div>
//       <h1>ลืมรหัสผ่าน</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email:
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">ลืมรหัสผ่าน</button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;
