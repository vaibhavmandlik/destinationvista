import React, { useEffect, useState } from 'react'
import mammoth from 'mammoth';

function Rights() {
     const [htmlContent ,setHtmlContent] = useState("");

  useEffect(()=>{
    const loadDocx = async ()=>{
      try {
        const responce = await fetch("/agreementsFiles/Third_party_rights.docx");
        const arrayBuffer =await responce.arrayBuffer();

        const result = await mammoth.convertToHtml({arrayBuffer});
        setHtmlContent(result.value);

         window.scrollTo({ top: 0, behavior: "smooth" }); 
      } catch (error) {
         console.error("Failed to load DOCX:", error);
         setHtmlContent("<p class='text-danger'>Error loading document.</p>");
      }
    }

    loadDocx();
  },[]);
  return (
   <div className='container my-5'>
      <div className='p-4 border rounded bg-light'
      dangerouslySetInnerHTML={{__html:htmlContent}}/>
    </div>
  )
}

export default Rights
