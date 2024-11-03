// Function to prompt for WebDAV credentials
function promptForWebDAVCredentials() {
  const username = window.prompt('Enter WebDAV username:');
  const password = window.prompt('Enter WebDAV password:');
  return { username, password };
}

// Read the contents of a specified range of cells from an Excel file
function readExcelCellRange(filePath, sheetName, startCell) {
    return new Promise(resolve => {
      const oReq = new XMLHttpRequest();
      oReq.open('GET', filePath, true);
      oReq.responseType = 'arraybuffer';

      // Check if the URL contains "dav"
      const isWebDAV = filePath.indexOf('dav') !== -1;

      if (isWebDAV) {
        const { username, password } = promptForWebDAVCredentials();
        oReq.setRequestHeader('Authorization', 'Basic ' + btoa(username + ':' + password));
      }

      oReq.onload = function (e) {
        const arraybuffer = oReq.response;
        const data = new Uint8Array(arraybuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[sheetName];

        const lastCell = worksheet['!ref'].split(':')[1];
        const lastRow = XLSX.utils.decode_cell(lastCell).r;

        const nextRow = lastRow + 1;

        const range = XLSX.utils.decode_range(`${startCell}2:${startCell}${nextRow}`);
        const cellValues = [];

        for (let row = range.s.r; row <= range.e.r; row++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: range.s.c });
          const cellValue = worksheet[cellAddress]?.v;
          cellValues.push(cellValue);
        }

        resolve(cellValues);
      };

      oReq.send();
    });
}

// Generate download link and create download file
function generateDownloadLink(content, fileName) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
}

// Parse the query parameters from the URL
function parseQueryParameters(url) {
    const queryString = url.split('?')[1];
    const queryParams = new URLSearchParams(queryString);

    return {
      filePath: queryParams.get('file'),
      sheetName: decodeURIComponent(queryParams.get('sheet')),
      startCell: queryParams.get('line'),
      fileName: queryParams.get('name')
    };
}

// Handle the request and process the Excel file
function handleRequest(url) {
    const { filePath, sheetName, startCell, fileName } = parseQueryParameters(url);

    if (filePath && sheetName && startCell && fileName) {
      const currentURL = new URL(url);
      const currentDomain = `${currentURL.protocol}//${currentURL.host}`;
      const fullFilePath = `${filePath}`;

      readExcelCellRange(fullFilePath, sheetName, startCell)
        .then(content => generateDownloadLink(content.join('\n'), fileName));
    }
}

