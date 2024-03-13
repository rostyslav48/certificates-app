import { CertificateData, CertificatePreview } from 'core/types';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useLocalStorage } from 'core/hooks';
import { StorageKeys, CertificateKeys } from 'core/enums';
import { FileInput } from './components/fileInput';

// Images
import Arrow from 'icons/arrow-icon.svg?react';

import './style.scss';
import { readCertificate } from 'core/helpers';

export const App = () => {
  const [certificates, setCertificates] = useLocalStorage<CertificateData[]>(
    StorageKeys.Certificates,
    [],
  );
  const [certificatesPreview, setCertificatesPreview] = useLocalStorage<
    CertificatePreview[]
  >(StorageKeys.CertificatesPreview, []);
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificatePreview | null>(null);
  const [isAddCertificate, setIsAddCertificate] = useState(false);
  const [isUploadingError, setIsUploadingError] = useState(false);

  const handleCertificateUpload = async (file: File) => {
    const cert = await readCertificate(file);

    if (!cert) {
      setIsUploadingError(true);
      return;
    }

    const certPreviewData: CertificatePreview = {
      serialNumber: cert.serialNumber.valueBlock.valueHexView.toString(),
      issuer:
        cert.issuer.typesAndValues
          .find((issuer) => issuer.type === CertificateKeys.CommonName)
          ?.value.valueBlock.value.toString() ?? '',
      validFrom: cert.notBefore.value.toISOString().split('T')[0],
      validTo: cert.notAfter.value.toISOString().split('T')[0],
      commonName:
        cert.subject.typesAndValues
          .find((subject) => subject.type === CertificateKeys.CommonName)
          ?.value.valueBlock.value.toString() ?? '',
    };

    const certData: CertificateData = {
      serialNumber: certPreviewData.serialNumber,
      certificate: cert,
    };

    setCertificatesPreview((prevState) => [
      ...prevState.filter(
        ({ serialNumber }) => serialNumber !== certPreviewData.serialNumber,
      ),
      certPreviewData,
    ]);

    setCertificates((prevState) => [
      ...prevState.filter(
        ({ serialNumber }) => serialNumber !== certData.serialNumber,
      ),
      certData,
    ]);
    setSelectedCertificate(certPreviewData);
    setIsAddCertificate(false);
  };

  const handleCertificateSelect = (certificate: CertificatePreview) => {
    setSelectedCertificate(certificate);
    setIsAddCertificate(false);
  };

  useEffect(() => {
    if (isUploadingError) {
      setIsUploadingError(false);
    }
  }, [isAddCertificate]);

  return (
    <div id="root" className="grid wrapper">
      <section className="certificates">
        <button
          className="certificates__add"
          onClick={() => setIsAddCertificate((prevState) => !prevState)}
        >
          {isAddCertificate ? 'Назад' : 'Додати'}
        </button>
        {certificatesPreview.length ? (
          <ul className="certificates__list">
            {certificatesPreview.map((certificate) => (
              <li
                onClick={() => handleCertificateSelect(certificate)}
                key={certificate.serialNumber}
                className={cn('certificates__item', {
                  'certificates__item--active':
                    certificate.serialNumber ===
                    selectedCertificate?.serialNumber,
                })}
              >
                <span>{certificate.commonName}</span>
                {certificate.serialNumber ===
                  selectedCertificate?.serialNumber && (
                  <Arrow className="certificates__arrow" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="certificates__empty">Сертифікати відсутні</p>
        )}
      </section>

      {!isAddCertificate && selectedCertificate && (
        <section className="certificate-info">
          <p className="certificate-info__text">
            <b>Common Name: </b>
            {selectedCertificate.commonName}
          </p>
          <p className="certificate-info__text">
            <b>Issuer CN: </b>
            {selectedCertificate.issuer}
          </p>
          <p className="certificate-info__text">
            <b>Valid From: </b>
            {selectedCertificate.validFrom}
          </p>
          <p className="certificate-info__text">
            <b>Valid To: </b>
            {selectedCertificate.validTo}
          </p>
        </section>
      )}

      {isAddCertificate && (
        <div className="certificate-info__file-input">
          <FileInput
            isError={isUploadingError}
            handleUpload={handleCertificateUpload}
          />
        </div>
      )}
    </div>
  );
};
