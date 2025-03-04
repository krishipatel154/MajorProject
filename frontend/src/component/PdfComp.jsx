import { useState } from "react";
import { Document, Page } from "react-pdf";
import pdf from "./pdf-test.pdf"
function PdfComp() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <p>Page {pageNumber} of {numPages || "Loading..."}</p>
            <button 
                disabled={pageNumber <= 1} 
                onClick={() => setPageNumber(prev => prev - 1)}
            >
                Previous
            </button>

            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
            <button 
                disabled={!numPages || pageNumber >= numPages}  // ✅ Fix numPages being null
                onClick={() => setPageNumber(prev => prev + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default PdfComp;
