import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs';
import { AvayaCallCodeConvertPipe } from '@app/pipe/avayacallcodeconvert.pipe';
import { AvayaDurationConvertPipe } from '@app/pipe/avayadurationconvert.pipe';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private avayaDurationConvert: AvayaDurationConvertPipe, private avayaCallCodeConvert: AvayaCallCodeConvertPipe) {}
  public async exportAsExcelFile(json: any[], excelFileName: string): Promise<void> {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Call log');
    worksheet.columns = [
      { header: 'Время начала', key: 'callDateTime', width: 20 },
      { header: 'Продолжительность', key: 'callDuration', width: 20 },
      { header: 'Вызывающий абонент', key: 'callingNumber', width: 15 },
      { header: 'ФИО', key: 'callingName', width: 35 },
      { header: 'Вызываемый абонент', key: 'calledNumber', width: 15 },
      { header: 'ФИО', key: 'calledName', width: 35 },
      { header: 'Тип вызова', key: 'callCode', width: 35 },
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
        this.avayaDurationConvert.transform(Number(e.callDuration)),
        e.callingNumber,
        e.callingName,
        e.calledNumber,
        e.calledName,
        this.avayaCallCodeConvert.transform(e.callCode, e.calledNumber, e.callingNumber),
      ]);
    });
    const excelBuffer: any = await workbook.xlsx.writeBuffer();
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
