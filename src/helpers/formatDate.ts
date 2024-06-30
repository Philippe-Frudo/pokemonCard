const formatDate = (date: Date = new Date() ): String => {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

export default formatDate;