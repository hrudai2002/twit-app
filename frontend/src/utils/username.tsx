export const getusername = (name: string) => {
    return '@' + name?.toLocaleLowerCase()?.replace(/ +/g, "");
}