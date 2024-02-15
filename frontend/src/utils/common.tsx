import moment from "moment";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const getusername = (name: string) => {
    return '@' + name?.toLocaleLowerCase()?.replace(/ +/g, "");
}

export const messageDateFormat = (date) => {
    date = new Date();
    return `${months[date?.getMonth()]} ${date?.getDate()}, ${date?.getFullYear()}`;
}

export const postFormatDate = (dateString: string) => {
    const date: Date = new Date(dateString);
    const now: Date = new Date();

    const seconds = moment(now).diff(date, 'seconds');
    const minutes = moment(now).diff(date, 'minutes')
    const hours = moment(now).diff(date, 'hours');

    if (seconds < 60) return seconds + "s";
    if (minutes < 60) return minutes + "m";
    if (hours < 24) return hours + "h";

    return date.getDate() + " " + months[date.getMonth()] + ", " + date.getFullYear();
}