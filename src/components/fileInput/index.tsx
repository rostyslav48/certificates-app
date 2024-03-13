import { FC } from 'react';
import Dropzone from 'react-dropzone';

import './style.scss';

type Props = {
  handleUpload: (certificate: File) => void;
};

export const FileInput: FC<Props> = ({ handleUpload }) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[]) => handleUpload(acceptedFiles[0])}
    >
      {({ getRootProps, getInputProps }) => (
        <section className="file-input">
          <div className="file-input__content" {...getRootProps()}>
            <input {...getInputProps()} />
            <p className="file-input__text">
              Перетягнути файл сертифікату сюди <br /> aбo
            </p>
            <button className="file-input__button">
              Виберіть через стандартний діалог
            </button>
          </div>
        </section>
      )}
    </Dropzone>
  );
};
