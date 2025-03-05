import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="">
      {/* 
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            Previous
          </button> */}
      <p>
        Page {pageNumber} of {numPages || "Loading..."}
      </p>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            );
          })}
      </Document>

      {/* <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        </> */}
    </div>
  );
}

export default PdfComp;
