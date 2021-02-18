export const getTemperatureToCelsius = (num: number) => {
    const kelvinValue = 273
    return Math.floor(num - kelvinValue) + '°'
}