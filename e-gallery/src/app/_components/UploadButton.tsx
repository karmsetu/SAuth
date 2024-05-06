'use client';
import { UploadButton } from '@/utils/uploadthing';
import { useRouter } from 'next/navigation';

const UploadButtonClient = () => {
    const router = useRouter();
    return (
        <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log('Files: ', res);
                // alert('Upload Completed');
                router.refresh();
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }}
        />
    );
};
export default UploadButtonClient;
