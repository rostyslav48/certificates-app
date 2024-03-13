import { FC } from 'react';
import Dropzone from 'react-dropzone';

import './style.scss';

type Props = {
  isError?: boolean;
  handleUpload: (certificate: File) => void;
};

export const FileInput: FC<Props> = ({ handleUpload, isError = false }) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[]) => handleUpload(acceptedFiles[0])}
      accept={{ 'text/hml': ['.cer'] }}
    >
      {({ getRootProps, getInputProps }) => (
        <section {...getRootProps()} className="file-input">
          <input {...getInputProps()} />
          <div className="file-input__content">
            <p className="file-input__text">
              Перетягнути файл сертифікату сюди <br /> (файл має бути з
              розширенням .cer) <br /> aбo
            </p>
            <button className="file-input__button">
              Виберіть через стандартний діалог
            </button>

            {isError && (
              <span className="file-input__error">
                Сталася помилка при обробці сертифікату, будь ласка перевірте
                його цілісність та спробуйте ще раз
              </span>
            )}
          </div>
        </section>
      )}
    </Dropzone>
  );
};
