import ReactLoading from 'react-loading';

export const LoadingScreen = ({type, color}) => (
    // <ReactLoading type={type} color={color}/>
    <ReactLoading type={type} color={color} height={50} width={50}/>
    // <ReactLoading type={type} color={color} height={'10%'} width={'10%'}/>
);