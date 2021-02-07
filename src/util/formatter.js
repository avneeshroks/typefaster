export const getFormmattedTime = (msTime) => {
    return `${Math.floor(msTime / 1000)}s ${Math.floor(msTime % 1000)}ms`;
}