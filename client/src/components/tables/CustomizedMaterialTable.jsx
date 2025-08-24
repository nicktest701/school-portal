import React from "react";
import Box from "@mui/material/Box";
import {
  Divider,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "@/config/tableIcons";
import { Add, AddCircleRounded, Delete, Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";
import CustomTableTitle from "../custom/CustomTableTitle";
import EmptyDataContainer from "../EmptyDataContainer";
import AnimatedContainer from "../animations/AnimatedContainer";
import TableSkeleton from "../skeleton/TableSkeleton";
import _ from "lodash";

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
  actions = [],
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
  showRowShadow,
  autoCompleteComponent,
  tableRef,
  otherButtons,
  ...rest
}) {
  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.up("sm"));

  const modifiedColumns = columns.map((column) => {
    return { ...column };
  });

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
        otherButtons={otherButtons}
      />
    );
  }

  return (
    <AnimatedContainer>
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
          data={data || []}
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
            paging: showPaging || _.isEmpty(data) ? false : true,
            pageSize: 10,
            pageSizeOptions: [3, 5, 10, 20, 30, 40, 50, 100],
            paginationType: "stepped",
            // paginationPosition: 'top',
            actionsColumnIndex: -1,
            header: _.isEmpty(data) ? false : true,
            headerStyle: {
              color: "rgb(1, 46, 84)",
              fontWeight: "bold",
              backgroundColor: "whitesmoke",
              textTransform: "uppercase",
            },

            rowStyle: {
              boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
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
              return _.isEmpty(data) && title !== "Students" ? null : (
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

                    <Stack direction={{ xs: "column", md: "row" }} gap={1}>
                      {otherButtons}
                      {showAddButton && (
                        <>
                          {matches ? (
                            <Button
                              variant="contained"
                              startIcon={addButtonIcon || <Add />}
                              disableElevation
                              onClick={() => onAddButtonClicked()}
                            >
                              {addButtonText}
                            </Button>
                          ) : (
                            <Tooltip title={addButtonText || "Add new"}>
                              <IconButton onClick={() => onAddButtonClicked()}>
                                {addButtonIcon || (
                                  <AddCircleRounded
                                    color="primary"
                                    sx={{ width: 32, height: 32 }}
                                  />
                                )}
                              </IconButton>
                            </Tooltip>
                          )}
                        </>
                      )}
                    </Stack>
                  </Box>
                  <Divider />
                  {autoCompleteComponent && (
                    <Box
                      sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}
                    >
                      {autoCompleteComponent}
                    </Box>
                  )}

                  <div style={{ paddingBottom: "12px" }}>
                    <MTableToolbar {...props} className="hide-on-print" />
                  </div>
                </>
              );
            },
          }}
          {...rest}
        />
      </Box>
    </AnimatedContainer>
  );
}

export default CustomizedMaterialTable;
