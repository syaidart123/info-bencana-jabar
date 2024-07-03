import React from "react";

type propsTypes = {
  children: React.ReactNode;
  head: any;
};

const Tabel = (props: propsTypes) => {
  const { children, head } = props;
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-sky-500">
        <tr>
          {head.map((item: any, index: any) => (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium uppercase text-white"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Tabel;
