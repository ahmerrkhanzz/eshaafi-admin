// export const CheckPhone {
//     // id: number,
//     // code: string,
//     // title: string,
//     // shortName: string,
//     // imageName: string,
//     // desc: string,
//     // webURL: string

// }

export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}
