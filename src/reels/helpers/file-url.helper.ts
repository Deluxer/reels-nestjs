
export const fileVideoUrl = (fileName: string): string => {
    // const urlFile = `${ process.env.HOST }reels/videos/${ fileName }`
    const urlFile = `${ fileName }`;
    return urlFile;
}

export const fileImageUrl = (fileName: string): string => {
    const fileUuidName = fileName.split('.')[0];

    // const urlFile = `${ process.env.HOST }reels/photo/${ fileUuidName }.png`
    const urlFile = `${ fileUuidName }.png`
    return urlFile;
}
