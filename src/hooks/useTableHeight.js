import { useState, useLayoutEffect } from 'react';

export const useTableHeight = (additionalHeight) => {
  const [tableHeight, setTableHeight] = useState(0);
  useLayoutEffect(() => {
    setTableHeight(window.innerHeight - additionalHeight);
  }, [additionalHeight]);

  return { tableHeight };
};
