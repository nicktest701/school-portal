import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  Divider,
  FormLabel,
  Input,
  Typography,
  Skeleton,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
} from "@mui/material";
import MaterialTable, { MTableToolbar, MTableBodyRow } from "material-table";
import { tableIcons } from "@/config/tableIcons";
import { Add, Delete, Refresh } from "@mui/icons-material";
import PublishIcon from "@mui/icons-material/Publish";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { readXLSX } from "@/config/readXLSX";
import { readCSV } from "@/config/readCSV";
import { SchoolSessionContext } from "@/context/providers/SchoolSessionProvider";
import { alertError } from "@/context/actions/globalAlertActions";
import CustomTableTitle from "../custom/CustomTableTitle";
import EmptyDataContainer from "../EmptyDataContainer";

function CustomizedMaterialTable({
  title,
  subtitle,
  exportFileName,
  isPending,
  search,
  style,
  columns,
  data,
  options,
  actions,
  onRowClick,
  onDeleteClicked,
  onSelectionChange,
  handleRefresh,
  showAddButton,
  showPaging,
  addButtonIcon,
  addButtonImg,
  addButtonText,
  addButtonMessage,
  onAddButtonClicked,
  showImportButton,
  importButtonText,
  showRowShadow,
  autoCompleteComponent,
  tableRef,
}) {
  const modifiedColumns = columns.map((column) => {
    return { ...column };
  });

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const CSV_FILE_TYPE = "text/csv";
  const XLSX_FILE_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  const XLS_FILE_TYPE = "application/vnd.ms-excel";

  function handleLoadFile(e) {
    const files = e.target.files[0];

    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      reader.onload = function (event) {
        let students = [];

        if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
          students = readXLSX(event.target.result);
        }

        if (files.type === CSV_FILE_TYPE) {
          students = readCSV(event.target.result);
        }
        if (students.length !== 0) {
          schoolSessionDispatch({ type: "openFileDialog", payload: students });
        }
      };
    } catch (error) {
      schoolSessionDispatch(alertError(error.message));
    }
  }

  if (isPending) {
    return <TableSkeleton />;
  }

  if (data && data?.length === 0) {
    return (
      <EmptyDataContainer
        img={addButtonImg}
        message={addButtonMessage}
        buttonText={addButtonText}
        onClick={onAddButtonClicked}
        showAddButton={showAddButton}
      />
    );
  }

  return (
    // <AnimatedContainer>
    <Box
      className="table-container"
      sx={{
        borderRadius: 0,
        paddingBlock: "16px",
        width: { xs: "100%", md: "95%", lg: "100%" },
        marginInline: "auto",
        py: 4,
      }}
    >
      <MaterialTable
        tableRef={tableRef}
        isLoading={isPending}
        icons={tableIcons}
        columns={modifiedColumns}
        data={data === undefined ? [] : data}
        options={{
          draggable: true,

          search: search || false,
          showTitle: false,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // searchFieldStyle: { width: '20vw' },
          searchFieldStyle: {
            display: { xs: "none", sm: "block" },
            borderRadius: "24px",
            fontSize: "13px",
            marginTop: "10px",
            marginInline: "10px",
            height: "40px",
            minWidth: "40svw",
            flex: 1,
            flexGrow: 1,
          },

          exportButton: true,
          exportAllData: true,
          exportFileName: exportFileName || title || "",
          // showTextRowsSelected: false,
          selection: true,
          showSelectAllCheckbox: true,
          columnsButton: true,
          paging:
            showPaging ||
            (data === undefined || data.length === 0 ? false : true),
          pageSize: 5,
          pageSizeOptions: [3, 5, 10, 20, 30, 40, 50, 100],
          paginationType: "stepped",
          // paginationPosition: 'top',
          actionsColumnIndex: -1,

          header: data === undefined || data.length === 0 ? false : true,

          headerStyle: {
            color: "rgb(1, 46, 84)",
            fontWeight: "bold",
            backgroundColor: "whitesmoke",
            textTransform: "uppercase",
          },

          rowStyle: {
            boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
            // boxShadow: showRowShadow ? "0 1px 2px rgba(0,0,0,0.15)" : "none",

            // paddingBlock: 2,
          },
          ...options,
        }}
        style={{
          // boxShadow: '20px 20px 60px #d9d9d9,-20px -20px 60px #ffffff',
          fontSize: 14,
          maxWidth: "90svw",
          minHeight: "60svh",
          marginInline: "auto",
          // boxShadow: "0 2px 3px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          ...style,
        }}
        actions={[
          ...actions,
          handleRefresh && {
            icon: () => <Refresh className="hide-on-print" />,
            position: "toolbar",
            tooltip: "Refresh",
            onClick: () => handleRefresh(),
            isFreeAction: true,
          },
          {
            icon: () => <Delete className="hide-on-print" />,
            position: "toolbarOnSelect",
            tooltip: "Delete",
            onClick: onDeleteClicked,
          },
        ]}
        onRowClick={(e, rowData) => onRowClick && onRowClick(rowData)}
        onSelectionChange={onSelectionChange}
        components={{
          Toolbar: (props) => {
            return (data === undefined || data?.length === 0) &&
              title !== "Students" ? null : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  {title && (
                    <CustomTableTitle
                      title={title}
                      subtitle={subtitle}
                      // icon={icon}
                    />
                  )}
                  {showAddButton && (
                    <Button
                      variant="contained"
                      startIcon={addButtonIcon || <Add />}
                      disableElevation
                      onClick={() => onAddButtonClicked()}
                    >
                      {addButtonText}
                    </Button>
                  )}
                </Box>
                <Divider />
                <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
                  {autoCompleteComponent}
                </Box>
                <Box
                  className="hide-on-print"
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: 1,
                  }}
                >
                  {showImportButton && (
                    <FormLabel
                      htmlFor="studentFile"
                      title="Import students"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        padding: "12px 15px",
                        borderRadius: 1,
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      <PublishIcon />
                      <Typography variant="body2">
                        {importButtonText}
                      </Typography>

                      <Input
                        type="file"
                        id="studentFile"
                        name="studentFile"
                        hidden
                        inputProps={{
                          accept: ".xlsx,.xls,.csv",
                        }}
                        onChange={(event) => handleLoadFile(event)}
                        onClick={(e) => {
                          e.target.value = null;
                          e.currentTarget.value = null;
                        }}
                      />
                    </FormLabel>
                  )}
                </Box>
                <div style={{ paddingBottom: "16px" }}>
                  <MTableToolbar {...props} className="hide-on-print" />
                </div>
              </>
            );
          },
        }}
        localization={{
          body: {
            emptyDataSourceMessage: (
              <MTableBodyRow>
                {isPending ? (
                  <Typography>Please Wait...</Typography>
                ) : (
                  <>
                    {data && data?.length === 0 && (
                      <EmptyDataContainer
                        img={addButtonImg}
                        message={addButtonMessage}
                        buttonText={addButtonText}
                        onClick={onAddButtonClicked}
                        showAddButton={showAddButton}
                      />
                    )}
                  </>
                )}
              </MTableBodyRow>
            ),
          },
        }}
      />
      {/* {isPending && <LoadingSpinner />} */}
    </Box>
    // </AnimatedContainer>
  );
}
CustomizedMaterialTable.propTypes = {
  icon: PropTypes.node,
  isPending: PropTypes.bool,
  search: PropTypes.bool,
  showAddButton: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  exportFileName: PropTypes.string,
  showImportButton: PropTypes.bool,
  importButtonText: PropTypes.string,
  addButtonMessage: PropTypes.string,
  showRowShadow: PropTypes.bool,
  addButtonImg: PropTypes.node,
  addButtonText: PropTypes.string,
  actions: PropTypes.array,
  columns: PropTypes.array,
  data: PropTypes.array,
  options: PropTypes.object,
  onRowClick: PropTypes.func,
  handleRefresh: PropTypes.func,
  onAddButtonClicked: PropTypes.func,
};

export default CustomizedMaterialTable;

const TableSkeleton = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <TableContainer
      sx={{ border: "1px solid lightgray", borderRadius: "12px" }}
    >
      <TableHead>
        <TableRow>
          {/* Placeholders for table headers */}
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>
          <TableCell>
            <Skeleton variant="text" />
          </TableCell>

          {matches && (
            <>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" />
              </TableCell>
            </>
          )}
          {/* Add more table cells for additional headers */}
        </TableRow>
      </TableHead>
      <TableBody>
        {/* Placeholder table rows */}
        {[...Array(10)].map((_, index) => (
          <TableRow key={index}>
            <TableCell sx={{ width: "10%" }}>
              <Skeleton variant="text" width={100} />
            </TableCell>
            <TableCell sx={{ width: "10%" }}>
              <Skeleton variant="text" width={100} />
            </TableCell>
            {matches && (
              <>
                <TableCell sx={{ width: "10%" }}>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  <Skeleton variant="text" width={100} />
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  <Skeleton variant="text" width={100} />
                </TableCell>
              </>
            )}

            {/* Add more table cells for additional columns */}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};
