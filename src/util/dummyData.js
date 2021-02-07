const dummyData = [
    `She had the gift of being able to paint songs.`,
    `Giving directions that the mountains are to the west only works when you can see them.`,
    `Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler`,
    `The most disastrous thing that you can ever learn is your first programming language. - Alan Kay`
];

const getDummyData = () => {
    let randomNumber = Math.floor(Math.random() * Math.floor(dummyData.length));
    return dummyData[randomNumber];
}

export default getDummyData;