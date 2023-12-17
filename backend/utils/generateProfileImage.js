
const generateProfileImage = ( username ) => {
    const anonymousAnimalApi = 'https://anonymous-animals.azurewebsites.net/avatar/'; 
    return anonymousAnimalApi + username;
}

export default generateProfileImage;