/* eslint-disable @next/next/no-img-element */
import { getImages } from '@/database/main';
import { ImageType } from '@/database/main';
import Image from 'next/image';
const Gallery = async () => {
    const images = await getImages();
    console.log(images);

    return (
        <>
            <main className="h-full grid gap-4 p-4 grid-cols-3">
                {images.map((image: ImageType) => (
                    <div
                        key={JSON.stringify(image._id)}
                        className="w-[fit-content] h-[fit-content] border-pink-700 flex content-center items-center"
                    >
                        {/* <img src={image.url} alt={image.fileName} /> */}
                        <Image
                            alt={image.fileName}
                            src={image.url}
                            width={300}
                            height={300}
                        />
                    </div>
                ))}
            </main>
        </>
    );
};

export default Gallery;
