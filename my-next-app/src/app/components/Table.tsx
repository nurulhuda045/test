import React from "react";

interface TableProps {
    data: any,
    columns?: any
    actions?: any
}

const Table = ({ data, columns, actions }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column: any, index: number) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.Header}
              </th>
            ))}
            <th
                key="action"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                action
              </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {columns.map((column: any, colIndex: number) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[column.accessor]}
                </td>
              ))}
              {actions?.map((action: any) => (
                <td
                  key={action.name}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {action.content ? action.content(row._id) : (
                    <button
                      onClick={() => action.event(row._id)}
                      className="border border-gray-500 rounded-lg px-2 py-1"
                    >
                      {action.name}
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
