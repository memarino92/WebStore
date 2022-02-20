const imageNameFromUrl = (imageUrl: string | undefined): string | undefined => {
  return imageUrl?.split('/')[imageUrl.split('/').length - 1]
}

export { imageNameFromUrl }
