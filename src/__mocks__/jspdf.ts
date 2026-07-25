const jsPDF = jest.fn().mockImplementation(() => ({
  setFont: jest.fn(),
  setFontSize: jest.fn(),
  text: jest.fn(),
  addPage: jest.fn(),
  save: jest.fn(),
  setLineWidth: jest.fn(),
  setLineDash: jest.fn(),
  getNumberOfPages: jest.fn(() => 1),
  internal: {
    pageSize: {
      getWidth: jest.fn(() => 210),
      getHeight: jest.fn(() => 297),
    },
    pages: [null, {}],
  },
  splitTextToSize: jest.fn((text: string) => [text]),
  getTextWidth: jest.fn(() => 50),
  setFillColor: jest.fn(),
  setDrawColor: jest.fn(),
  rect: jest.fn(),
  setTextColor: jest.fn(),
  line: jest.fn(),
  html: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  setFontStyle: jest.fn(),
}));

export default jsPDF;
