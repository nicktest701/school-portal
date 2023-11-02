import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { FormLabel, Input, Typography } from '@mui/material';
import MaterialTable, { MTableToolbar } from 'material-table';
import { tableIcons } from '../../config/tableIcons';
import { Add, Delete, Refresh } from '@mui/icons-material';
import PublishIcon from '@mui/icons-material/Publish';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
// import { InfinitySpin } from 'react-loader-spinner';
import AnimatedContainer from '../animations/AnimatedContainer';
import { readXLSX } from '../../config/readXLSX';
import { readCSV } from '../../config/readCSV';
import { SchoolSessionContext } from '../../context/providers/SchoolSessionProvider';
import { alertError } from '../../context/actions/globalAlertActions';
import CustomTableTitle from '../custom/CustomTableTitle';
import EmptyDataContainer from '../EmptyDataContainer';

function CustomizedMaterialTable({
  title,
  subtitle,
  icon,
  exportFileName,
  isLoading,
  search,
  columns,
  data,
  options,
  actions,
  onRowClick,
  handleRefresh,
  showAddButton,
  showPaging,
  addButtonImg,
  addButtonText,
  addButtonMessage,
  onAddButtonClicked,
  showImportButton,
  importButtonText,
  showRowShadow,
}) {
  const modifiedColumns = columns.map((column) => {
    return { ...column };
  });

  const { schoolSessionDispatch } = useContext(SchoolSessionContext);

  const CSV_FILE_TYPE = 'text/csv';
  const XLSX_FILE_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const XLS_FILE_TYPE = 'application/vnd.ms-excel';

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
          schoolSessionDispatch({ type: 'openFileDialog', payload: students });
        }
      };
    } catch (error) {
      schoolSessionDispatch(alertError(error.message));
    }
  }

  return (
    <AnimatedContainer>
      {/* <Box paddingY={2} > */}
        <MaterialTable
          isLoading={isLoading}
          title={
            <CustomTableTitle title={title} subtitle={subtitle} icon={icon} />
          }
          icons={tableIcons}
          columns={modifiedColumns}
          // columns={[
          //   {
          //     customFilterAndSearch: (data, rowData) => {
          //       return data.toLowerCase().lastIndexOf(rowData.fullName) > -1;
          //     },

          //   },
          // ]}
          data={data === undefined ? [] : data}
          options={{
            // selection: true,

            draggable: true,

            search: search || false,
            searchFieldVariant: 'outlined',
            // searchFieldStyle: { width: '20vw' },
            searchFieldStyle: {
              display: { xs: 'none', sm: 'block' },
              borderRadius: '20px',
              fontSize: '13px',
              marginTop: '10px',
              marginRight: '20px',
              height: '40px',
              width: { xs: 100, md: '300px' },
            },

            exportButton: true,
            exportAllData: true,
            exportFileName: exportFileName || title || '',
            // showTextRowsSelected: false,
            selection: true,
            showSelectAllCheckbox: true,
            columnsButton: true,
            paging:
              showPaging ||
              (data === undefined || data.length === 0 ? false : true),
            pageSize: 5,
            pageSizeOptions: [5, 10, 20, 30, 40, 50, 100],
            paginationType: 'stepped',
            paginationPosition:'top',
            actionsColumnIndex: -1,
            overflowY: 'scroll',
            header: data === undefined || data.length === 0 ? false : true,
            headerStyle: {
              color: 'rgb(1, 46, 84)',
              // backgroundColor: '#eee',
              fontWeight: 'bold',
              // textTransform:'uppercase'
              // fontSize: 17,
            },
            rowStyle: {
              boxShadow: showRowShadow ? '0 1px 2px rgba(0,0,0,0.15)' : 'none',
              // paddingBlock: 2,
            },
            ...options,
          }}
          style={{
            padding: '8px',
            boxShadow: 'none',
            border: '1px solid lightgray',
            fontSize: 13,
          }}
          actions={[
            handleRefresh && {
              icon: () => <Refresh className='hide-on-print' />,
              position: 'toolbar',
              tooltip: 'Refresh',
              onClick: () => handleRefresh(),
              isFreeAction: true,
            },
            {
              icon: () => <Delete className='hide-on-print' />,
              position: 'toolbarOnSelect',
              tooltip: 'Delete',
              onClick: () => alert('Delete All'),
            },

            ...actions,
          ]}
          onRowClick={(e, rowData) => onRowClick && onRowClick(rowData)}
          components={{
            Toolbar: (props) => {
              return data === undefined || data.length === 0 ? null : (
                <>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      padding: 1,
                    }}
                  >
                    {showAddButton && (
                      <Button
                        variant='contained'
                        startIcon={<Add />}
                        disableElevation
                        onClick={() => onAddButtonClicked()}
                      >
                        {addButtonText}
                      </Button>
                    )}
                    {showImportButton && (
                      <FormLabel
                        htmlFor='studentFile'
                        title='Import students'
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 1,
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          padding: '12px 15px',
                          borderRadius: 1,
                          fontSize: 13,
                          cursor: 'pointer',
                        }}
                      >
                        <PublishIcon />
                        <Typography variant='body2'>
                          {importButtonText}
                        </Typography>

                        <Input
                          type='file'
                          id='studentFile'
                          name='studentFile'
                          hidden
                          inputProps={{
                            accept: '.xlsx,.xls,.csv',
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
                  <MTableToolbar {...props} />
                </>
              );
            },
            // OverlayLoading: (props) => {
            //   return (
            //     <InfinitySpin
            //       {...props}
            //       width='200'
            //       color={palette.primary.main}
            //     />
            //   );
            // },
          }}
          localization={{
            body: {
              emptyDataSourceMessage: (
                <EmptyDataContainer
                  img={addButtonImg}
                  message={addButtonMessage}
                  buttonText={addButtonText}
                  onClick={onAddButtonClicked}
                  showAddButton={showAddButton}
                />
              ),
            },
          }}
        />
      {/* </Box> */}
    </AnimatedContainer>
  );
}
CustomizedMaterialTable.propTypes = {
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
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
