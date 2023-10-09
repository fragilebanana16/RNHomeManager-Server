const expressPort = 8000;
const socketPort = 3001;
const videosData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        videoName: '1.mp4',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        videoName: '2.mp4',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        videoName: '3.mp4',
    },
    {
        id: '31241241-3da1-471f-bd96-145571e29d72',
        title: 'Fourth Item',
        videoName: '4.mp4',
    },
    {
        id: '23232344-3da1-471f-bd96-145571e29d72',
        title: 'Fifth Item',
        videoName: '5.mp4',
    },
];

module.exports = { expressPort, socketPort, videosData };