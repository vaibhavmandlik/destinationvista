// import React, { useEffect, useState, createContext, useContext } from "react";

// const GlobalContextProvider = createContext<any>(null);

// export const BackToTopProvider: React.FC = ({ children }) => {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       window.scrollY > 100 ? setVisible(true) : setVisible(false);

//       window.addEventListener("scroll", handleScroll);
//     };

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <GlobalContextProvider.Provider value={{ visible, scrollToTop }}>
//         {children}
//       </GlobalContextProvider.Provider>
//     </>
//   );
// };
// export const useBackToTop =()=> useContext(GlobalContextProvider);