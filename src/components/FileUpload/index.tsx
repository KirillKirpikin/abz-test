import React, { ChangeEvent, useEffect, useState } from 'react';

import styled from './file-upload.module.scss';

interface FileUploadProps {
    selectedFiles: File[];
    setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
    quantity: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
    selectedFiles,
    setSelectedFiles,
}) => {
    const [isError, setIsError] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsError(false);
        e.preventDefault();
        const files = e.target.files;

        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setSelectedFiles([...fileArray]);
        }
    };

    useEffect(() => {}, [selectedFiles]);
    return (
        <div className={styled.file}>
            <label className={styled.label}>
                <p>Upload</p>
                <input
                    onChange={handleChange}
                    type="file"
                    className={styled.input}
                    multiple={true}
                />
            </label>
            <div className={styled.name_file}>
                {selectedFiles.length > 0 ? (
                    <p>{selectedFiles[0].name}</p>
                ) : (
                    <p>Upload your photo</p>
                )}
            </div>
            {isError}
        </div>
    );
};

export default FileUpload;
