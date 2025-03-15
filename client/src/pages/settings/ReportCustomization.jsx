import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportCustomization = () => {
  const [template, setTemplate] = useState('default');
  const [reportContent, setReportContent] = useState([]);
  const [previewData, setPreviewData] = useState({
    title: 'Sample Report',
    headers: ['Name', 'Grade', 'Attendance'],
    rows: [
      { name: 'John Doe', grade: 'A', attendance: '95%' },
      { name: 'Jane Smith', grade: 'B', attendance: '90%' },
    ],
  });

  const handleTemplateChange = (e) => {
    setTemplate(e.target.value);
    // Reset content when template changes
    setReportContent([]);
  };

  const handleAddText = () => {
    setReportContent([...reportContent, { type: 'text', value: 'New Text' }]);
  };

  const handleAddTable = () => {
    setReportContent([...reportContent, { type: 'table', headers: previewData.headers, rows: previewData.rows }]);
  };

  const handleAddChart = () => {
    setReportContent([...reportContent, { type: 'chart', data: previewData }]);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    reportContent.forEach((item) => {
      if (item.type === 'text') {
        doc.text(item.value, 10, 10);
      } else if (item.type === 'table') {
        doc.autoTable({
          head: [item.headers],
          body: item.rows.map(row => Object.values(row)),
        });
      } else if (item.type === 'chart') {
        // Add chart as an image (requires canvas-to-image conversion)
        const chartCanvas = document.getElementById('chart-canvas');
        const chartImage = chartCanvas.toDataURL('image/png');
        doc.addImage(chartImage, 'PNG', 10, 10, 180, 100);
      }
    });
    doc.save('report.pdf');
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      previewData.headers.join(',') + "\n" +
      previewData.rows.map(row => Object.values(row).join(',')).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'report.csv');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="report-customization">
        <h1>Customize Report Formats and Templates</h1>

        {/* Template Selection */}
        <div className="template-selection">
          <label>
            Select Template:
            <select value={template} onChange={handleTemplateChange}>
              <option value="default">Default</option>
              <option value="custom">Custom</option>
            </select>
          </label>
        </div>

        {/* Template Editor */}
        <div className="template-editor">
          <h2>Template Editor</h2>
          <div className="editor-tools">
            <button onClick={handleAddText}>Add Text</button>
            <button onClick={handleAddTable}>Add Table</button>
            <button onClick={handleAddChart}>Add Chart</button>
          </div>
          <div className="editor-content">
            {reportContent.map((item, index) => (
              <DraggableItem key={index} id={index} type={item.type} content={item} />
            ))}
          </div>
        </div>

        {/* Preview Section */}
        <div className="preview-section">
          <h2>Preview</h2>
          <div className="preview-content">
            {reportContent.map((item, index) => {
              if (item.type === 'text') {
                return <p key={index}>{item.value}</p>;
              } else if (item.type === 'table') {
                return (
                  <table key={index}>
                    <thead>
                      <tr>
                        {item.headers.map((header, i) => (
                          <th key={i}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.rows.map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((cell, j) => (
                            <td key={j}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              } else if (item.type === 'chart') {
                return (
                  <div key={index}>
                    <Bar
                      id="chart-canvas"
                      data={{
                        labels: previewData.headers,
                        datasets: [
                          {
                            label: 'Sample Data',
                            data: previewData.rows.map(row => row.attendance.replace('%', '')),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Export Options */}
        <div className="export-options">
          <button onClick={handleExportPDF}>Export as PDF</button>
          <button onClick={handleExportCSV}>Export as CSV</button>
        </div>
      </div>
    </DndProvider>
  );
};

const DraggableItem = ({ id, type, content }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="draggable-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {type === 'text' && <p>{content.value}</p>}
      {type === 'table' && (
        <table>
          <thead>
            <tr>
              {content.headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {type === 'chart' && (
        <Bar
          data={{
            labels: content.data.headers,
            datasets: [
              {
                label: 'Sample Data',
                data: content.data.rows.map(row => row.attendance.replace('%', '')),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default ReportCustomization;