import { Certificate } from 'pkijs';
import { CertificateKeys } from 'core/enums';

export const getCertificateInfo = (certificate: Certificate) => {
  return {
    serialNumber: certificate.serialNumber.valueBlock.valueHexView.toString(),
    issuer:
      certificate.issuer.typesAndValues
        .find((issuer) => issuer.type === CertificateKeys.CommonName)
        ?.value.valueBlock.value.toString() ?? '',
    validFrom: certificate.notBefore.value.toISOString().split('T')[0],
    validTo: certificate.notAfter.value.toISOString().split('T')[0],
    commonName:
      certificate.subject.typesAndValues
        .find((subject) => subject.type === CertificateKeys.CommonName)
        ?.value.valueBlock.value.toString() ?? '',
  };
};
