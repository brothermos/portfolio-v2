import type { Worksheet } from 'exceljs';

import type { FundPortfolioPreviewItem } from '@/lib/funds/sec';
import type { PortfolioPreviewItem } from '@/lib/stocks/types';

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportStamp() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

const NUMBER_KEYS = new Set([
  'shares',
  'units',
  'avgBuyPrice',
  'avgBuyNav',
  'price',
  'nav',
  'marketValue',
  'costBasis',
  'weightPercent',
  'unrealizedPnl',
  'unrealizedPnlPercent',
  'changePercent',
]);

function styleSheet(sheet: Worksheet) {
  const header = sheet.getRow(1);
  header.font = { bold: true };
  header.alignment = { vertical: 'middle' };
  sheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFECFDF5' },
    };
  });

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    row.eachCell((cell, colNumber) => {
      const key = sheet.getColumn(colNumber).key;
      if (typeof key === 'string' && NUMBER_KEYS.has(key) && typeof cell.value === 'number') {
        cell.numFmt = key.endsWith('Percent') || key === 'changePercent' ? '0.00' : '#,##0.00';
      }
    });
  });
}

async function writeWorkbookDownload(
  build: (workbook: import('exceljs').Workbook) => void,
  filename: string,
) {
  const ExcelJS = (await import('exceljs')).default;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'My Wealth Stocks Portfolio';
  workbook.created = new Date();
  build(workbook);
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  downloadBlob(blob, filename);
}

export async function exportStocksExcel(stocks: PortfolioPreviewItem[]) {
  const stockRows = stocks
    .filter((item) => item.shares > 0)
    .sort((a, b) => b.marketValue - a.marketValue);

  await writeWorkbookDownload((workbook) => {
    const stockSheet = workbook.addWorksheet('หุ้น', {
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    stockSheet.columns = [
      { header: 'สัญลักษณ์', key: 'symbol', width: 12 },
      { header: 'จำนวนหุ้น', key: 'shares', width: 12 },
      { header: 'ราคาเฉลี่ย', key: 'avgBuyPrice', width: 14 },
      { header: 'ราคาปัจจุบัน', key: 'price', width: 14 },
      { header: 'มูลค่าตลาด', key: 'marketValue', width: 14 },
      { header: 'สกุลเงิน', key: 'currency', width: 10 },
      { header: 'น้ำหนัก %', key: 'weightPercent', width: 12 },
      { header: 'กำไร/ขาดทุน', key: 'unrealizedPnl', width: 14 },
      { header: 'กำไร/ขาดทุน %', key: 'unrealizedPnlPercent', width: 14 },
      { header: 'เปลี่ยนวันนี้ %', key: 'changePercent', width: 14 },
    ];
    for (const item of stockRows) {
      stockSheet.addRow({
        symbol: item.symbol,
        shares: item.shares,
        avgBuyPrice: item.avgBuyPrice,
        price: item.price,
        marketValue: item.marketValue,
        currency: item.currency,
        weightPercent: item.weightPercent,
        unrealizedPnl: item.unrealizedPnl,
        unrealizedPnlPercent: item.unrealizedPnlPercent,
        changePercent: item.changePercent,
      });
    }
    styleSheet(stockSheet);
  }, `portfolio-stocks-${exportStamp()}.xlsx`);

  return { count: stockRows.length };
}

export async function exportFundsExcel(funds: FundPortfolioPreviewItem[]) {
  const fundRows = funds
    .filter((item) => item.units > 0)
    .sort((a, b) => b.marketValue - a.marketValue);

  await writeWorkbookDownload((workbook) => {
    const fundSheet = workbook.addWorksheet('กองทุน', {
      views: [{ state: 'frozen', ySplit: 1 }],
    });
    fundSheet.columns = [
      { header: 'สัญลักษณ์', key: 'symbol', width: 14 },
      { header: 'ชื่อย่อ', key: 'title', width: 16 },
      { header: 'ชื่อกอง', key: 'name', width: 36 },
      { header: 'จำนวนหน่วย', key: 'units', width: 14 },
      { header: 'NAV เฉลี่ย', key: 'avgBuyNav', width: 12 },
      { header: 'NAV ปัจจุบัน', key: 'nav', width: 12 },
      { header: 'มูลค่าตลาด', key: 'marketValue', width: 14 },
      { header: 'ต้นทุน', key: 'costBasis', width: 14 },
      { header: 'น้ำหนัก %', key: 'weightPercent', width: 12 },
      { header: 'กำไร/ขาดทุน', key: 'unrealizedPnl', width: 14 },
      { header: 'กำไร/ขาดทุน %', key: 'unrealizedPnlPercent', width: 14 },
      { header: 'เปลี่ยนวันนี้ %', key: 'changePercent', width: 14 },
      { header: 'ณ วันที่', key: 'asOfDate', width: 12 },
    ];
    for (const item of fundRows) {
      fundSheet.addRow({
        symbol: item.symbol,
        title: item.title,
        name: item.name,
        units: item.units,
        avgBuyNav: item.avgBuyNav,
        nav: item.nav,
        marketValue: item.marketValue,
        costBasis: item.costBasis,
        weightPercent: item.weightPercent,
        unrealizedPnl: item.unrealizedPnl,
        unrealizedPnlPercent: item.unrealizedPnlPercent,
        changePercent: item.changePercent,
        asOfDate: item.asOfDate,
      });
    }
    styleSheet(fundSheet);
  }, `portfolio-funds-${exportStamp()}.xlsx`);

  return { count: fundRows.length };
}
