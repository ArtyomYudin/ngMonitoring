export class GuestCarModel {
  public guestCarTime: string;
  public guestCarValueDot: string;
  public guestCarValueSys: number;
  public guestCarPhotoThumb: ArrayBuffer;
  public guestCarPhotoLink: string;
}
export interface IGuestCarModel {
  total: number;
  results: GuestCarModel[];
}
