import React, { ReactNode, useState } from "react";
import { TableCell, TableRow, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { TABLE_TYPES, DEFAULT_TABLE_CELL_STYLES } from "../../constants";
import { GenericTableProps, Row, RowAction } from "../../types";
import "./styles.css";

interface RowGroupProps<T> {
  rows: Row<T>[];
  level?: number;
  columns: GenericTableProps<T>["columns"];
  meta: GenericTableProps<T>["meta"];
  actions?: GenericTableProps<T>["actions"];
  onViewRow?: GenericTableProps<T>["onViewRow"];
  depth?: number;
  showTotal?: boolean;
  tableCellStyles?: GenericTableProps<T>["tableCellStyles"];
  rowColors?: string[];
  columnMetadata: Record<string, any>;
  renderCellContent: (row: Row<T>, key: string) => ReactNode;
}

function RowGroup<T>({
  rows,
  level = 0,
  columns,
  meta,
  actions,
  onViewRow,
  depth,
  showTotal = false,
  tableCellStyles,
  rowColors = ["#F0F0F1", "#FFFFFF"],
  columnMetadata,
  renderCellContent,
}: RowGroupProps<T>): JSX.Element {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [updatingRowId, setUpdatingRowId] = useState<string | null>(null);
  const [dynamicNestedRows, setDynamicNestedRows] = useState<{
    index: number;
    dynamicRows: Row<T>[] | null;
  }>({ index: -1, dynamicRows: null });

  const isShowActionColumn = Boolean(actions?.length);

  const handleExpandRowClick = (id: string): void => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandDynamicChildrenRowClick = async (
    rowIndex: number,
    row: Row<T>,
    e: React.MouseEvent
  ): Promise<void> => {
    e.stopPropagation();
    if (
      dynamicNestedRows?.dynamicRows?.length &&
      (dynamicNestedRows.dynamicRows[0].id as string).includes(row.id)
    ) {
      setDynamicNestedRows({ index: -1, dynamicRows: null });
      return;
    }
    setDynamicNestedRows({ index: -1, dynamicRows: null });

    if (row.getChildren) {
      const childRows = await row.getChildren(row.id);
      setDynamicNestedRows({ index: rowIndex, dynamicRows: childRows });
    }
  };

  const handleRowActionClick = (rowId: string, action: RowAction, el?: any): void => {
    if (!action || !isShowActionColumn) return;

    const { renderUpdateComponent, action: actionHandler } = action;

    if (renderUpdateComponent) {
      setUpdatingRowId((prev) => (prev === rowId ? null : rowId));
    } else if (actionHandler) {
      actionHandler(rowId, el);
    }
  };

  const getRowCellBackGround = (index: number): string => {
    if (depth && depth === index) {
      return "#FFFFFF";
    } else {
      return rowColors[index % 2 ? 0 : 1];
    }
  };

  const renderDynamicRows = (dynamicRows: Row<T>[]): JSX.Element[] => {
    return dynamicRows.map((row) => (
      <React.Fragment key={`${row.id}`}>
        <TableRow style={{ backgroundColor: "#FFFFFF" }}>
          {meta.chartType === TABLE_TYPES.MULTI_LEVEL && (
            <TableCell sx={{ border: "none" }}></TableCell>
          )}
          {columns.map((column, colIndex) => (
            <TableCell
              key={String(column.key)}
              sx={{
                ...DEFAULT_TABLE_CELL_STYLES,
                ...tableCellStyles,
                borderLeft: colIndex === 0 ? "1px solid #2F736E1F" : "none",
                borderRight: "1px solid #2F736E1F",
                background: "#FFFFFF",
                borderTopLeftRadius: colIndex === 0 ? "8px" : "0px",
                borderBottomLeftRadius: colIndex === 0 ? "8px" : "0px",
                borderTopRightRadius:
                  colIndex === columns.length - 1 ? "8px" : "0px",
                borderBottomRightRadius:
                  colIndex === columns.length - 1 ? "8px" : "0px",
              }}
            >
              {column.render
                ? column.render(row[column.key as keyof Row<T>], row as T, 0)
                : renderCellContent(row, column.key as string)}
            </TableCell>
          ))}
        </TableRow>
      </React.Fragment>
    ));
  };

  return (
    <>
      {rows.map((row, rowIndex) => {
        const isExpanded = expandedRows[row.id];
        const isUpdating = updatingRowId === row.id;
        const actionWithRenderUpdate = actions?.find(
          (action) => action?.renderUpdateComponent
        );

        if (isUpdating && actionWithRenderUpdate) {
          return (
            <React.Fragment key={`${row.id}_${rowIndex}`}>
              <TableRow
                className="row-group-table-row"
                style={{
                  backgroundColor: "#FFFFFF",
                  cursor: onViewRow ? "pointer" : "default",
                }}
                onClick={(): void => onViewRow?.(row)}
              >
                {meta?.chartType === TABLE_TYPES.MULTI_LEVEL && (
                  <TableCell
                    className="row-group-level-cell"
                    style={{
                      paddingLeft: `${level * 20 + 10}px`,
                    }}
                  ></TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={String(column.key)}
                    sx={{
                      ...DEFAULT_TABLE_CELL_STYLES,
                      ...tableCellStyles,
                      border: "none",
                      borderLeft: "1px solid #2F736E1F",
                      background: "#2F736E1F",
                    }}
                  >
                    {column.render
                      ? column.render(
                          row[column.key as keyof Row<T>],
                          row as T,
                          level
                        )
                      : renderCellContent(row, column.key as string)}
                  </TableCell>
                ))}
                {isShowActionColumn && level === 0 && (
                  <TableCell
                    key={String(`${row.id}_${rowIndex}_actions`)}
                    className="row-group-action-cell"
                    sx={{
                      ...DEFAULT_TABLE_CELL_STYLES,
                      ...tableCellStyles,
                    }}
                  ></TableCell>
                )}
              </TableRow>
              <TableRow key={`selected_${row.id}`}>
                <TableCell
                  colSpan={columns.length + 2}
                  className="row-group-update-cell"
                >
                  {actionWithRenderUpdate.renderUpdateComponent(row, () =>
                    setUpdatingRowId(null)
                  )}
                </TableCell>
              </TableRow>
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={`${row.id}_${rowIndex}`}>
            <TableRow
              style={{
                backgroundColor:
                  rowIndex === rows.length - 1 && showTotal
                    ? "#2F736E"
                    : "#F0F0F1",
                cursor: onViewRow ? "pointer" : "default",
              }}
              onClick={(): void => onViewRow?.(row)}
            >
              {meta?.chartType === TABLE_TYPES.MULTI_LEVEL && (
                <TableCell
                  style={{
                    width: "5px",
                    paddingLeft: `${level * 20 + 10}px`,
                    paddingTop: 0,
                    paddingBottom: 0,
                    backgroundColor: "white",
                    borderBottom: "none",
                    lineHeight: "1rem",
                    paddingRight: "0px",
                  }}
                >
                  {row.children && (
                    <button
                      className="row-group-expand-button"
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      onClick={(): void => handleExpandRowClick(row.id)}
                    >
                      <ArrowDropDownIcon
                        style={{
                          color: "#162C36",
                          rotate: isExpanded ? "0deg" : "-90deg",
                        }}
                      />
                    </button>
                  )}
                  {!row.children && row.getChildren && (
                    <button
                      className="row-group-expand-button"
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                      onClick={(e: React.MouseEvent): Promise<void> =>
                        handleExpandDynamicChildrenRowClick(rowIndex, row, e)
                      }
                    >
                      <ArrowDropDownIcon
                        style={{
                          color: "#162C36",
                          rotate:
                            dynamicNestedRows?.index === rowIndex || isExpanded
                              ? "0deg"
                              : "-90deg",
                        }}
                      />
                    </button>
                  )}
                </TableCell>
              )}
              {columns.map((column, colIndex) => (
                <TableCell
                  key={String(column.key)}
                  sx={{
                    ...DEFAULT_TABLE_CELL_STYLES,
                    ...tableCellStyles,
                    border: "none",
                    borderLeft:
                      colIndex === 0 || level === depth
                        ? "none"
                        : "1px solid #2F736E1F",
                    background: getRowCellBackGround(level),
                    borderTopLeftRadius: colIndex === 0 ? "8px" : "0px",
                    borderBottomLeftRadius: colIndex === 0 ? "8px" : "0px",
                    borderTopRightRadius:
                      colIndex === columns.length - 1 ? "8px" : "0px",
                    borderBottomRightRadius:
                      colIndex === columns.length - 1 ? "8px" : "0px",
                  }}
                >
                  {column.render
                    ? column.render(
                        row[column.key as keyof Row<T>],
                        row as T,
                        level
                      )
                    : renderCellContent(row, column.key as string)}
                </TableCell>
              ))}
              {isShowActionColumn && level === 0 && (
                <TableCell className="table-cell table-cell--action">
                  {actions?.map((action, index) => {
                    if (action?.condition && !action.condition(row.id)) {
                      return null;
                    }
                    if (action.component) {
                      return React.cloneElement(action.component, {
                        onClick: (e: React.MouseEvent) => {
                          if (!action.action) return;
                          action.action(row.id, e);
                        },
                      });
                    }
                    return (
                      <button
                        key={String(`${row.id}_${rowIndex}_${index}_action`)}
                        className="row-group-action-button"
                        onClick={(e: React.MouseEvent): void => {
                          handleRowActionClick(row.id, action);
                          e.stopPropagation();
                        }}
                      >
                        {action.icon && (
                          <img
                            src={require(`${action.icon}`)}
                            alt="action_icon"
                            className="row-group-action-icon"
                          />
                        )}
                        <Typography className="row-group-action-label">
                          {action.label}
                        </Typography>
                      </button>
                    );
                  })}
                </TableCell>
              )}
            </TableRow>
            {isExpanded && row.children && (
              <RowGroup
                rows={row.children}
                level={level + 1}
                columns={columns}
                meta={meta}
                actions={actions}
                onViewRow={onViewRow}
                depth={depth}
                showTotal={showTotal}
                tableCellStyles={tableCellStyles}
                rowColors={rowColors}
                columnMetadata={columnMetadata}
                renderCellContent={renderCellContent}
              />
            )}
            {depth &&
            dynamicNestedRows?.index === rowIndex &&
            dynamicNestedRows?.dynamicRows?.length
              ? renderDynamicRows(dynamicNestedRows.dynamicRows)
              : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export default RowGroup;
