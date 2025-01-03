import React from 'react';

function PagesContainer({ children },) {
  return (
    <div className="flex justify-center items-center border border-green-500 mt-16">
      <div className=" w-full h-full ">
        {children}
      </div>
    </div>
  );
}

export default PagesContainer;
