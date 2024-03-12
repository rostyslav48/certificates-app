import { Certificate } from 'core/types';
import { useState } from 'react';
import cn from 'classnames';
import { useLocalStorage } from 'core/hooks';
import { StorageKeys } from 'core/enums/storage-keys.enum';
import { FileInput } from './components/fileInput';
import asn1 from 'asn1';

// Images
import Arrow from 'icons/arrow-icon.svg?react';

import './style.scss';

// const certificates: Certificate[] = [
//   {
//     id: 1,
//     name: 'Сертифікат 1',
//     issuerCN: 'Issuer 1',
//     validFrom: '01.01.2021',
//     validTo: '01.01.2022',
//   },
//   {
//     id: 2,
//     name: 'Сертифікат 2',
//     issuerCN: 'Issuer 1',
//     validFrom: '01.01.2021',
//     validTo: '01.01.2022',
//   },
// ];

export const App = () => {
  const [certificates, setCertificates] = useLocalStorage<Certificate[]>(
    StorageKeys.Certificates,
    [],
  );
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);
  const [isAddCertificate, setIsAddCertificate] = useState(false);

  const handleCertificateUpload = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = await Buffer.from(arrayBuffer);
    console.log('buffer', buffer);
    // const Ber = new asn1.BerReader(buffer);
    // const buffer = Buffer.from(file.arrayBuffer());
  };

  return (
    <div id="root" className="grid wrapper">
      <section className="certificates">
        <button
          className="certificates__add"
          onClick={() => setIsAddCertificate((prevState) => !prevState)}
        >
          {isAddCertificate ? 'Назад' : 'Додати'}
        </button>
        {!!certificates.length ? (
          <ul className="certificates__list">
            {certificates.map((certificate) => (
              <li
                onClick={() => setSelectedCertificate(certificate)}
                key={certificate.id}
                className={cn('certificates__item', {
                  'certificates__item--active':
                    certificate.id === selectedCertificate?.id,
                })}
              >
                <span>{certificate.name}</span>
                {certificate.id === selectedCertificate?.id && (
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
            <b>Common Name:</b>
            {selectedCertificate.name}
          </p>
          <p className="certificate-info__text">
            <b>Issuer CN:</b>
            {selectedCertificate.issuerCN}
          </p>
          <p className="certificate-info__text">
            <b>Valid From:</b>
            {selectedCertificate.validFrom}
          </p>
          <p className="certificate-info__text">
            <b>Valid To:</b>
            {selectedCertificate.validTo}
          </p>
        </section>
      )}

      {isAddCertificate && (
        <div className="certificate-info__file-input">
          <FileInput handleUpload={handleCertificateUpload} />
        </div>
      )}
    </div>
  );
};
