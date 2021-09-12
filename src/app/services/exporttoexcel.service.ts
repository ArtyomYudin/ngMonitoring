import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs/dist/exceljs.min.js';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}
  public async exportAsExcelFile(json: any[], excelFileName: string): Promise<void> {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Call log');
    worksheet.columns = [
      { header: 'Время начала', key: 'callDateTime' },
      { header: 'Продолжительность', key: 'callDuration' },
      { header: 'Вызывающий абонент', key: 'callingNumber' },
      { header: 'ФИО', key: 'callingName' },
      { header: 'Вызываемый абонент', key: 'calledNumber' },
      { header: 'ФИО', key: 'calledName' },
      { header: 'Тип вызова', key: 'callCode' },
    ];
    worksheet.columns.forEach(column => {
      column.width = column.header.length < 19 ? 19 : column.header.length;
    });
    json.forEach((e, index) => {
      // row 1 is the header.
      const rowIndex = index + 2;

      // By using destructuring we can easily dump all of the data into the row without doing much
      // We can add formulas pretty easily by providing the formula property.
      // worksheet.addRow([e.callDateTime]);
      worksheet.addRow({ ...e });
    });
    const excelBuffer: any = await workbook.xlsx.writeBuffer();
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
