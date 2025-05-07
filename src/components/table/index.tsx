import React, { ReactNode, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  DEFAULT_ROW_COLORS,
  TABLE_TYPES,
  ICON_POSITIONS,
  ACTION_TYPES,
  DEFAULT_TABLE_HEADER_STYLES,
} from "../../constants";
import {
  checkCellValueType,
  getCellValueAlignment,
  isAllRowsExpanded,
} from "../../utils";
import { GenericTableProps, Row } from "../../types";
import RowGroup from "../row-group";
import "./styles.css";

function GenericTable<T>({
  data,
  columns,
  meta,
  actions,
  onViewRow,
  isLoading,
  depth,
  showTotal = false,
  tableHeaderStyles,
  tableCellStyles,
  rowColors = DEFAULT_ROW_COLORS,
}: GenericTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    setAllExpanded(isAllRowsExpanded(data, expandedRows));
  }, [expandedRows, data]);

  const isShowActionColumn = Boolean(actions?.length);

  const columnMetadata =
    meta?.columns?.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {} as Record<string, any>) ?? {};

  const handleExpandAllRows = () => {
    const newExpandState = !allExpanded;
    setAllExpanded(newExpandState);

    const updatedExpandedRows: Record<string, boolean> = {};
    const setAllRowState = (rows: Row<T>[]) => {
      rows.forEach((row) => {
        updatedExpandedRows[row.id] = newExpandState;
        if (row.children) {
          setAllRowState(row.children);
        }
      });
    };
    setAllRowState(data);
    setExpandedRows(updatedExpandedRows);
  };

  const renderCellContent = (row: Row<T>, key: string): ReactNode => {
    const value = row[key];
    const columnType = columnMetadata[key]?.type;

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      const renderValue = checkCellValueType(columnType, value);
      const pivotColumnType = meta?.columns?.[2]?.type;

      if (
        !renderValue &&
        meta?.chartType === TABLE_TYPES.PIVOT &&
        pivotColumnType
      ) {
        return checkCellValueType(pivotColumnType, value);
      }

      const icons = columnMetadata[key]?.icons;
      let leftIcon: ReactNode = null;
      let rightIcon: ReactNode = null;

      if (icons?.length) {
        icons.forEach(
          (icon: {
            type: string;
            condition: any;
            location: any;
            position: string;
          }) => {
            if (
              icon.type === ACTION_TYPES.CONDITIONAL &&
              icon.condition &&
              new Function("row", `return ${icon.condition};`)(row)
            ) {
              const iconElement = (
                <img
                  src={require(`${icon.location}`)}
                  alt={`${icon.position}_icon`}
                  className="table-icon"
                />
              );
              if (icon.position === ICON_POSITIONS.LEFT) {
                leftIcon = iconElement;
              } else if (icon.position === ICON_POSITIONS.RIGHT) {
                rightIcon = iconElement;
              }
            }
          }
        );
      }

      if (value === "null") {
        return (
          <span
            className="table-cell"
            style={{
              justifyContent: getCellValueAlignment(columnType),
            }}
          >
            N/A
          </span>
        );
      }

      return (
        <span
          className={`table-cell ${
            columnType === "currency" || pivotColumnType === "currency"
              ? "table-cell-currency"
              : ""
          }`}
          style={{
            justifyContent: getCellValueAlignment(columnType),
          }}
        >
          {leftIcon}
          {renderValue ?? value}
          {rightIcon}
        </span>
      );
    }

    return (
      <span
        className="table-cell"
        style={{
          justifyContent: getCellValueAlignment(columnType),
        }}
      >
        -
      </span>
    );
  };

  const renderHeader = () => {
    return (
      <TableHead>
        <TableRow className="table-header-row">
          {meta.chartType === TABLE_TYPES.MULTI_LEVEL && (
            <TableCell
              className={`table-header-cell ${
                depth === 1 ? "table-header-cell-first-level" : ""
              }`}
              sx={{
                ...DEFAULT_TABLE_HEADER_STYLES,
                ...tableHeaderStyles,
              }}
            >
              <button
                onClick={handleExpandAllRows}
                className="expand-button"
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <ArrowDropDownIcon
                  className={`expand-icon ${
                    !allExpanded ? "expand-icon-collapsed" : ""
                  }`}
                />
              </button>
            </TableCell>
          )}
          {columns.map((column, i) => (
            <TableCell
              key={String(column.key)}
              className={`
              ${
                i === columns.length - 1 && !isShowActionColumn
                  ? "border-radius-top-right border-radius-bottom-right"
                  : ""
              }
              ${
                meta.chartType !== "MULTI_LEVEL_TABLE" && i === 0
                  ? "border-radius-top-left border-radius-bottom-left"
                  : ""
              }
            `}
              sx={{
                textAlign: getCellValueAlignment(
                  columnMetadata[String(column.key)]?.type
                ),
                ...DEFAULT_TABLE_HEADER_STYLES,
                ...tableHeaderStyles,
              }}
            >
              {column.renderHeader ? column.renderHeader(column) : column.label}
            </TableCell>
          ))}
          {isShowActionColumn && (
            <TableCell
              className="border-radius-top-right border-radius-bottom-right"
              sx={{
                textAlign: "center",
                ...DEFAULT_TABLE_HEADER_STYLES,
                ...tableHeaderStyles,
              }}
            >
              Actions
            </TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  };

  const renderBody = () => {
    return (
      <TableBody>
        <RowGroup
          rows={data}
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
      </TableBody>
    );
  };

  const renderEmptyData = () => {
    return (
      <div className="no-data-container">
        <div className="no-data-box">
          {isLoading ? (
            <div style={{ color: "red" }}>Loading...</div>
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>
    );
  };

  if (!data.length) {
    return renderEmptyData();
  }

  return (
    <>
      <TableContainer className="table-container">
        <Table className="table">
          {renderHeader()}
          {renderBody()}
        </Table>
      </TableContainer>
    </>
  );
}

export default GenericTable;
