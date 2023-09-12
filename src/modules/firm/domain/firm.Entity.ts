export class Firm {
  constructor(
    private address: string,
    private email: string,
    private facebook: string,
    private instagram: string,
    private phone: string,
    private website: string,
    private whatsapp: string
  ) {}


  public getAddress(): string {
    return this.address;
  }

  public getEmail(): string {
    return this.email;
  }

  public getFacebook(): string {
    return this.facebook;
  }

  public getInstagram(): string {
    return this.instagram;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getWebsite(): string {
    return this.website;
  }

  public getWhatsapp(): string {
    return this.whatsapp;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setFacebook(facebook: string): void {
    this.facebook = facebook;
  }

  public setInstagram(instagram: string): void {
    this.instagram = instagram;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }

  public setWebsite(website: string): void {
    this.website = website;
  }

  public setWhatsapp(whatsapp: string): void {
    this.whatsapp = whatsapp;
  }

  public static toModel(obj: FirmObject): Firm {
    return new Firm(
      obj.address,
      obj.email,
      obj.facebook,
      obj.instagram,
      obj.phone,
      obj.website,
      obj.whatsapp
    );
  }
}

export interface FirmObject {
  address: string;
  email: string;
  facebook: string;
  instagram: string;
  phone: string;
  website: string;
  whatsapp: string;
}




