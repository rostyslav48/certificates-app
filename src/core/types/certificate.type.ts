import { Certificate } from 'pkijs';

export interface CertificatePreview {
  serialNumber: string;
  commonName: string;
  issuer: string;
  validFrom: string;
  validTo: string;
}

export interface CertificateData {
  serialNumber: string;
  certificate: Certificate;
}
