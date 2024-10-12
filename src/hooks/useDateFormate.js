import { useState, useEffect } from 'react';

function useFormattedDate(inputDate, formatType) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (!inputDate) return;

    const date = new Date(inputDate);

    // Check if the date is valid
    if (isNaN(date)) {
      setFormattedDate('Invalid Date');
      return;
    }

    // Format based on type
    let result = '';
    if (formatType === 1) {
      // Type 1: "10 Oct, 2024"
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      result = date.toLocaleDateString('en-GB', options);
    } else if (formatType === 2) {
      // Type 2: "10-10-2024"
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = date.getFullYear();
      result = `${day}-${month}-${year}`;
    } else {
      // Default ISO format "2024-10-10T00:00:00.000Z"
      result = date.toISOString();
    }

    setFormattedDate(result);
  }, [inputDate, formatType]);

  return formattedDate;
}

export default useFormattedDate;
