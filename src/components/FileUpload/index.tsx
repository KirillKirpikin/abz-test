import React, { ChangeEvent, useState } from 'react';

import styled from './file-upload.module.scss';

interface FileUploadProps {
    value: File[];
    quantity: number;
    onChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ value, onChange }) => {
    const [isError, setIsError] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsError(false);
        e.preventDefault();
        const files = e.target.files;

        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            onChange(fileArray);
        }
    };

    return (
        <div className={styled.file}>
            <label className={styled.label}>
                <p>Upload</p>
                <input
                    onChange={handleChange}
                    type="file"
                    className={styled.input}
                    multiple={true}
                    accept=".jpeg,.jpg"
                />
            </label>
            <div className={styled.name_file}>
                {value.length > 0 ? (
                    <p>{value[0].name}</p>
                ) : (
                    <p>Upload your photo</p>
                )}
            </div>
            {isError}
        </div>
    );
};

export default FileUpload;
