import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (file: File): Promise<string> => {
    try {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataURL = `data:${file.type};base64,${base64}`;

        const result = await cloudinary.uploader.upload(dataURL, {
            folder: 'products',
        });

        return result.secure_url;
    } catch (error) {
        console.error('Image upload failed:', error);
        throw new Error('Failed to upload image');
    }
}
