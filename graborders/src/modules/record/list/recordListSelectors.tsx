import { createSelector } from 'reselect';

const selectRaw = (state) => state.record.list;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectExportLoading = createSelector(
  [selectRaw],
  (raw) => raw.exportLoading,
);


const selectTotal =  createSelector([selectRaw] , (raw) => raw.total)

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);


const selectError = createSelector([selectRaw], (raw) => raw.error)



const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);

const selectSorter = createSelector(
  [selectRaw],
  (raw) => raw.sorter || {},
);

const selectOrderBy = createSelector([selectRaw], (raw) => {
  const sorter = raw.sorter;

  if (!sorter) {
    return null;
  }

  if (!sorter.field) {
    return null;
  }

  let direction =
    sorter.order === 'descend' ? 'DESC' : 'ASC';

  return `${sorter.field}_${direction}`;
});

const selectFilter = createSelector([selectRaw], (raw) => {
  return raw.filter;
});

const selectRawFilter = createSelector(
  [selectRaw],
  (raw) => {
    return raw.rawFilter;
  },
);

const selectLimit = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;
  return pagination.pageSize;
});

const selectOffset = createSelector([selectRaw], (raw) => {
  const pagination = raw.pagination;

  if (!pagination || !pagination.pageSize) {
    return 0;
  }

  const current = pagination.current || 1;

  return (current - 1) * pagination.pageSize;
});

const selectPagination = createSelector(
  [selectRaw, selectCount],
  (raw, count) => {
    return {
      ...raw.pagination,
      total: count,
    };
  },
);

const selectSelectedKeys = createSelector(
  [selectRaw],
  (raw) => {
    return raw.selectedKeys;
  },
);

const selectCountRecord = createSelector(
  [selectRaw],
  (raw) => {
    return raw.counts;
  },
);


const selectSelectedRows = createSelector(
  [selectRaw, selectRows],
  (raw, rows) => {
    return rows.filter((row) =>
      raw.selectedKeys.includes(row.id),
    );
  },
);

const selectTotalPerday = createSelector([selectRaw, selectRows], (count) => count.countsday); 
const loadingUpdate = createSelector([selectRaw], (state) => state.loadingUpdate )

const selectIsAllSelected = createSelector(
  [selectRows, selectSelectedKeys],
  (rows, selectedKeys) => {
    return rows.length === selectedKeys.length;
  },
);

const couponsListSelectors = {
  selectTotal,
  selectLoading,
  selectRows,
  selectCount,
  selectOrderBy,
  selectLimit,
  selectFilter,
  selectOffset,
  selectPagination,
  selectSelectedKeys,
  selectSelectedRows,
  selectHasRows,
  selectExportLoading,
  selectRawFilter,
  selectIsAllSelected,
  selectSorter,
  selectError, 
  selectCountRecord,
  selectTotalPerday,
  loadingUpdate
};

export default couponsListSelectors;
