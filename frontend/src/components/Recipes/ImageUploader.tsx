import { FC, useEffect, useState } from "react";
import { fetchImageAsBlob } from "../../requests/image";

const ImageUploader: FC<{ onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, selectedImageUrl: string | null, defaultImg?: string | undefined }> = ({ onChange, selectedImageUrl, defaultImg }) => {
    const [defImage, setDefImage] = useState<string | null>(null)

    useEffect(() => {
        async function fetchDefaultImg() {
            try {
                if (defaultImg) {
                    const img = await fetchImageAsBlob(defaultImg)
                    setDefImage(URL.createObjectURL(img))
                }
            } catch (error) {
                console.error("Error fetching default image:", error);
            }
        }
        fetchDefaultImg();
    }, [defaultImg])

    return (
        <div>
            <input type="file" name="recipeImage" accept="image/*" onChange={(event) => { onChange(event) }} />
            {selectedImageUrl ? (
                <div>
                    <h2>Selected Image:</h2>
                    <img src={selectedImageUrl} className="size-52" alt="Selected" />
                </div>
            ) : defImage && (
                <div>
                    <h2>Default Image:</h2>
                    <img src={defImage} className="size-52" alt="Default" />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;