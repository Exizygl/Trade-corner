import { EImageExtension } from '../../../assets/enums/EDocumentExtension';

export const findImageExtension = (imageName) => {

    const extension = imageName.substring(imageName.lastIndexOf('.') + 1);

    const findValidExtension = EImageExtension.find(x => ((extension === x.value) || (extension === x.value.toUpperCase())))

    if (findValidExtension) {
        return true
    } else return false
}

export const validImageSize = (imageSize) => {

    if (imageSize <= 200000) {
        return true
    } else return false
}