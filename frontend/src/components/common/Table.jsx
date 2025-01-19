import React, { useState, useMemo } from 'react';
import '../../css/Table.css';

const Table = ({
  columns,
  data,
  sortable = false,
  selectable = false,
  onRowClick,
  onSelectionChange,
  initialSort = { field: null, direction: 'asc' },
  pagination = false,
  pageSize = 10,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  stickyHeader = false,
  zebra = false,
  compact = false,
  ...props
}) => {
  const [sort, setSort] = useState(initialSort);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sort.field) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sort.field];
      const bValue = b[sort.field];

      if (aValue === bValue) return 0;
      const comparison = aValue < bValue ? -1 : 1;
      return sort.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sort]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Handle sort
  const handleSort = (field) => {
    if (!sortable) return;

    setSort((prevSort) => ({
      field,
      direction:
        prevSort.field === field && prevSort.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  // Handle selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = new Set(paginatedData.map((row) => row.id));
      setSelectedRows(allIds);
      onSelectionChange?.(allIds);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.(new Set());
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  };

  // Generate table classes
  const tableClasses = [
    'table',
    stickyHeader ? 'table-sticky' : '',
    zebra ? 'table-zebra' : '',
    compact ? 'table-compact' : '',
    loading ? 'table-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className={tableClasses} {...props}>
          <thead>
            <tr>
              {selectable && (
                <th className="table-checkbox">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((row) => selectedRows.has(row.id))
                    }
                    indeterminate={
                      paginatedData.some((row) => selectedRows.has(row.id)) &&
                      !paginatedData.every((row) => selectedRows.has(row.id))
                    }
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.field}
                  className={sortable ? 'sortable' : ''}
                  onClick={() => handleSort(column.field)}
                  style={{ width: column.width }}
                >
                  <div className="th-content">
                    {column.title}
                    {sortable && sort.field === column.field && (
                      <span className={`sort-icon sort-${sort.direction}`}>
                        {sort.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="table-loading-row">
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <div className="table-loading-content">
                    <div className="loading-spinner" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr className="table-empty-row">
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <div className="table-empty-content">{emptyMessage}</div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={
                    selectedRows.has(row.id) ? 'selected' : ''
                  }
                >
                  {selectable && (
                    <td className="table-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.field}>
                      {column.render
                        ? column.render(row[column.field], row)
                        : row[column.field]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="table-pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            ⟪
          </button>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ⟨
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            ⟩
          </button>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            ⟫
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
