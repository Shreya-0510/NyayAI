// src/utils/pdf-worker.js
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.js?url";

// ✅ Tell pdfjs where the worker file is
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export { pdfjsLib };
