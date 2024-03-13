import { Certificate } from 'pkijs';

export interface CertificateData {
  serialNumber: string;
  commonName: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  certificate: Certificate;
}
