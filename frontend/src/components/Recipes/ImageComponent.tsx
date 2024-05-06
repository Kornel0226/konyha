import { FC, useEffect, useState } from "react";
import { fetchImageAsBlob } from "../../requests/image";




const Image: FC<{ img: string, size: string }> = ({ img, size }) => {

    const [blob, setBlob] = useState<Blob | null>(null)
    const [isLoading, setIsloadin] = useState(true)
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchBlob() {
            try {
                const blob = await fetchImageAsBlob(img)
                setBlob(blob)
                setIsloadin(false)
            } catch (error) {
                setError("Error")

            }
        }
        fetchBlob()
    }, [img])


    if (blob) {
        img = URL.createObjectURL(blob)
    }

    return <>
        {isLoading && <p>Loading...</p>}
        {img && <img src={img} alt="recept" className={`w-full h-[80%]`}></img>}
    </>;
};

export default Image;
