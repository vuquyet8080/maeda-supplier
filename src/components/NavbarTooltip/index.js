import React from 'react';

function NavbarTooltip({ title }) {
  return (
    <div className="p-3 bg-primary-red/90 text-white text-sm rounded-md absolute top-[-2px] right-14 hidden group-hover:block w-max">
      {title}
    </div>
  );
}

export default NavbarTooltip;
