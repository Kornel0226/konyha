const root = "http://localhost:5000/"


const fetchImageAsBlob = async (imageUrl: string) => {
    try {
        const response = await fetch(root + imageUrl);
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
}

export { fetchImageAsBlob };