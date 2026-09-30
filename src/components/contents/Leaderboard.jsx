// import service from "../../services/service";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion"; // Impor Framer Motion

// export default function Leaderboard() {
//   const [dataLeaderboard, setDataLeaderboard] = useState([]);
//   const [isDataFetched, setIsDataFetched] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await service.leaderboard();
//         setDataLeaderboard(data);
//         setIsDataFetched(true); // Set state menjadi true setelah data selesai di-fetch
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Variasi animasi untuk container tabel
//   const tableVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1, // Animasi baris akan berurutan dengan delay 0.1 detik
//       },
//     },
//   };

//   // Variasi animasi untuk setiap baris
//   const rowVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   return (
//     <div className="min-vh-100 py-5 d-flex flex-column align-items-center">
//       <h1 className="text-center mb-4 fw-bold text-primary">
//         🏆 Leaderboard 🏆
//       </h1>
//       {isDataFetched && ( // Hanya render animasi jika data sudah di-fetch
//         <motion.div
//           className="table-responsive w-100 shadow-sm p-3 bg-white rounded"
//           style={{ maxHeight: "500px", overflowY: "auto" }}
//           variants={tableVariants}
//           initial="hidden"
//           animate="show"
//         >
//           <table className="table table-hover text-center align-middle">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th className="py-3">No</th>
//                 <th className="py-3">Username</th>
//                 <th className="py-3">Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dataLeaderboard.map((user, index) => (
//                 <motion.tr
//                   key={index}
//                   className="fs-5"
//                   variants={rowVariants}
//                   whileHover={{ scale: 1.02, backgroundColor: "#f8f9fa" }} // Efek hover
//                   transition={{ type: "spring", stiffness: 300 }} // Transisi spring
//                 >
//                   <td className="fw-bold text-secondary">{index + 1}</td>
//                   <td className="fw-semibold">{user.fullName}</td>
//                   <td className="fw-bold text-success">{user.score}</td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </motion.div>
//       )}
//     </div>
//   );
// }
