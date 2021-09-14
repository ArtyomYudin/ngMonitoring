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
      { header: 'Время начала', key: 'callDateTime', width: '20' },
      { header: 'Продолжительность', key: 'callDuration', width: '20' },
      { header: 'Вызывающий абонент', key: 'callingNumber', width: '15' },
      { header: 'ФИО', key: 'callingName', width: '35' },
      { header: 'Вызываемый абонент', key: 'calledNumber', width: '15' },
      { header: 'ФИО', key: 'calledName', width: '35' },
      { header: 'Тип вызова', key: 'callCode' },
    ];
    //worksheet.columns.forEach(column => {
    //  column.width = column.header.length < 19 ? 19 : column.header.length;
    //});
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
    json.forEach((e, index) => {
      // row 1 is the header.
      const rowIndex = index + 2;
      // console.log(this.convertDate(e.callDuration));
      // worksheet.addRow({ ...e });
      worksheet.addRow([
        e.callDateTime,
        this.convertDate(e.callDuration),
        e.callingNumber,
        e.callingName,
        e.calledNumber,
        e.calledName,
        e.callCode,
      ]);
    });
    const excelBuffer: any = await workbook.xlsx.writeBuffer();
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  private convertDate(value: number): string {
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    const s = Math.floor((value % 3600) % 60);
    const hDisplay = h > 0 ? h + ' ч. ' : '';
    const mDisplay = m > 0 ? m + ' мин. ' : '';
    const sDisplay = s > 0 ? s + ' сек.' : '';
    return hDisplay + mDisplay + sDisplay;
  }
}
