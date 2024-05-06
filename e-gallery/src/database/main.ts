import connectDB from '@/app/api/db/main';
import image from '@/database/model/fileUpload.model';
import { ObjectId } from 'mongoose';

export type ImageType = {
    _id: ObjectId;
    userId: string;
    url: string;
    fileName: string;
    __v: number;
};

const getImages = async () => {
    await connectDB();
    const images = await image.find({});
    return images;
};

export { getImages };
