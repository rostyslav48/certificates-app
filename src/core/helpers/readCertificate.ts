import * as asn1js from 'asn1js';
import * as pkijs from 'pkijs';

export const readCertificate = async (file: File) => {
  const fileArrayBuffer = await file.arrayBuffer();
  const certificateBuffer = new Uint8Array(fileArrayBuffer).buffer;
  const asn1 = asn1js.fromBER(certificateBuffer);

  if (asn1.result.error) {
    return;
  }

  return new pkijs.Certificate({ schema: asn1.result });
};
