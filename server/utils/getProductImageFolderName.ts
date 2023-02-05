// eliminates spaces between two words and replaces them with "-" and takes the first 20 characters of the created string to create a unique folder name in cloudinary
const getProductFolderName = (productName: string) => productName.split(" ").join("-").substring(0, 20);

export default getProductFolderName;
